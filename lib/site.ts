import type { Metadata } from "next";

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

// 사이트 이름·설명 SSOT — layout 메타와 홈 JSON-LD가 같은 값을 써야 어긋나지 않는다
export const SITE_NAME = "Stackd";

// 하위 라우트가 openGraph를 선언하면 상위 객체가 병합이 아니라 **교체**된다 —
// site_name·locale·type·이미지 메타가 통째로 사라진다 (2026-09-03 Day 17 실측).
// 선언하는 페이지는 이걸 스프레드로 깔고 url·images만 덮어쓴다.
export const BASE_OG = {
  type: "website",
  siteName: SITE_NAME,
  locale: "ko_KR",
  // 문자열 URL로 주면 Next가 크기를 몰라 og:image:width/height/type/alt를 못 만든다 — 객체로 명시.
  // 값은 app/opengraph-image.tsx의 size(lib/og.tsx OG_SIZE)·contentType·alt와 같아야 한다.
  // og.tsx를 import하지 않는 이유: base64 폰트를 끌고 있어 layout·sitemap까지 딸려온다
  images: [
    { url: "/opengraph-image", width: 1200, height: 630, type: "image/png", alt: "Stackd — AI 워크플로우 카드" },
  ],
} satisfies Metadata["openGraph"];
export const SITE_DESCRIPTION =
  "도구는 아는데 어떻게 쓰는지 모른다면 — 실제 개발자들의 AI 워크플로우를 카드 한 장으로 공유하고 라이브러리에서 예시를 보세요.";
