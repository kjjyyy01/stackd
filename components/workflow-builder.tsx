"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ToolPicker from "@/components/tool-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DRAFT_EVENT } from "@/components/draft-banner";
import { track } from "@/lib/analytics";
import { EMPTY_DRAFT, clearDraft, isDraftEmpty, isResuming, loadDraft, saveDraft, type Draft } from "@/lib/draft";
import { CATEGORIES, DEV_STACK_CATEGORIES, LIMITS, charCount, validateWorkflow } from "@/lib/limits";

type Step = Draft["steps"][number];
type Props = {
  roleDefault?: string; // 로그인 사용자의 user_metadata.role_default (REQ-HOME-004)
  initial?: Draft; // 수정 모드로 로드된 DB 값 (REQ-HOME-006) — 없으면 새로 쓰기
};

// 글자 수 카운터 — 상한 도달·초과 시 붉게 (ERR-BLDR-005 "카운터 붉게")
function Counter({ n, max, over }: { n: number; max: number; over?: boolean }) {
  return (
    <span className={`font-mono text-xs ${over || n >= max ? "text-destructive" : "text-muted-foreground"}`}>
      {n}/{max}{over && " · 글자 수를 넘었어요"}
    </span>
  );
}

// SCR-001 빌더 — 상태는 여기 한 곳, 변경마다 초안 저장 (BR-019). 서버 쓰기 없음
export default function WorkflowBuilder({ roleDefault = "", initial }: Props) {
  const [d, setD] = useState<Draft>(initial ?? { ...EMPTY_DRAFT, role: roleDefault });
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [over, setOver] = useState<string | null>(null); // 직전 입력이 상한에 막힌 필드
  const [picking, setPicking] = useState(false); // 단계 도구 선택기 열림
  const [ctaTried, setCtaTried] = useState(false);
  const hydrated = useRef(false);
  const pending = useRef<Draft | null>(null); // 배너(전역) 응답 대기 중인 초안
  const initialRef = useRef(initial); // 서버 prop — 마운트 시점 값만 쓴다

  // 진입 시 초안 확인 + 배너(DraftBanner) 신호 수신 — 배너 UI는 전역 위치가 소유 (EL-HOME-004)
  useEffect(() => {
    const init = initialRef.current;
    const saved = loadDraft();

    if (init && saved && saved.editId !== init.editId) {
      clearDraft(); // 다른 카드의 초안 — 수정은 명시적 행위라 안내 없이 폐기 (SCR-001 §11 #3)
    } else if (saved && !isDraftEmpty(saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 저장소는 마운트 후 1회만 읽는다
      if (isResuming()) setD(saved); // `/card` 복귀 = 방금 쓴 내용이라 되묻지 않는다 (§6 뒤로가기)
      else pending.current = saved; // 그 외에는 배너 응답을 기다린다
    }
    if (init) document.getElementById("builder")?.scrollIntoView(); // 수정 대상부터 보여준다 (엣지 14)
    hydrated.current = true;

    const onDraft = (e: Event) => {
      // 수정 모드의 "새로 시작" = DB 값 복귀 — d가 이미 initial이라 보류 해제만으로 충족된다
      if ((e as CustomEvent).detail === "restore" && pending.current) setD(pending.current);
      pending.current = null; // discard든 restore든 저장 보류 해제
    };
    window.addEventListener(DRAFT_EVENT, onDraft);
    return () => window.removeEventListener(DRAFT_EVENT, onDraft);
  }, []);

  // 상태 변경마다 저장 — 단, 빈 빌더를 덮어써서 배너 대상 초안을 지우면 안 된다
  useEffect(() => {
    if (!hydrated.current || pending.current) return;
    if (isDraftEmpty(d)) return;
    saveDraft(d);
  }, [d]);

  const gateOk = validateWorkflow(d).ok; // BR-016 = 전체 검증 통과 (서버 재검증과 같은 함수)
  // 인라인 에러는 필드별로 — 첫 위반만 돌려주는 검증 결과에 기대면 둘 다 비었을 때 하나만 보인다
  const fieldOk: Record<string, boolean> = {
    title: charCount(d.title.trim()) >= LIMITS.title.min,
    situation_short: charCount(d.situation_short.trim()) >= LIMITS.situation_short.min,
  };

  // 상한 넘는 입력은 차단(값 미반영) + 해당 필드 카운터 옆 안내
  function limited(field: string, max: number, apply: (s: string) => void) {
    return (s: string) => {
      if (charCount(s) > max) return setOver(field);
      setOver(null);
      apply(s);
    };
  }
  const touch = (f: string) => setTouched((t) => new Set(t).add(f));
  const showErr = (f: string) => (touched.has(f) || ctaTried) && !fieldOk[f];

  // 단계 조작 (REQ-HOME-002·003)
  function addStep(tool: Step["tool"], method: "catalog" | "manual") {
    if (d.steps.length >= LIMITS.steps.max) return;
    setD({ ...d, steps: [...d.steps, { tool, note: "", detail: "" }] });
    track("step_add", { method, item_category: tool.category, item_name: tool.name }); // EVT-BLDR-001
    setPicking(false);
  }
  const patchStep = (i: number, p: Partial<Step>) => setD({ ...d, steps: d.steps.map((s, k) => (k === i ? { ...s, ...p } : s)) });
  const moveStep = (i: number, dir: -1 | 1) => {
    const s = [...d.steps]; const j = i + dir;
    [s[i], s[j]] = [s[j], s[i]];
    setD({ ...d, steps: s });
  };
  const removeStep = (i: number) => setD({ ...d, steps: d.steps.filter((_, k) => k !== i) });

  // 스택 태그 (REQ-HOME-004) — 중복은 trim 정확 일치로 차단, 이벤트 없음
  function addTag(t: Draft["dev_stack"][number]) {
    if (d.dev_stack.length >= LIMITS.dev_stack.max) return;
    if (d.dev_stack.some((x) => x.name.trim() === t.name.trim())) return;
    setD({ ...d, dev_stack: [...d.dev_stack, t] });
  }

  const stepIncomplete = (s: Step) => !s.note.trim() || !s.detail.trim();

  return (
    <div className="container-page">
      <form className="mt-10 grid max-w-2xl gap-10" onSubmit={(e) => e.preventDefault()} noValidate>
        {/* 기본 정보 (EL-HOME-005~007) */}
        <fieldset className="grid gap-6">
          <legend className="sr-only">기본 정보</legend>
          <div className="grid gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="title" className="text-sm font-medium">제목 — 이 워크플로우를 한 줄로</label>
              <Counter n={charCount(d.title)} max={LIMITS.title.max} over={over === "title"} />
            </div>
            <Input id="title" value={d.title} onChange={(e) => limited("title", LIMITS.title.max, (s) => setD({ ...d, title: s }))(e.target.value)}
              onBlur={() => touch("title")} placeholder="제목 — 이 워크플로우를 한 줄로" aria-invalid={showErr("title") || undefined} aria-describedby="title-err" />
            {showErr("title") && <p id="title-err" className="text-xs text-destructive">제목을 1~30자로 입력해주세요</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="situation_short" className="text-sm font-medium">상황</label>
              <Counter n={charCount(d.situation_short)} max={LIMITS.situation_short.max} over={over === "situation_short"} />
            </div>
            <Input id="situation_short" value={d.situation_short} onChange={(e) => limited("situation_short", LIMITS.situation_short.max, (s) => setD({ ...d, situation_short: s }))(e.target.value)}
              onBlur={() => touch("situation_short")} placeholder="상황을 20자 안으로 짧게 적어주세요 (예: 웹 페이지 개발, 백엔드 디버깅)" aria-invalid={showErr("situation_short") || undefined} aria-describedby="situation_short-err" />
            {showErr("situation_short") && <p id="situation_short-err" className="text-xs text-destructive">상황을 20자 안으로 짧게 적어주세요 (예: 웹 페이지 개발, 백엔드 디버깅)</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="situation" className="text-sm font-medium">상황 상세 (선택)</label>
              <Counter n={charCount(d.situation)} max={LIMITS.situation.max} over={over === "situation"} />
            </div>
            <Textarea id="situation" rows={3} value={d.situation} onChange={(e) => limited("situation", LIMITS.situation.max, (s) => setD({ ...d, situation: s }))(e.target.value)}
              placeholder="어떤 상황에서 쓰는 워크플로우인가요? 자세히 적어주면 상세 페이지에 실려요 (선택)" />
          </div>
        </fieldset>

        {/* 단계 (EL-HOME-008~011) */}
        <fieldset className="grid gap-4">
          <div className="flex items-baseline justify-between gap-4">
            <legend className="text-sm font-medium">단계 — 2~8개, 쓰는 순서대로</legend>
            <Counter n={d.steps.length} max={LIMITS.steps.max} />
          </div>
          <ol className="grid gap-4">
            {d.steps.map((s, i) => {
              const incomplete = ctaTried && stepIncomplete(s);
              return (
                <li key={i} className="grid gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[0.625rem] font-medium text-background">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-sm font-medium">{s.tool.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{s.tool.category}</span>
                    <div className="ml-auto flex gap-1">
                      <Button type="button" variant="ghost" size="icon-sm" aria-label="위로" disabled={i === 0} onClick={() => moveStep(i, -1)}>↑</Button>
                      <Button type="button" variant="ghost" size="icon-sm" aria-label="아래로" disabled={i === d.steps.length - 1} onClick={() => moveStep(i, 1)}>↓</Button>
                      <Button type="button" variant="ghost" size="icon-sm" aria-label="단계 삭제" onClick={() => removeStep(i)}>×</Button>
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor={`note-${i}`} className="sr-only">단계 {i + 1} 메모</label>
                    <Input id={`note-${i}`} value={s.note} onChange={(e) => limited(`note-${i}`, LIMITS.step_note.max, (v) => patchStep(i, { note: v }))(e.target.value)}
                      placeholder="이 단계에서 이 도구로 뭘 하나요? (카드에 한 줄로 — 필수)" aria-invalid={incomplete || undefined} />
                    <Counter n={charCount(s.note)} max={LIMITS.step_note.max} over={over === `note-${i}`} />
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor={`detail-${i}`} className="sr-only">단계 {i + 1} 상세</label>
                    <Textarea id={`detail-${i}`} rows={2} value={s.detail} onChange={(e) => limited(`detail-${i}`, LIMITS.step_detail.max, (v) => patchStep(i, { detail: v }))(e.target.value)}
                      placeholder="어떻게 쓰는지 자세히 (상세 페이지에 실려요 — 필수)" aria-invalid={incomplete || undefined} />
                    <Counter n={charCount(s.detail)} max={LIMITS.step_detail.max} over={over === `detail-${i}`} />
                  </div>
                  {incomplete && <p className="text-xs text-destructive">각 단계에 한 줄 메모와 설명을 채워주세요</p>}
                </li>
              );
            })}
          </ol>
          {picking ? (
            <ToolPicker categories={CATEGORIES} onPick={addStep} searchPlaceholder="도구 이름으로 검색" autoFocus />
          ) : (
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" disabled={d.steps.length >= LIMITS.steps.max} onClick={() => setPicking(true)}>단계 추가</Button>
              {d.steps.length >= LIMITS.steps.max && <p className="text-xs text-muted-foreground">단계는 8개까지예요 — 핵심만 남겨보세요</p>}
            </div>
          )}
        </fieldset>

        {/* 개발 스택 태그 (EL-HOME-012) */}
        <fieldset className="grid gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <legend className="text-sm font-medium">이 워크플로우를 쓰는 개발 스택 (선택, 4개까지)</legend>
            <Counter n={d.dev_stack.length} max={LIMITS.dev_stack.max} />
          </div>
          {d.dev_stack.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="선택한 스택">
              {d.dev_stack.map((t) => (
                <li key={t.name}>
                  <button type="button" onClick={() => setD({ ...d, dev_stack: d.dev_stack.filter((x) => x.name !== t.name) })}
                    className="rounded-full bg-muted px-3 py-1 font-mono text-xs hover:bg-destructive/10 hover:text-destructive" aria-label={`${t.name} 해제`}>
                    {t.name} ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          {d.dev_stack.length < LIMITS.dev_stack.max ? (
            <ToolPicker categories={DEV_STACK_CATEGORIES} onPick={(t) => addTag(t as Draft["dev_stack"][number])} searchPlaceholder="스택 이름으로 검색 — 없으면 직접 입력" excludeNames={d.dev_stack.map((t) => t.name)} />
          ) : (
            <p className="text-xs text-muted-foreground">개발 스택 태그는 4개까지예요</p>
          )}
        </fieldset>

        {/* 소속·역할 (EL-HOME-013) */}
        <div className="grid gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="role" className="text-sm font-medium">소속·역할 (선택 — 회사, 학교, 사이드 프로젝트 뭐든)</label>
            <Counter n={charCount(d.role)} max={LIMITS.role.max} over={over === "role"} />
          </div>
          <Input id="role" value={d.role} onChange={(e) => limited("role", LIMITS.role.max, (s) => setD({ ...d, role: s }))(e.target.value)} />
        </div>

        {/* CTA (EL-HOME-014) — 게이트 미충족이면 비활성 + 안내. 모바일 하단 sticky */}
        <div className="sticky bottom-0 -mx-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 md:static md:m-0 md:border-0 md:bg-transparent md:p-0">
          <div className="flex flex-wrap items-center gap-4">
            {gateOk ? (
              <Button asChild size="lg" className="h-11 px-6"><Link href="/card">카드 만들기</Link></Button>
            ) : (
              <Button type="button" size="lg" className="h-11 px-6" aria-disabled onClick={() => setCtaTried(true)}>카드 만들기</Button>
            )}
            {!gateOk && (
              <p className="text-sm text-muted-foreground">제목·상황을 적고, 단계를 2개 이상(각각 한 줄 메모와 설명 포함) 담으면 카드를 만들 수 있어요</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
