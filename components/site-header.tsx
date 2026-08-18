import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signInWithGitHub, signOut } from "@/app/auth/actions";

// 공통 헤더 — 로고 + 로그인/로그아웃 (Day 4 최소판, 내비는 화면 생기면 추가)
// ponytail: cookies() 때문에 전 페이지 동적 렌더 — LCP 예산 걸리면 Suspense/cacheComponents로 분리
export default async function SiteHeader() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const handle = data?.claims.user_metadata?.user_name as string | undefined;

  return (
    <header className="w-full border-b border-zinc-200">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Stackd
        </Link>
        {handle ? (
          <form action={signOut} className="flex items-center gap-3 text-sm">
            <span>@{handle}</span>
            <button type="submit" className="rounded border border-zinc-300 px-3 py-1">
              로그아웃
            </button>
          </form>
        ) : (
          <form action={signInWithGitHub}>
            <input type="hidden" name="next" value="/" />
            <button type="submit" className="rounded bg-zinc-900 px-3 py-1 text-sm text-white">
              GitHub로 로그인
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
