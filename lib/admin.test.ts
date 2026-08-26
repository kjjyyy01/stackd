import assert from "node:assert/strict";
import { test } from "node:test";
import { isAdmin } from "./admin.ts";

const UID = "11111111-2222-3333-4444-555555555555";
const OTHER = "99999999-8888-7777-6666-555555555555";

// TC-ADMIN-001-01 — 미로그인·비허용 uid는 거부
test("허용 목록에 있는 uid만 통과", () => {
  assert.equal(isAdmin(UID, UID), true);
  assert.equal(isAdmin(OTHER, UID), false);
  assert.equal(isAdmin(null, UID), false);
  assert.equal(isAdmin(undefined, UID), false);
});

// TC-ADMIN-001-02 — env 미설정·빈 값이면 전원 404 (fail-closed)
test("env가 없거나 비면 아무도 통과 못 한다", () => {
  assert.equal(isAdmin(UID, undefined), false);
  assert.equal(isAdmin(UID, ""), false);
  assert.equal(isAdmin(UID, "   "), false);
  assert.equal(isAdmin(UID, ",,"), false);
});

test("콤마 구분 다중 uid와 공백을 허용한다", () => {
  assert.equal(isAdmin(OTHER, `${UID}, ${OTHER}`), true);
  assert.equal(isAdmin(UID, ` ${UID} `), true);
});

// 부분 일치로 통과하면 안 된다 — uid 접두사만 맞는 값 차단
test("부분 일치는 통과시키지 않는다", () => {
  assert.equal(isAdmin(UID.slice(0, 8), UID), false);
  assert.equal(isAdmin(UID + "0", UID), false);
});
