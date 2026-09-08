import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  poweredByHeader: false, // x-powered-by 제거 (PT-02)
  // 전역 보안 응답 헤더 (PT-01) — 클릭재킹·MIME 스니핑 방어
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

// 소스맵 업로드는 토큰이 있을 때만 — 없는 환경에서 빌드가 깨지지 않게 감싼다
export default process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: !process.env.CI, // 업로드 로그는 CI에서만
    })
  : nextConfig;
