import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, LIMITS, charCount, validateFeedbackBody, validateWorkflow } from "./limits.ts";

// 유효한 최소 입력 — 각 테스트가 한 필드씩 깨뜨려 사용
const valid = () => ({
  title: "PR 리뷰 자동화",
  situation_short: "PR 올릴 때",
  situation: "",
  steps: [
    { tool: { name: "Claude Code", category: "agent" }, note: "리뷰 요청", detail: "diff를 읽고 리뷰 코멘트 초안 작성" },
    { tool: { name: "gh", category: "tool" }, note: "PR 코멘트 게시", detail: "gh pr comment로 게시" },
  ],
  dev_stack: [],
  role: "",
  accent: "ink",
  is_public: true,
});

test("제목이 비면 ERR-BLDR-003 (BR-010)", () => {
  const r = validateWorkflow({ ...valid(), title: "  " });
  assert.deepEqual(r, { ok: false, code: "ERR-BLDR-003", field: "title" });
});

test("제목 31자면 ERR-BLDR-003, 30자는 통과 (BR-010)", () => {
  assert.equal(validateWorkflow({ ...valid(), title: "가".repeat(31) }).ok, false);
  assert.equal(validateWorkflow({ ...valid(), title: "가".repeat(30) }).ok, true);
});

test("상황 라벨 비거나 21자+ → ERR-BLDR-004 (BR-011)", () => {
  assert.deepEqual(validateWorkflow({ ...valid(), situation_short: "" }), { ok: false, code: "ERR-BLDR-004", field: "situation_short" });
  assert.equal(validateWorkflow({ ...valid(), situation_short: "가".repeat(21) }).ok, false);
});

test("상황 상세 1001자 → ERR-BLDR-005, 빈 값은 허용 (BR-012)", () => {
  assert.deepEqual(validateWorkflow({ ...valid(), situation: "a".repeat(1001) }), { ok: false, code: "ERR-BLDR-005", field: "situation" });
  assert.equal(validateWorkflow({ ...valid(), situation: "" }).ok, true);
});

test("단계 1개 → ERR-CARD-001, 9개 → ERR-BLDR-001 (BR-001)", () => {
  const one = valid().steps.slice(0, 1);
  assert.deepEqual(validateWorkflow({ ...valid(), steps: one }), { ok: false, code: "ERR-CARD-001", field: "steps" });
  const nine = Array.from({ length: 9 }, () => valid().steps[0]);
  assert.deepEqual(validateWorkflow({ ...valid(), steps: nine }), { ok: false, code: "ERR-BLDR-001", field: "steps" });
});

test("도구 이름 41자 → ERR-BLDR-002, 카테고리 enum 밖 → ERR-CARD-001 (BR-002·004)", () => {
  const v = valid();
  v.steps[1].tool.name = "x".repeat(41);
  assert.deepEqual(validateWorkflow(v), { ok: false, code: "ERR-BLDR-002", field: "steps.1.tool.name" });
  const w = valid();
  w.steps[0].tool.category = "widget";
  assert.deepEqual(validateWorkflow(w), { ok: false, code: "ERR-CARD-001", field: "steps.0.tool.category" });
});

test("단계 메모 빈 값·61자, 상세 빈 값·501자 → ERR-BLDR-005 (BR-013·014)", () => {
  const a = valid(); a.steps[0].note = "";
  assert.deepEqual(validateWorkflow(a), { ok: false, code: "ERR-BLDR-005", field: "steps.0.note" });
  const b = valid(); b.steps[0].note = "n".repeat(61);
  assert.equal(validateWorkflow(b).ok, false);
  const c = valid(); c.steps[1].detail = " ";
  assert.deepEqual(validateWorkflow(c), { ok: false, code: "ERR-BLDR-005", field: "steps.1.detail" });
  const d = valid(); d.steps[1].detail = "d".repeat(501);
  assert.equal(validateWorkflow(d).ok, false);
});

test("개발 스택 5개 → ERR-BLDR-006, 카테고리 skill은 거부 (BR-015·004)", () => {
  const tag = { name: "React", category: "framework" };
  assert.deepEqual(validateWorkflow({ ...valid(), dev_stack: Array(5).fill(tag) }), { ok: false, code: "ERR-BLDR-006", field: "dev_stack" });
  assert.deepEqual(validateWorkflow({ ...valid(), dev_stack: [{ name: "x", category: "skill" }] }), { ok: false, code: "ERR-CARD-001", field: "dev_stack.0.category" });
  assert.equal(validateWorkflow({ ...valid(), dev_stack: Array(4).fill(tag) }).ok, true);
});

test("소속·역할 21자 → ERR-CARD-003, 빈 값 허용 (BR-008)", () => {
  assert.deepEqual(validateWorkflow({ ...valid(), role: "r".repeat(21) }), { ok: false, code: "ERR-CARD-003", field: "role" });
  assert.equal(validateWorkflow({ ...valid(), role: "" }).ok, true);
});

test("이모지·조합 문자는 1자로 센다 (BR-003) — 30자 제한에 이모지 30개 통과", () => {
  assert.equal(charCount("👨‍👩‍👧가"), 2);
  assert.equal(validateWorkflow({ ...valid(), title: "🚀".repeat(30) }).ok, true);
});

test("통과 시 trim된 정규화 값 반환, is_public 기본 true, accent 기본 ink", () => {
  const r = validateWorkflow({ ...valid(), title: "  제목  ", is_public: undefined, accent: "" });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.title, "제목");
    assert.equal(r.value.is_public, true);
    assert.equal(r.value.accent, "ink");
    assert.equal(r.value.steps.length, 2);
  }
});

test("신고·문의 본문 빈 값·501자 → ERR-FB-001 (BR-021)", () => {
  assert.deepEqual(validateFeedbackBody("  "), { ok: false, code: "ERR-FB-001", field: "body" });
  assert.equal(validateFeedbackBody("b".repeat(501)).ok, false);
  assert.deepEqual(validateFeedbackBody(" 문의합니다 "), { ok: true, value: "문의합니다" });
});

test("catalog.json 전 항목이 enum 7종·이름 1~40자·id 유일 (PRD-05 카탈로그)", async () => {
  const { default: catalog } = await import("../data/catalog.json", { with: { type: "json" } });
  const ids = new Set<string>();
  for (const e of catalog as { id: string; name: string; category: string }[]) {
    assert.ok((CATEGORIES as readonly string[]).includes(e.category), `${e.id}: category ${e.category}`);
    assert.ok(charCount(e.name) >= LIMITS.tool_name.min && charCount(e.name) <= LIMITS.tool_name.max, `${e.id}: name length`);
    assert.ok(!ids.has(e.id), `${e.id}: duplicate id`);
    ids.add(e.id);
  }
  assert.ok(catalog.length >= 160, `catalog too small: ${catalog.length}`);
});
