import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import CardTransition from "@/components/card-transition";
import GridStagger from "@/components/grid-stagger";
import JsonLd from "@/components/json-ld";
import WorkflowCard from "@/components/workflow-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { pageCount, pageRange, pageWindow, parsePage } from "@/lib/paginate";
import { BASE_OG, SITE_URL } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

// SCR-006 메타 — 색인 대상. ?page≥2도 canonical은 /workflows (첫 페이지만 색인, §13)
// 메타와 리드 문단이 같은 문장 (CPY-LIB-007) — 스니펫과 본문이 어긋나지 않게
const LIB_DESCRIPTION =
  "개발자들이 실제로 쓰는 AI 워크플로우 카드 모음 — 상황·단계·도구를 한 장으로 보고 내 것도 만들어보세요.";

export const metadata: Metadata = {
  title: "라이브러리",
  description: LIB_DESCRIPTION,
  alternates: { canonical: "/workflows" },
  openGraph: { ...BASE_OG, url: "/workflows" }, // BASE_OG 없으면 site_name·type·이미지 메타가 사라진다
};

// 카드 조판에 실리는 필드 + 작성자 표시분. situation(본문)은 목록에서 쓰지 않는다 (§8)
const LIST_COLUMNS =
  "id, title, situation_short, steps, dev_stack, role, accent, author_handle, author_avatar";

export default async function WorkflowsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = parsePage((await searchParams).page);
  const { from, to } = pageRange(page);

  const supabase = await createClient();
  // 명시 필터 필수 — 로그인 세션의 RLS는 본인 비공개 행을 통과시킨다 (§9)
  // count는 별도 head 쿼리로 먼저 받는다 — PostgREST는 range(from,to)의 from이 총 개수를
  // 넘으면 count: "exact"와 함께 쓸 때 416(PGRST103)을 던진다(실측: from=7·total=6 재현).
  // 그래서 유효 페이지인지 먼저 이걸로 판정한 뒤에만 메인 쿼리를 range와 함께 실행한다
  // count 쿼리 실패 시 count는 null → totalPages는 1이 되어 아래 조건이 그대로 걸러준다
  const { count } = await supabase
    .from("workflows")
    .select("id", { count: "exact", head: true })
    .eq("is_public", true)
    .eq("hidden", false);

  const totalPages = pageCount(count ?? 0);
  // 총 페이지 수를 넘는 page 요청 = 범위 초과 — Empty 문구 오노출 방지 (REQ-LIB-002 AC-2)
  if (page > totalPages) redirect("/workflows");

  const { data: rows, error } = await supabase
    .from("workflows")
    .select(LIST_COLUMNS)
    .eq("is_public", true)
    .eq("hidden", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  const items = rows ?? [];

  return (
    <main className="container-page flex-1 py-10 lg:py-14">
      {/* EL-LIB-001 페이지 유일 h1 (CPY-LIB-001) — 오류 상태에서도 유지된다 */}
      <h1 className="text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">
        개발자들의 워크플로우
      </h1>
      {/* EL-LIB-007 리드 문단 — 목록 페이지의 유일한 본문 텍스트 (SEO 점검 9/8) */}
      <p className="mt-3 max-w-[62ch] leading-[1.75] text-muted-foreground">{LIB_DESCRIPTION}</p>

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
          {/* 갤러리 목록 구조화 데이터 — position은 페이지 오프셋 반영 (SEO 점검 9/8) */}
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: items.map((w, i) => ({
                "@type": "ListItem",
                position: from + i + 1,
                name: w.title,
                url: `${SITE_URL}/card-detail/${w.id}`,
              })),
            }}
          />
          {/* EL-LIB-002 목록 — 1열 / sm 2열 / lg 3열 (§16) · 진입 stagger는 ANIMATION.md #5 */}
          <GridStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((w) => (
              <li key={w.id}>
                {/* EL-LIB-003 — 항목 전체가 링크 1개 · 이름은 카드 article의 aria-label에서 온다 (WCAG 2.5.3) */}
                <Link
                  href={`/card-detail/${w.id}`}
                  className="block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {/* 조판은 560×700 고정, 목록에서는 scale로만 축소 (DESIGN.md §카드 조판) */}
                  {/* 상세로 morph (ANIMATION.md #3) */}
                  <CardTransition id={w.id}>
                    {/* gap-4 기준 컬럼폭 실측(sm 288px·md 352px·lg+ 309px)에 맞춰 여유 5~10px만 남기고 최대화 — xl 이상도 lg:grid-cols-3 그대로라 --s를 별도로 안 늘림(늘리면 옆 카드와 겹침, Day 18 실측 결함) */}
                    <div className="mx-auto h-[calc(700px*var(--s))] w-[calc(560px*var(--s))] overflow-hidden [--s:0.58] sm:[--s:0.5] md:[--s:0.61] lg:[--s:0.54]">
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
          </GridStagger>

          {/* EL-LIB-004 페이지네이션 (CPY-LIB-005·006) — 전부 <a href> 실링크, JS 없이 동작.
              size-8/9(32~36px)만으론 §15 터치 타깃 44×44에 못 미쳐 min-h-11 min-w-11로 보정 */}
          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    text="이전"
                    href={page > 1 ? `/workflows?page=${page - 1}` : undefined}
                    aria-disabled={page <= 1}
                    className={`min-h-11 min-w-11 ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
                  />
                </PaginationItem>
                {pageWindow(page, totalPages).map((p, i) =>
                  p === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={`/workflows?page=${p}`}
                        isActive={p === page}
                        className="min-h-11 min-w-11"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    text="다음"
                    href={page < totalPages ? `/workflows?page=${page + 1}` : undefined}
                    aria-disabled={page >= totalPages}
                    className={`min-h-11 min-w-11 ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </main>
  );
}
