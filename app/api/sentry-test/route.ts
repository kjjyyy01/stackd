// ⚠️ 임시 라우트 — Sentry 서버 캡처·알림 채널 검증 전용. main 머지 전 삭제 (TODO.md Day 15)
// instrumentation.ts의 onRequestError가 이 에러를 잡아 Sentry로 보내는지 확인한다
export async function GET() {
  throw new Error("Sentry 서버 캡처 검증용 의도적 에러 (app/api/sentry-test)");
}
