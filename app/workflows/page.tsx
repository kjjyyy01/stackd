import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import CardTransition from "@/components/card-transition";
import WorkflowCard from "@/components/workflow-card";
import { pageRange, parsePage, splitPage } from "@/lib/paginate";
import { createClient } from "@/lib/supabase/server";

// SCR-006 메타 — 색인 대상. ?page≥2도 canonical은 /workflows (첫 페이지만 색인, §13)
export const metadata: Metadata = {
  title: "라이브러리",
  description:
    "개발자들이 실제로 쓰는 AI 워크플로우 카드 모음 — 상황·단계·도구를 한 장으로 보고 내 것도 만들어보세요.",
  alternates: { canonical: "/workflows" },
  openGraph: { url: "/workflows" },
};

// 카드 조판에 실리는 필드 + 작성자 표시분. situation(본문)은 목록에서 쓰지 않는다 (§8)
const LIST_COLUMNS =
  "id, title, situation_short, steps, dev_stack, role, accent, author_handle, author_avatar";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function WorkflowsPage({ searchParams }: Props) {
  const page = parsePage((await searchParams).page);
  const { from, to } = pageRange(page);

  const supabase = await createClient();
  // 명시 필터 필수 — 로그인 세션의 RLS는 본인 비공개 행을 통과시킨다 (§9)
  const { data: rows, error } = await supabase
    .from("workflows")
    .select(LIST_COLUMNS)
    .eq("is_public", true)
    .eq("hidden", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  const { items, hasNext } = splitPage(rows ?? []);
  // 2페이지 이상이 0건 = 범위 초과 — Empty 문구 오노출 방지 (REQ-LIB-002 AC-2)
  if (!error && page > 1 && !items.length) redirect("/workflows");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* EL-LIB-001 페이지 유일 h1 (CPY-LIB-001) — 오류 상태에서도 유지된다 */}
      <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
        개발자들의 워크플로우
      </h1>

      {error ? (
        /* EL-LIB-006 (CPY-LIB-002 · ERR-LIB-001) — 재시도는 같은 URL 재요청 */
        <div className="mt-16 grid justify-items-center gap-4 text-center">
          <p className="text-muted-foreground">목록을 불러오지 못했어요 — 다시 시도해주세요</p>
          <Link href="/workflows" className={buttonVariants({ variant: "outline" })}>
            다시 시도
          </Link>
        </div>
      ) : !items.length ? (
        /* EL-LIB-005 Empty (CPY-LIB-003 + CPY-HOME-006) */
        <div className="mt-16 grid justify-items-center gap-5 text-center">
          <p className="text-muted-foreground">
            아직 공개된 워크플로우가 없어요 — 첫 카드를 만들어보세요
          </p>
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            카드 만들기
          </Link>
        </div>
      ) : (
        <>
          {/* EL-LIB-002 목록 — 1열 / sm 2열 / lg 3열 (§16) */}
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((w) => (
              <li key={w.id}>
                {/* EL-LIB-003 — 항목 전체가 링크 1개. 이름은 제목으로 고정한다 (§15) */}
                <Link
                  href={`/card-detail/${w.id}`}
                  aria-label={`${w.title} — @${w.author_handle} 워크플로우 보기`}
                  className="block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {/* 조판은 560×700 고정, 목록에서는 scale로만 축소 (DESIGN.md §카드 조판) */}
                  {/* 상세로 morph (ANIMATION.md #3) */}
                  <CardTransition id={w.id}>
                    <div className="mx-auto h-[calc(700px*var(--s))] w-[calc(560px*var(--s))] overflow-hidden [--s:0.58] sm:[--s:0.49] md:[--s:0.6] lg:[--s:0.52] xl:[--s:0.6]">
                      <div className="origin-top-left [transform:scale(var(--s))]">
                        <WorkflowCard workflow={w} handle={w.author_handle} />
                      </div>
                    </div>
                  </CardTransition>
                  <h2 className="mt-4 text-lg font-semibold leading-[1.4]">{w.title}</h2>
                  <div className="mt-2 flex items-center gap-2">
                    {w.author_avatar && (
                      /* alt="" — 바로 옆 핸들 텍스트가 접근 가능한 이름이다 (§15) */
                      <Image
                        src={w.author_avatar}
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                        unoptimized
                      />
                    )}
                    <span className="font-mono text-xs text-muted-foreground">
                      @{w.author_handle}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* EL-LIB-004 더 보기 (CPY-LIB-004) — 전체 페이지 이동이라 JS 없이 동작 */}
          {hasNext && (
            <div className="mt-12 flex justify-center">
              <Link
                href={`/workflows?page=${page + 1}`}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                더 보기
              </Link>
            </div>
          )}
        </>
      )}
    </main>
  );
}
