import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import { DeleteAccountForm } from "@/components/settings-forms";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

// SCR-008 메타 — 계정 화면이라 색인 제외 (PRD-04)
export const metadata: Metadata = {
  title: "설정",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  // 세션 조회 실패도 미로그인과 같이 처리한다 — 안전 측 (REQ-SET-001 AC-2·AC-3)
  if (!claims?.claims.sub) redirect("/?auth=required");

  const meta = claims.claims.user_metadata ?? {};
  const handle = (meta.user_name as string | undefined) ?? "";
  const avatar = meta.avatar_url as string | undefined;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* EL-SET-001 페이지 유일 h1 (CPY-SET-001) */}
      <h1 className="text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">설정</h1>

      <div className="mt-8 grid gap-10">
        {/* EL-SET-002 계정 표시 — 이메일은 노출하지 않는다 (PRD-14) */}
        <section className="flex items-center gap-3">
          {avatar && (
            <Image
              src={avatar}
              alt={`@${handle} 프로필 이미지`}
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
            />
          )}
          <span className="font-mono text-sm">@{handle}</span>
        </section>

        {/* EL-SET-004 로그아웃 — 서버 액션 폼이라 JS 없이도 동작한다 (§13) */}
        <form action={signOut}>
          <Button type="submit" variant="outline" className="h-11 px-5">
            로그아웃
          </Button>
        </form>

        <DeleteAccountForm handle={handle} />
      </div>
    </main>
  );
}
