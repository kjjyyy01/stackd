// 라이브러리 목록 페이지네이션 (SCR-006 REQ-LIB-002) — offset 방식, 한 페이지 12개
// 커서 방식은 backlog — 페이지 사이 새 카드로 인한 중복·누락 1건은 v1 수용 (§11 #6)
// shadcn Pagination(번호 UI) 채택으로 총 페이지 수가 필요해져 13행 프로브 대신
// count: "exact" 정확 집계로 전환했다 (2026-09-06)

export const PAGE_SIZE = 12;

// ?page 정규화 — 비정수·0·음수·소수·빈 값은 전부 1페이지, 안내 없음 (REQ-LIB-001 AC-2)
export function parsePage(raw: unknown) {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 ? n : 1;
}

// 정확히 PAGE_SIZE행만 요청 — supabase range는 양끝 포함이라 to는 -1
export function pageRange(page: number) {
  const from = (page - 1) * PAGE_SIZE;
  return { from, to: from + PAGE_SIZE - 1 };
}

// 총 개수 → 총 페이지 수. 0건이어도 최소 1페이지(빈 목록도 1페이지로 취급)
export function pageCount(total: number) {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}

export type PageWindowItem = number | "ellipsis";

// shadcn Pagination에 뿌릴 번호 배열 — 7페이지 이하는 전부, 넘으면 처음·끝·현재±1만 남기고 나머지는 ellipsis 1개로 접는다
export function pageWindow(current: number, total: number): PageWindowItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const keep = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...keep].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: PageWindowItem[] = [];
  for (const p of sorted) {
    const prev = result.at(-1);
    if (typeof prev === "number" && p - prev > 1) result.push("ellipsis");
    result.push(p);
  }
  return result;
}
