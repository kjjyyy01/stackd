import Link from "next/link";
import Image from "next/image";
import markHeader from "@/app/mark-header.png";

import { createClient } from "@/lib/supabase/server";
import { signInWithGitHub } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/mobile-nav";
import UserMenu from "@/components/user-menu";

// 헤더 로고 기준 크기(데스크톱). 너비는 파일 비율(여백 없는 록업)에서 계산
// 높이 40 = 워드마크 x-height 15.5px, 헤더 72px 안 위아래 여백 16
const LOGO_H = 40;
const LOGO_W = Math.round((LOGO_H * markHeader.width) / markHeader.height);

// 데스크톱·모바일 내비 공용 로그인 폼 — 배치 여백만 className으로 다름
function LoginForm({ className }: { className?: string }) {
  return (
    <form action={signInWithGitHub} className={className}>
      <input type="hidden" name="next" value="/" />
      <Button type="submit" size="lg">
        GitHub으로 로그인
      </Button>
    </form>
  );
}

// 공통 헤더 — 로고 / 라이브러리 / 로그인 or 내 카드·설정 (PRD-04 사이트맵)
// ponytail: cookies() 때문에 전 페이지 동적 렌더 — LCP 예산 걸리면 Suspense/cacheComponents로 분리
export default async function SiteHeader() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const handle = data?.claims.user_metadata?.user_name as string | undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
        {/* 로고 = mark-header PNG 1장(마크+워드마크 록업). 접근명은 링크 aria-label */}
        <Link
          href="/"
          aria-label="Stackd 홈"
          className="flex items-center rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image
            src={markHeader}
            alt=""
            width={LOGO_W}
            height={LOGO_H}
            priority
            // 로고 높이 32·36·40(모바일·태블릿·데스크톱), 가로는 w-auto로 파일 비율을 따른다
            className="h-8 w-auto md:h-9 lg:h-10"
          />
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
            <LoginForm className="ml-1" />
          )}
        </nav>

        {/* 모바일·태블릿 — lg 미만. 로그인은 전환의 핵심이라 시트에 숨기지 않는다 */}
        <div className="flex items-center gap-1 lg:hidden">
          {!handle && <LoginForm />}
          <MobileNav handle={handle} />
        </div>
      </div>
    </header>
  );
}
