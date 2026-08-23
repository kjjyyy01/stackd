import type { Metadata } from "next";
import WorkflowCard from "@/components/workflow-card";
import { HERO_CARD } from "@/lib/hero-card";

// 히어로 이미지(EL-HOME-003) export용 렌더 화면 — 캡처 후 삭제
export const metadata: Metadata = { title: "히어로 캡처", robots: { index: false, follow: false } };

export default function HeroShotPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-12">
      <h1 className="sr-only">히어로 카드 캡처</h1>
      <WorkflowCard workflow={HERO_CARD} handle="kjjyyy01" />
    </main>
  );
}
