import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요",
  robots: { index: false, follow: false },
};

// 404 — 중앙 정렬이 허용되는 3곳 중 하나 (DESIGN.md §정렬 축)
export default function NotFound() {
  return (
    <main className="container-page flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">404</p>
      <h1 className="text-2xl sm:text-3xl">페이지를 찾을 수 없어요</h1>
      <p className="max-w-[62ch] text-muted-foreground">
        주소가 바뀌었거나, 비공개로 전환된 카드일 수 있어요.
      </p>
      {/* 본문 주요 CTA는 44px (DESIGN.md §접근성) */}
      <Button asChild size="lg" className="h-11 px-5">
        <Link href="/">홈으로</Link>
      </Button>
    </main>
  );
}
