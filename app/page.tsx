import type { Metadata } from "next";
import Image from "next/image";
import heroCard from "@/public/hero-card.png";

// SCR-001 홈 메타 — 제목·설명은 PRD-04 표 그대로 (layout의 template를 쓰지 않고 절대 제목)
export const metadata: Metadata = {
  title: { absolute: "Stackd — 내 AI 워크플로우 카드 만들기" },
  alternates: { canonical: "/" },
  openGraph: { title: "Stackd — 내 AI 워크플로우 카드 만들기", url: "/", images: [{ url: "/hero-card.png", width: 1120, height: 1400 }] },
};

// SCR-001 홈 — 히어로(EL-HOME-002·003). 빌더(EL-HOME-005~)는 다음 단계
export default function Home() {
  return (
    <main className="flex-1">
      {/* 히어로: 모바일 1열(텍스트 → 이미지), md+ 2열 (PRD-SCR-001 §16) */}
      <section className="container-page grid grid-cols-1 gap-10 py-16 sm:py-24 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <h1 className="max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">
            도구는 아는데, 어떻게 쓰는지는 모른다.
          </h1>
          <p className="mt-6 max-w-[62ch] text-muted-foreground">
            실제 개발자들이 어떤 상황에서, 어떤 순서로 agent를 쓰는지 — 워크플로우를 카드 한 장으로
            공유하세요.
          </p>
        </div>
        {/* 0번 카드 — LCP 후보라 priority. 고정 4:5라 CLS 없음 (EL-HOME-003) */}
        <Image
          src={heroCard}
          alt="예시 워크플로우 카드 — 클로드 코드와 서브에이전트로 3주 만에 서비스 출시하기: superpowers부터 Notion·Obsidian까지 8단계"
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="mx-auto w-full max-w-[560px] rounded-xl border border-border md:mx-0 md:ml-auto"
        />
      </section>
    </main>
  );
}
