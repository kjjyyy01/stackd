import type { Metadata } from "next";
import CardPreview from "@/components/card-preview";
import { createClient } from "@/lib/supabase/server";

// SCR-003 메타 — 저장 전 임시 화면이라 색인 제외 (PRD-04)
export const metadata: Metadata = {
  title: "카드 만들기",
  robots: { index: false, follow: false },
};

export default async function CardPage() {
  // 작성자 표기는 세션 GitHub 스냅샷 (BR-025) — 비로그인은 placeholder
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const handle = data?.claims.user_metadata?.user_name as string | undefined;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* EL-CARD-001 페이지 유일 h1 (CPY-HOME-006) */}
      {/* EL-CARD-001 페이지 유일 h1 (CPY-CARD-019) — 메타 title은 PRD-04대로 "카드 만들기"로 따로 간다 */}
      <h1 className="text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">카드 미리보기</h1>
      <CardPreview handle={handle} loggedIn={Boolean(data?.claims.sub)} />
    </main>
  );
}
