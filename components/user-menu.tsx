"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { signOut } from "@/app/auth/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 헤더 계정 메뉴 (lg 이상) — @핸들을 눌러 내 카드·설정·로그아웃을 연다
// lg 미만은 mobile-nav의 Sheet가 같은 항목을 갖는다 (중복 렌더 없음)
export default function UserMenu({ handle }: { handle: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <DropdownMenu>
      {/* data-state는 트리거에 붙는다 — 아이콘에 직접 걸면 안 먹으므로 group으로 넘긴다 */}
      <DropdownMenuTrigger className="group ml-1 flex h-9 items-center gap-1 rounded-md px-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
        <span className="font-mono text-xs">@{handle}</span>
        {/* 열림 상태를 화살표 회전으로 — 상태를 색으로만 알리지 않는다 */}
        <ChevronDown
          className="size-3.5 transition-transform group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link href="/me">내 카드</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">설정</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* 서버 액션이 쿠키를 지우고 redirect('/') 한다 — 여기로 돌아오지 않는다 */}
        <DropdownMenuItem disabled={pending} onSelect={() => startTransition(() => signOut())}>
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
