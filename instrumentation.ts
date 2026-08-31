import * as Sentry from "@sentry/nextjs";

// 서버 계측 — 서버 인스턴스당 1회 실행 (Next 16 파일 규약)
export function register() {
  // DSN 없으면 안 심는다 — 로컬·프리뷰 오염 방지 (analytics.tsx와 같은 규칙)
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  // 엣지 런타임 분기 없음 — Next 16 proxy는 Node 기본, runtime 지정 자체가 금지
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    // ponytail: 에러만 수집. 성능 회귀를 쫓게 되면 0.1로
    tracesSampleRate: 0,
    // PII 금지 (PRD-14) — 핸들·이메일·IP를 이벤트에 싣지 않는다
    sendDefaultPii: false,
  });
}

// 서버 컴포넌트·서버 액션·라우트 핸들러·proxy 에러 수집
export const onRequestError = Sentry.captureRequestError;
