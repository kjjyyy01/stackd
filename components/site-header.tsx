import Link from "next/link";
import Image from "next/image";
import markHeader from "@/app/mark-header.png";
import { createClient } from "@/lib/supabase/server";
import { signInWithGitHub } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/mobile-nav";
import UserMenu from "@/components/user-menu";

// 공통 헤더 — 로고 / 라이브러리 / 로그인 or 내 카드·설정 (PRD-04 사이트맵)
// ponytail: cookies() 때문에 전 페이지 동적 렌더 — LCP 예산 걸리면 Suspense/cacheComponents로 분리
export default async function SiteHeader() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const handle = data?.claims.user_metadata?.user_name as string | undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* 록업 = 마크(PNG) + 워드마크(실제 텍스트) — 텍스트라 검색·복사·리더 모두 유효 */}
        <Link
          href="/"
          aria-label="Stackd 홈"
          className="flex items-center gap-2 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image
            src={markHeader}
            alt=""
            width={26}
            height={32}
            priority
            className="h-8 w-[26px]"
          />
          {/* W2 워드마크 — Sans 600, 액센트는 마지막 d 하나에만 (로고 시스템) */}
          <span className="font-sans text-3xl leading-none font-semibold tracking-tight">
            stack<span className="text-primary">d</span>
          </span>
        </Link>

        {/* 데스크톱 내비 — lg 이상. 공개 링크는 서버 HTML, 계정 항목은 UserMenu 안 */}
        <nav aria-label="주요" className="hidden items-center gap-1 text-sm lg:flex">
          <Link
            href="/workflows"
            className="rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            라이브러리
          </Link>

          {handle ? (
            /* 계정 항목은 @핸들 아래로 접는다 (2026-08-28) — 내비에 개인 메뉴가 4개 나열되던 것을 1개로 */
            <UserMenu handle={handle} />
          ) : (
            <form action={signInWithGitHub} className="ml-1">
              <input type="hidden" name="next" value="/" />
              <Button type="submit" size="lg">
                GitHub으로 로그인
              </Button>
            </form>
          )}
        </nav>

        {/* 모바일·태블릿 — lg 미만. 로그인은 전환의 핵심이라 시트에 숨기지 않는다 */}
        <div className="flex items-center gap-1 lg:hidden">
          {!handle && (
            <form action={signInWithGitHub}>
              <input type="hidden" name="next" value="/" />
              <Button type="submit" size="lg">
                GitHub으로 로그인
              </Button>
            </form>
          )}
          <MobileNav handle={handle} />
        </div>
      </div>
    </header>
  );
}
