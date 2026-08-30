import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Analytics from "@/components/analytics";
import LoginEvent from "@/components/login-event";
import { Toaster } from "@/components/ui/sonner";

// 본문·제목 — 한글용으로 그려진 휴머니스트 그로테스크 (DESIGN.md §타이포)
const plexKr = IBM_Plex_Sans_KR({
  variable: "--font-plex-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// 기계 식별자 전용 — 도구명·단계 번호·STACK 태그
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// 사이트 공통 메타 — canonical·OG 절대경로 기준 (PRD-04)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), // 프리뷰는 그 배포 주소 — og:image가 읽혀야 한다 (lib/site.ts)
  title: {
    default: "Stackd — 내 AI 워크플로우 카드 만들기",
    template: "%s | Stackd",
  },
  description:
    "도구는 아는데 어떻게 쓰는지 모른다면 — 실제 개발자들의 AI 워크플로우를 카드 한 장으로 공유하고 라이브러리에서 예시를 보세요.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Stackd",
    locale: "ko_KR",
    url: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 라우트 전환 중 smooth 스크롤 억제 — 없으면 morph와 스크롤 복원이 충돌 (Next 권고)
    <html lang="ko" data-scroll-behavior="smooth" className={`${plexKr.variable} ${plexMono.variable} h-full`}>
      {/* 확장 프로그램이 body에 속성 주입 — 경고만 억제 */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Toaster position="bottom-center" />
        <LoginEvent />
        <Analytics />
      </body>
    </html>
  );
}
