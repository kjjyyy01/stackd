// 라이브러리 목록 페이지네이션 (SCR-006 REQ-LIB-002) — offset 방식, 한 페이지 12개
// 커서 방식은 backlog — 페이지 사이 새 카드로 인한 중복·누락 1건은 v1 수용 (§11 #6)

export const PAGE_SIZE = 12;

// ?page 정규화 — 비정수·0·음수·소수·빈 값은 전부 1페이지, 안내 없음 (REQ-LIB-001 AC-2)
export function parsePage(raw: unknown) {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 ? n : 1;
}

// 13행을 조회한다 — 13번째 존재 여부가 다음 페이지 판정 (§9). supabase range는 양끝 포함
export function pageRange(page: number) {
  const from = (page - 1) * PAGE_SIZE;
  return { from, to: from + PAGE_SIZE };
}

// 조회 결과를 렌더 12행 + 다음 페이지 여부로 가른다 (TC-LIB-002-01·02)
export function splitPage<T>(rows: T[]) {
  return { items: rows.slice(0, PAGE_SIZE), hasNext: rows.length > PAGE_SIZE };
}
