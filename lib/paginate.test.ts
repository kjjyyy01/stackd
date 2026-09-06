import { test } from "node:test";
import assert from "node:assert/strict";
import { PAGE_SIZE, pageCount, pageRange, pageWindow, parsePage } from "./paginate.ts";

// TC-LIB-002-03 — 잘못된 ?page는 조용히 1페이지 (REQ-LIB-001 AC-2)
test("?page 정규화 — 비정수·0·음수·빈 값은 1페이지", () => {
  for (const raw of ["abc", "0", "-1", "1.5", "", " ", undefined, null, "NaN"]) {
    assert.equal(parsePage(raw), 1, `parsePage(${JSON.stringify(raw)})`);
  }
  assert.equal(parsePage("2"), 2);
  assert.equal(parsePage("99"), 99);
});

// TC-LIB-002-02 — offset = (page−1)×12, 정확히 PAGE_SIZE행만 요청(count는 별도 쿼리 옵션으로 받음)
test("페이지별 range는 정확히 12행 — 더 이상 13번째 프로브 행이 없다", () => {
  assert.deepEqual(pageRange(1), { from: 0, to: 11 });
  assert.deepEqual(pageRange(2), { from: 12, to: 23 });
  assert.deepEqual(pageRange(3), { from: 24, to: 35 });
});

// 총 개수 → 총 페이지 수. 0건이어도 최소 1페이지(빈 목록 렌더용)
test("pageCount — 총 개수를 12로 나눠 올림, 0건이면 1페이지", () => {
  assert.equal(pageCount(0), 1);
  assert.equal(pageCount(1), 1);
  assert.equal(pageCount(PAGE_SIZE), 1);
  assert.equal(pageCount(PAGE_SIZE + 1), 2);
  assert.equal(pageCount(PAGE_SIZE * 3), 3);
  assert.equal(pageCount(PAGE_SIZE * 3 + 1), 4);
});

// 표시할 페이지 번호 — 전체 7페이지 이하는 전부 표시, 넘으면 처음·끝·현재 주변만 + 말줄임
test("pageWindow — 7페이지 이하는 전부, 초과 시 처음/끝/현재 주변 + ellipsis", () => {
  assert.deepEqual(pageWindow(1, 1), [1]);
  assert.deepEqual(pageWindow(1, 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(pageWindow(4, 7), [1, 2, 3, 4, 5, 6, 7]);

  // 8페이지 이상부터 축약 시작
  assert.deepEqual(pageWindow(1, 8), [1, 2, "ellipsis", 8]);
  assert.deepEqual(pageWindow(8, 8), [1, "ellipsis", 7, 8]);
  assert.deepEqual(pageWindow(5, 10), [1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  assert.deepEqual(pageWindow(1, 20), [1, 2, "ellipsis", 20]);
  assert.deepEqual(pageWindow(20, 20), [1, "ellipsis", 19, 20]);
});
