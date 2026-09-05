import { test } from "node:test";
import assert from "node:assert/strict";
import { isCatalogTool } from "./catalog.ts";

test("카탈로그에 있는 도구는 true (BR-026)", () => {
  assert.equal(isCatalogTool("superpowers"), true);
});

test("카탈로그에 없는 도구는 false — 개인 제작 스킬 (BR-026)", () => {
  assert.equal(isCatalogTool("commit-push"), false);
});

test("빈 문자열·공백은 false", () => {
  assert.equal(isCatalogTool(""), false);
  assert.equal(isCatalogTool("   "), false);
});
