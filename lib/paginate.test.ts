import { test } from "node:test";
import assert from "node:assert/strict";
import { PAGE_SIZE, pageRange, parsePage, splitPage } from "./paginate.ts";

// TC-LIB-002-03 — 잘못된 ?page는 조용히 1페이지 (REQ-LIB-001 AC-2)
test("?page 정규화 — 비정수·0·음수·빈 값은 1페이지", () => {
  for (const raw of ["abc", "0", "-1", "1.5", "", " ", undefined, null, "NaN"]) {
    assert.equal(parsePage(raw), 1, `parsePage(${JSON.stringify(raw)})`);
  }
  assert.equal(parsePage("2"), 2);
  assert.equal(parsePage("99"), 99);
});

// TC-LIB-002-02 — offset = (page−1)×12 (§9)
test("페이지별 range는 13행 요청 — 다음 페이지 판정용 1행이 더 붙는다", () => {
  assert.deepEqual(pageRange(1), { from: 0, to: 12 });
  assert.deepEqual(pageRange(2), { from: 12, to: 24 });
  assert.deepEqual(pageRange(3), { from: 24, to: 36 });
});

// TC-LIB-002-01·02 — 정확히 12개면 더 보기 미노출, 13개면 노출
test("13번째 행 존재 여부가 더 보기 노출을 가른다", () => {
  const rows = (n: number) => Array.from({ length: n }, (_, i) => i);

  assert.deepEqual(splitPage(rows(12)), { items: rows(12), hasNext: false });

  const thirteen = splitPage(rows(13));
  assert.equal(thirteen.hasNext, true);
  assert.equal(thirteen.items.length, PAGE_SIZE); // 13번째는 렌더하지 않는다

  assert.deepEqual(splitPage(rows(0)), { items: [], hasNext: false });
  assert.deepEqual(splitPage(rows(1)), { items: [0], hasNext: false });
});
