import Script from "next/script";

// 계측 스크립트 (PRD-15) — ID 없으면 안 심는다(로컬·프리뷰 오염 방지)
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());
gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {/* Clarity 태그는 자체 초기화 — 공식 스니펫 IIFE 불필요 */}
      {clarityId && (
        <Script src={`https://www.clarity.ms/tag/${clarityId}`} strategy="afterInteractive" />
      )}
    </>
  );
}
