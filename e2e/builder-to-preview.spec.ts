import { test, expect } from "@playwright/test";

// 핵심 플로우 1개 (PLAN Day 15~16) — 적기 → 게이트 통과 → 카드 미리보기.
// 저장 이후는 GitHub OAuth라 E2E 대상 밖. 로그인 벽 전까지가 비로그인 가치 경로 전부다.

test.beforeEach(async ({ page }) => {
  // E2E 트래픽이 GA4 판정 지표와 Sentry 에러 집계에 섞이면 안 된다
  await page.route(/googletagmanager\.com|browser\.sentry-cdn\.com|\.ingest\..*sentry\.io/, (r) => r.abort());
});

test("게이트를 채우면 카드 미리보기까지 간다", async ({ page }) => {
  await page.goto("/");
  const builder = page.locator("#builder");

  // 게이트 미충족이면 CTA는 aria-disabled 버튼 (BR-016)
  await expect(builder.getByRole("button", { name: "카드 만들기" })).toHaveAttribute("aria-disabled", "true");

  await builder.locator("#title").fill("E2E 점검용 워크플로우");
  await builder.locator("#situation_short").fill("E2E 점검");

  // 단계 2개 — 카탈로그가 바뀌어도 안 깨지게 직접 입력 경로로 담는다
  const steps = builder.getByRole("group", { name: /^단계/ });
  for (const tool of ["도구A", "도구B"]) {
    await steps.getByRole("button", { name: "단계 추가" }).click();
    await steps.getByPlaceholder("이름", { exact: true }).fill(tool);
    await steps.getByRole("button", { name: "담기" }).click();
  }
  for (const [i, note] of [["0", "설계한다"], ["1", "구현한다"]]) {
    await builder.locator(`#note-${i}`).fill(note);
    await builder.locator(`#detail-${i}`).fill(`${note} — 상세 설명`);
  }

  // 게이트 충족 → CTA가 링크로 바뀐다 (validateWorkflow SSOT가 살아있다는 증거)
  const cta = builder.getByRole("link", { name: "카드 만들기" });
  await expect(cta).toBeVisible();
  await cta.click();

  await expect(page).toHaveURL(/\/card$/);
  await expect(page.getByRole("heading", { level: 1, name: "카드 미리보기" })).toBeVisible();
  // 초안이 localStorage를 거쳐 카드에 실렸는지 — 여기가 끊기면 /card가 홈으로 튕긴다
  await expect(page.getByText("E2E 점검용 워크플로우")).toBeVisible();
});
