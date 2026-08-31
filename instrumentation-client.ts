import * as Sentry from "@sentry/nextjs";

// 클라이언트 계측 — 하이드레이션 직전 실행 (Next 16 파일 규약)
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    // ponytail: 에러만 수집. 성능 회귀를 쫓게 되면 0.1로
    tracesSampleRate: 0,
    // PII 금지 (PRD-14). 세션 리플레이도 미도입 — 화면 녹화는 처리방침 개정이 선행
    sendDefaultPii: false,
  });
}

// 라우트 전환을 에러 컨텍스트(브레드크럼)에 남긴다
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
