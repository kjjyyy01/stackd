import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 사이트 공통 메타 — canonical·OG 절대경로 기준
export const metadata: Metadata = {
  metadataBase: new URL("https://stackd.kr"),
  title: "Stackd — 내 AI 스택 카드 만들기",
  description:
    "설정을 붙여넣으면 공유하고 싶어지는 AI 스택 카드가 나옵니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
