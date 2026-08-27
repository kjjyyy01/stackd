import type { WorkflowInput } from "@/lib/limits";

// 카드 전용 고정 팔레트 — 뷰어 테마 비의존 (PNG·OG로 나가므로, DESIGN.md §색 사용 규칙)
const SURFACE = "#ffffff";
const INK = "#111419";
const MUTED = "#656972";
const HAIRLINE = "#e0e2e6";

// accent 슬러그 → 색. 미인식 슬러그는 기본 ink (PRD-05)
// 1종만 있으면 스와치 UI가 자동으로 숨는다 — 늘릴 때 조건은 DESIGN.md §카드 고정 팔레트
export const ACCENTS: Record<string, string> = { ink: INK };

type CardData = Pick<
  WorkflowInput,
  "title" | "situation_short" | "steps" | "dev_stack" | "role" | "accent"
>;

type Props = {
  workflow: CardData;
  handle?: string; // 세션 GitHub 핸들 (BR-025), 없으면 placeholder
  className?: string; // 바깥에서 scale로 축소할 때만 사용 — 폭·비율은 카드가 갖는다
  showDetailHint?: boolean; // 상세 유도 문구 — SCR-004만 false(화면에서만 감춤, PNG엔 포함)
  titleAs?: "h1" | "h2"; // 상세에서만 h1 — 카드 제목이 페이지 유일 헤딩 (EL-WF-001)
  id?: string; // PNG 저장이 캡처할 DOM을 지목할 때만 (SCR-004 REQ-WF-002)
};

// 카드 고정 조판 — SSOT는 DESIGN.md §카드 조판 (이 상수는 그 사본이다).
// 값을 바꾸려면 DESIGN.md를 먼저 고친다. 유동 폭은 불가(근거도 그 문서에).
export const CARD_W = 560;
export const CARD_H = 700;

// 공용 워크플로우 카드 (EL-CARD-002~008) — SCR-003·004·006·007 공용
export default function WorkflowCard({ workflow, handle, className = "", showDetailHint = true, titleAs: Title = "h2", id }: Props) {
  const { title, situation_short, steps, dev_stack, role } = workflow;
  const accent = ACCENTS[workflow.accent] ?? INK;

  return (
    <article
      id={id}
      aria-label={`${title} — 워크플로우 카드`}
      className={`flex w-[560px] flex-col overflow-hidden rounded-xl p-6 aspect-[4/5] ${className}`}
      style={{ background: SURFACE, color: INK, border: `1px solid ${HAIRLINE}` }}
    >
      {/* 상황 라벨 → 제목 → 작성자 (EL-CARD-003·004·005) */}
      <header>
        <p className="text-xs leading-[1.6]" style={{ color: MUTED }}>
          {situation_short}
        </p>
        <Title className="mt-1 text-xl font-semibold leading-[1.25] tracking-[-0.015em]">{title}</Title>
        <p className="mt-2 text-xs leading-[1.6]" style={{ color: MUTED }}>
          <span className="font-mono">{handle ? `@${handle}` : "@you"}</span>
          {role ? ` · ${role}` : ""}
        </p>
      </header>

      {/* WORKFLOW — 시그니처 단계 레일 (DESIGN.md §단계 레일) */}
      <section className="mt-6 flex-1">
        <p className="font-mono text-xs font-medium uppercase leading-none tracking-[0.1em]" style={{ color: MUTED }}>
          WORKFLOW
        </p>
        <ol className="relative mt-3 space-y-3">
          {/* 레일: 첫 노드 중앙에서 마지막 노드 중앙까지 */}
          <span
            aria-hidden
            className="absolute left-3 top-2 bottom-2 w-px"
            style={{ background: HAIRLINE }}
          />
          {steps.map((s, i) => (
            <li key={i} className="relative flex gap-3">
              <span
                className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.625rem] font-medium leading-none"
                style={{ background: accent, color: SURFACE }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                {/* ponytail: 도구명 mono 고정 — 직접 입력으로 한글명이 오면 sans 분기 필요 */}
                <p className="font-mono text-sm font-medium leading-none">{s.tool.name}</p>
                {/* 1줄 클램프 — 말줄임이 곧 "상세가 더 있다" 신호 (OQ-010 판정) */}
                <p className="mt-1 line-clamp-1 text-xs leading-[1.6]" style={{ color: MUTED }}>
                  {s.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* STACK — 태그 1개 이상일 때만 (EL-CARD-007, BR-015) */}
      {dev_stack.length > 0 && (
        <section className="mt-6">
          <p className="font-mono text-xs font-medium uppercase leading-none tracking-[0.1em]" style={{ color: MUTED }}>
            STACK
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dev_stack.map((t) => (
              <li
                key={t.name}
                className="rounded-full px-3 py-1 font-mono text-xs leading-none"
                style={{ background: "#f2f3f6", color: MUTED }}
              >
                {t.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 워터마크 + 상세 유도 문구 (EL-CARD-008 / OQ-010) */}
      <footer className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: HAIRLINE }}>
        <span className="font-mono text-xs" style={{ color: MUTED }}>
          stackd.kr
        </span>
        {/* SCR-004는 화면에서만 감춘다 — PNG는 이 문구를 포함해야 한다 (TC-CARD-001-03) */}
        <span
          data-detail-hint
          className={`text-xs leading-none${showDetailHint ? "" : " hidden"}`}
          style={{ color: accent }}
        >
          단계별 설명 보기 →
        </span>
      </footer>
    </article>
  );
}
