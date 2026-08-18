import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signInWithGitHub, signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";

// 공통 헤더 — 로고 / 라이브러리 / 로그인 or 내 카드·설정 (PRD-04 사이트맵)
// ponytail: cookies() 때문에 전 페이지 동적 렌더 — LCP 예산 걸리면 Suspense/cacheComponents로 분리
export default async function SiteHeader() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const handle = data?.claims.user_metadata?.user_name as string | undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-base font-medium tracking-tight rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          stackd
        </Link>

        <nav aria-label="주요" className="flex items-center gap-1 text-sm">
          <Link
            href="/workflows"
            className="rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            라이브러리
          </Link>

          {handle ? (
            <>
              <Link
                href="/me"
                className="rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                내 카드
              </Link>
              {/* 좁은 화면에서는 감춘다 — @핸들이 같은 곳(/settings)으로 간다 */}
              <Link
                href="/settings"
                className="hidden rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-block"
              >
                설정
              </Link>
              <Link
                href="/settings"
                className="ml-2 hidden rounded-md px-2 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-block"
              >
                @{handle}
              </Link>
              <form action={signOut} className="ml-1">
                {/* 내비 링크와 같은 무게 — 로그아웃은 주요 행동이 아니다 */}
                <Button
                  type="submit"
                  variant="ghost"
                  size="lg"
                  className="font-normal text-muted-foreground"
                >
                  로그아웃
                </Button>
              </form>
            </>
          ) : (
            <form action={signInWithGitHub} className="ml-1">
              <input type="hidden" name="next" value="/" />
              <Button type="submit" size="lg">
                GitHub으로 로그인
              </Button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
