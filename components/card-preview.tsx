"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { saveWorkflow } from "@/app/actions/workflow";
import { signInWithGitHub } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import WorkflowCard, { ACCENTS } from "@/components/workflow-card";
import { track } from "@/lib/analytics";
import { clearDraft, loadDraft, markResume, saveDraft, type Draft } from "@/lib/draft";
import { LIMITS, validateWorkflow } from "@/lib/limits";

type Props = { handle?: string; loggedIn: boolean };

// 실패 코드 → 토스트 문구 (PRD-10 · CPY-CARD)
const ERROR_COPY: Record<string, string> = {
  "ERR-CARD-004": "저장에 실패했어요 — 다시 시도해주세요 (작성 내용은 남아 있어요)",
  "ERR-CARD-006": "수정하려던 카드를 찾을 수 없어요 — 삭제됐거나 권한이 없어요. 다시 누르면 새 카드로 저장돼요",
  "ERR-AUTH-001": "로그인이 필요해요",
};
const GATE_COPY = "제목·상황을 적고 단계 2개 이상(메모·설명 포함)이면 저장할 수 있어요";

// SCR-003 본체 — 초안은 localStorage에만 있어 렌더가 클라이언트다 (BR-019)
export default function CardPreview({ handle, loggedIn }: Props) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [autoSave, setAutoSave] = useState(false);
  const [online, setOnline] = useState(true);
  const [pending, startTransition] = useTransition();
  const fired = useRef(false);

  // 초안 없음·손상·단계 2개 미만이면 홈으로 (REQ-CARD-001 AC-2)
  useEffect(() => {
    const d = loadDraft();
    if (!d || d.steps.length < LIMITS.steps.min) {
      router.replace("/");
      return;
    }
    // 홈 복귀 시 배너 없이 즉시 복원 (SCR-001 §6) — 링크 클릭과 브라우저 뒤로가기를 한 번에 덮는다
    markResume();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 저장소는 마운트 후 1회만 읽는다
    setDraft(d);
    // OAuth 복귀(save=1)는 재진입이라 중복 발화 제외 (REQ-CARD-005 AC-1)
    const returning = new URLSearchParams(window.location.search).get("save") === "1";
    setAutoSave(returning);
    if (!returning) track("card_preview", { step_count: d.steps.length });
  }, [router]);

  // 오프라인이면 저장 차단 (REQ-CARD-004 AC-4)
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    addEventListener("online", sync);
    addEventListener("offline", sync);
    return () => {
      removeEventListener("online", sync);
      removeEventListener("offline", sync);
    };
  }, []);

  const save = useCallback(
    (d: Draft) => {
      startTransition(async () => {
        const r = await saveWorkflow(d, d.editId);
        if (r.ok) {
          clearDraft(); // 저장 성공 = 초안 폐기 (BR-019)
          track(d.editId ? "card_edit" : "card_create");
          toast.success("저장했어요 — 이제 공유할 수 있어요");
          router.push(`/card-detail/${r.id}`);
          return;
        }
        // 수정 대상이 사라졌으면 초안의 editId를 떼어 다음 시도가 새 카드로 가게 한다.
        // 자동 재시도는 하지 않는다 — 수정을 의도했는데 말없이 새 카드가 생기면 안 된다 (ERR-CARD-006)
        if (r.code === "ERR-CARD-006") {
          const fresh = { ...d, editId: undefined };
          setDraft(fresh);
          saveDraft(fresh);
        }
        toast.error(ERROR_COPY[r.code] ?? GATE_COPY);
      });
    },
    [router],
  );

  // 로그인 왕복 복귀 후 자동 저장 — 1회만 (REQ-CARD-004 AC-1)
  useEffect(() => {
    if (!autoSave || !draft || !loggedIn || fired.current) return;
    if (!validateWorkflow(draft).ok) return; // 왕복 사이 초안이 무너진 경우
    fired.current = true;
    save(draft);
  }, [autoSave, draft, loggedIn, save]);

  // 스와치·스위치 변경은 초안에 즉시 반영 — OAuth 왕복 뒤에도 남아야 한다 (BR-019)
  const patch = (next: Partial<Draft>) => {
    if (!draft) return;
    const merged = { ...draft, ...next };
    setDraft(merged);
    saveDraft(merged);
  };

  // Loading — 초안을 읽기 전 1프레임
  if (!draft) {
    return <div className="mt-8 h-[406px] w-[325px] animate-pulse rounded-xl bg-muted" aria-hidden />;
  }

  const gate = validateWorkflow(draft).ok;
  const swatches = Object.entries(ACCENTS);

  return (
    <div className="mt-8 lg:grid lg:grid-cols-[560px_minmax(0,1fr)] lg:items-start lg:gap-10">
      {/* EL-CARD-002 미리보기 — 조판은 560×700 고정, 좁은 화면은 scale로만 축소 */}
      <div className="[--s:0.58] sm:[--s:0.78] lg:[--s:1]">
        <div className="h-[calc(700px*var(--s))] w-[calc(560px*var(--s))] overflow-hidden">
          <div className="origin-top-left [transform:scale(var(--s))]">
            <WorkflowCard workflow={draft} handle={handle} />
          </div>
        </div>
      </div>

      <div className="mt-8 lg:mt-0">
        {/* EL-CARD-010 액센트 — 팔레트가 늘면 스와치도 함께 늘어난다 */}
        {swatches.length > 1 && (
          <div role="radiogroup" aria-label="카드 색" className="flex gap-2">
            {swatches.map(([slug, color]) => (
              <button
                key={slug}
                type="button"
                role="radio"
                aria-checked={draft.accent === slug}
                aria-label={slug}
                onClick={() => patch({ accent: slug })}
                className={`size-8 rounded-full ring-offset-2 ${draft.accent === slug ? "ring-2 ring-foreground" : "ring-1 ring-border"}`}
                style={{ background: color }}
              />
            ))}
          </div>
        )}

        {/* EL-CARD-011 공개 스위치 — 기본 켜짐 (BR-017) */}
        <div className={swatches.length > 1 ? "mt-6" : ""}>
          <label className="flex items-center gap-3 text-sm">
            <Switch
              checked={draft.is_public}
              onCheckedChange={(v) => patch({ is_public: v })}
              aria-label="라이브러리에 공개"
            />
            <span>라이브러리에 공개 — 검색 엔진에도 노출돼요</span>
          </label>
          {!draft.is_public && (
            <p className="mt-2 text-sm leading-[1.75] text-muted-foreground">
              비공개 카드는 나만 볼 수 있어요 — 링크로도, 검색으로도 열리지 않아요
            </p>
          )}
        </div>

        {/* EL-CARD-013 게이트 안내 (ERR-CARD-001) */}
        {!gate && <p className="mt-6 text-sm leading-[1.75] text-muted-foreground">{GATE_COPY}</p>}

        {/* EL-CARD-012 저장 — 비로그인은 GitHub 왕복 후 자동 저장 (BR-016) */}
        <div className="mt-4">
          {loggedIn ? (
            <Button
              size="lg"
              onClick={() => save(draft)}
              disabled={!gate || !online || pending}
              className="h-11 w-full px-6 sm:w-auto"
            >
              {/* 수정 흐름의 최종 지점 — 여기가 "완료"임이 보여야 한다 (CPY-CARD-020) */}
              {pending ? "저장 중…" : draft.editId ? "수정 완료" : "저장하기"}
            </Button>
          ) : (
            <form action={signInWithGitHub}>
              <input type="hidden" name="next" value="/card?save=1" />
              <Button size="lg" type="submit" disabled={!gate || !online} className="h-11 w-full px-6 sm:w-auto">
                GitHub으로 로그인하고 저장
              </Button>
            </form>
          )}
        </div>

        {/* EL-CARD-014 복귀 링크 — 초안은 그대로 유지 */}
        <Link
          href="/"
          className="mt-1 inline-block py-2.5 text-sm leading-[1.75] text-muted-foreground underline underline-offset-4"
        >
          돌아가서 수정하기
        </Link>
      </div>
    </div>
  );
}
