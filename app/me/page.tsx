import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import MyCardActions from "@/components/my-card-actions";
import { buttonVariants } from "@/components/ui/button";
import CardTransition from "@/components/card-transition";
import WorkflowCard from "@/components/workflow-card";
import { createClient } from "@/lib/supabase/server";

// SCR-007 메타 — 개인 목록이라 색인 제외 (PRD-04)
export const metadata: Metadata = {
  title: "내 카드",
  robots: { index: false, follow: false },
};

// 카드에 실리는 필드 + 목록 액션에 필요한 상태만
const LIST_COLUMNS =
  "id, title, situation_short, steps, dev_stack, role, accent, is_public, hidden, hidden_reason";

export default async function MePage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims.sub;
  // 세션 확인 실패도 비인증으로 본다 — 재로그인이 복구 경로 (REQ-ME-001 AC-2·AC-3)
  if (!userId) redirect("/?auth=required");

  const handle = claims?.claims.user_metadata?.user_name as string | undefined;

  // RLS "public read"는 타인의 공개 카드도 통과시키므로 user_id 필터가 "내 것만"의 근거다
  // ponytail: 페이지네이션 없음 — 13장째부터 SCR-006 REQ-LIB-002의 ?page= 규칙을 적용한다
  const { data: rows, error } = await supabase
    .from("workflows")
    .select(LIST_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        {/* EL-ME-001 페이지 유일 h1 (CPY-ME-001) */}
        <h1 className="text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">내 카드</h1>
        {/* EL-ME-002 — 헤더와 중복이나 로그아웃·탈퇴를 찾는 동선용 */}
        <Link
          href="/settings"
          className="py-2.5 text-sm leading-[1.75] text-muted-foreground underline underline-offset-4"
        >
          설정
        </Link>
      </div>

      {error ? (
        /* EL-ME-010 — h1 유지 + 재시도 (ERR-LIB-001 · CPY-LIB-002) */
        <div className="mt-16 grid justify-items-center gap-4 text-center">
          <p className="text-muted-foreground">목록을 불러오지 못했어요 — 다시 시도해주세요</p>
          <Link href="/me" className={buttonVariants({ variant: "outline" })}>
            다시 시도
          </Link>
        </div>
      ) : !rows?.length ? (
        /* EL-ME-009 Empty (CPY-ME-002 + CPY-HOME-006) */
        <div className="mt-16 grid justify-items-center gap-5 text-center">
          <p className="text-muted-foreground">아직 만든 카드가 없어요 — 첫 워크플로우를 만들어보세요</p>
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            카드 만들기
          </Link>
        </div>
      ) : (
        /* EL-ME-003·004 — 최신순. 카드는 소유자라 비공개·hidden도 열린다 (PRD-09) */
        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {rows.map((w) => (
            <li key={w.id} className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <Link href={`/card-detail/${w.id}`} aria-label={`${w.title} 상세 보기`}>
                {/* 조판은 560×700 고정, 목록에서는 scale로만 축소 (DESIGN.md §카드 조판) */}
                {/* 상세로 morph (ANIMATION.md #3) */}
                <CardTransition id={w.id}>
                  <div className="mx-auto h-[calc(700px*var(--s))] w-[calc(560px*var(--s))] overflow-hidden [--s:0.55] sm:[--s:0.62] md:[--s:0.6]">
                    <div className="origin-top-left [transform:scale(var(--s))]">
                      <WorkflowCard workflow={w} handle={handle} />
                    </div>
                  </div>
                </CardTransition>
              </Link>
              <h2 className="mt-4 text-lg font-semibold leading-[1.4]">{w.title}</h2>
              <MyCardActions
                id={w.id}
                isPublic={w.is_public}
                hidden={w.hidden}
                hiddenReason={w.hidden_reason}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
