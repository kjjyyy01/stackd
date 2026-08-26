// 절대 URL 기준 SSOT (PRD-17) — metadataBase·sitemap·robots가 함께 쓴다.
// VERCEL_ENV·VERCEL_URL은 Vercel이 자동 주입하는 시스템 변수라 별도 등록이 필요 없다.
//
// 프리뷰가 배포 주소여야 하는 이유: metadataBase가 프로덕션으로 고정돼 있으면 og:image가
// 항상 stackd.kr을 가리켜, 아직 배포되지 않은 OG를 프리뷰에서 검증할 방법이 없다 (2026-08-26 실측).
// 프로덕션을 상수로 고정하는 이유: canonical이 걸린 자리라 env 오설정 하나로 색인이 깨진다.
export const SITE_URL =
  process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.VERCEL_ENV === "production"
      ? "https://stackd.kr"
      : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackd.kr");
