import Script from "next/script";

// GA4 초기화 (PRD-15) — 측정 ID 없으면 아무것도 심지 않는다(로컬·프리뷰 오염 방지)
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
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
  );
}
