import { defineConfig, devices } from "@playwright/test";

// 대상은 배포 URL 기본 — "로컬에서만 도는 코드는 완성이 아니다" (PLAN 상시 규칙)
// 로컬로 돌리려면 dev 서버를 띄운 뒤 E2E_BASE_URL 없이 실행
export default defineConfig({
  testDir: "e2e",
  // CI 없음 — 실패 시 추적만 남긴다
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
