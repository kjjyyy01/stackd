import type { Metadata } from "next";
import BackToTop from "@/components/back-to-top";
import DraftBanner from "@/components/draft-banner";
import HeroIntro from "@/components/hero-intro";
import HomeCarousel from "@/components/home-carousel";
import ScrollReveal from "@/components/scroll-reveal";
import { Button, buttonVariants } from "@/components/ui/button";
import WorkflowBuilder from "@/components/workflow-builder";
import WorkflowCard from "@/components/workflow-card";
import { EMPTY_DRAFT, type Draft } from "@/lib/draft";
import { HERO_CARD } from "@/lib/hero-card";
import { createClient } from "@/lib/supabase/server";

// SCR-001 홈 메타 — 제목·설명은 PRD-04 표 그대로. OG는 app/opengraph-image.tsx 상속
export const metadata: Metadata = {
  title: { absolute: "Stackd — 내 AI 워크플로우 카드 만들기" },
  alternates: { canonical: "/" },
  openGraph: { title: "Stackd — 내 AI 워크플로우 카드 만들기", url: "/" },
};

// 0번 카드 축소 렌더 (EL-HOME-003) — 배율은 호출부 --s, 값은 DESIGN.md §홈 캐러셀 조판
function ScaledCard({ className = "", cardClassName = "" }: { className?: string; cardClassName?: string }) {
  return (
    /* overflow-hidden — scale은 페인트만 축소, 레이아웃 560px이 그리드 최소폭을 밀지 않게 */
    <div className={`h-[calc(700px*var(--s))] w-[calc(560px*var(--s))] overflow-hidden ${className}`}>
      <div className="origin-top-left [transform:scale(var(--s))]">
        <WorkflowCard workflow={HERO_CARD} handle="kjjyyy01" className={cardClassName} />
      </div>
    </div>
  );
}

// 슬라이드 공통 프레임 — 풀뷰포트 높이·내부 폭 72rem (DESIGN.md §홈 캐러셀 조판)
const SLIDE = "relative w-full overflow-hidden lg:shrink-0 lg:snap-start";
// 풀뷰포트 높이는 lg+에서만 — lg 미만은 세로 스택이라 콘텐츠가 높이를 정한다
const SLIDE_INNER =
  "relative z-[1] mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 md:grid-cols-[5fr_6fr] lg:min-h-[max(38rem,calc(100dvh-4rem))] lg:px-8 lg:py-12";
// 질문(q) 타이포 — md 2열 진입 시 열 폭에 맞춰 한 단계 낮추고 xl에서 원 크기 복귀
const SLIDE_Q =
  "mt-2.5 text-2xl font-semibold leading-[1.35] tracking-[-0.015em] text-balance sm:text-3xl md:text-2xl lg:text-3xl xl:text-[2.5rem]";
const SLIDE_VIZ =
  "flex flex-wrap items-center justify-center gap-6 justify-self-center md:justify-self-end lg:flex-nowrap";

// 슬라이드 2 배경 도구명 텍스처 — 장면 데이터 (카피 아님)
// 위치가 % 기준이라 1열(md 미만)에서는 상단 4개가 본문 위를 지난다 — 실측 겹침 495~17433px²
// → md 미만에서 숨긴다(`hidden md:block`). 하단 4개는 전 폭에서 겹침 0이라 그대로 둔다
const WORDFIELD: Array<[string, string]> = [
  ["chrome-devtools", "left-[4%] top-[12%] text-3xl -rotate-6 hidden md:block"],
  ["sequential-thinking", "left-[62%] top-[8%] text-[1.375rem] rotate-[4deg] hidden md:block"],
  ["ponytail", "left-[78%] top-[38%] text-[2rem] -rotate-3"],
  ["claude-mem", "left-[8%] top-[74%] text-2xl rotate-[5deg]"],
  ["make-prd", "left-[40%] top-[88%] text-[1.6875rem] -rotate-[4deg]"],
  ["superpowers", "left-[68%] top-[78%] text-xl rotate-6"],
  ["context7", "left-[30%] top-[4%] text-xl rotate-3 hidden md:block"],
  ["GSAP", "left-[88%] top-[14%] text-[1.1875rem] -rotate-[5deg] hidden md:block"],
];

// 빌더에 실을 필드만 — id·user_id·작성자 스냅샷은 저장 시 서버가 다시 채운다 (BR-025)
const EDIT_COLUMNS = "title, situation_short, situation, steps, dev_stack, role, accent, is_public";

// SCR-001 홈 v3 — 캐러셀 히어로 + 쇼케이스 + 과정 레일 + 빌더 (Day 8 시안 이식)
export default async function Home({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams;
  // 로그인 사용자의 소속 기본값 — 없거나 실패하면 빈 값 (REQ-HOME-004 AC-3)
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;

  // 수정 모드 (REQ-HOME-006) — RLS "public read"는 타인의 공개 카드도 통과시키므로
  // 소유자 게이트는 user_id 명시 필터다. 0행·에러·비로그인은 전부 빈 빌더, 안내 없음 (AC-2·AC-3)
  let initial: Draft | undefined;
  if (edit && userId) {
    const { data: row } = await supabase
      .from("workflows")
      .select(EDIT_COLUMNS)
      .eq("id", edit)
      .eq("user_id", userId)
      .maybeSingle();
    if (row) initial = { ...EMPTY_DRAFT, ...row, editId: edit };
  }

  return (
    <main className="flex-1">
      {/* 수정 모드에서는 같은 카드의 초안일 때만 배너 (SCR-001 §11 #3) */}
      <DraftBanner editId={initial?.editId} />

      {/* 풀뷰포트 캐러셀 (EL-HOME-016) — 슬라이드는 서버 렌더, 컨트롤만 클라이언트 */}
      <section aria-label="Stackd 소개">
        <HomeCarousel slideCount={3}>
          {/* 슬라이드 1 = 히어로: h1·부제·CTA + 카톡 공유 장면 DOM 재현 (EL-HOME-002·017·022) */}
          <article className={`${SLIDE} bg-(--chat-bg)`}>
            {/* 오케스트레이션 래퍼 (ANIMATION.md #1) — 콘텐츠는 서버 렌더 유지 */}
            <HeroIntro className={SLIDE_INNER}>
              <div data-hero="text">
                <h1 className="max-w-[20ch] text-[2.75rem] sm:text-[3.5rem] md:text-4xl lg:text-6xl xl:text-7xl">
                  도구는 아는데, 어떻게 쓰는지는 모른다.
                </h1>
                <p className="mt-6 max-w-[62ch] text-lg text-[#3f4a56] sm:text-xl md:text-lg lg:text-xl">
                  실제 개발자들이 어떤 상황에서, 어떤 순서로 agent를 쓰는지 — 워크플로우를 카드 한 장으로
                  공유하세요.
                </p>
                <div className="mt-8">
                  {/* 히어로 CTA — DESIGN.md §접근성 "본문 주요 CTA 44px" 미달이었다(36px). 48px로 올림 */}
                  {/* asChild로 감싸야 cn()의 tailwind-merge가 base의 text-sm을 걷어낸다 */}
                  <Button asChild size="lg" className="h-12 px-6 text-base">
                    <a href="#builder">바로 만들기</a>
                  </Button>
                </div>
              </div>
              <div
                data-hero="chat"
                role="img"
                aria-label="메신저에서 워크플로우 카드가 링크로 공유된 장면"
                className="grid w-full max-w-lg gap-3.5 justify-self-center md:justify-self-end"
              >
                <p className="m-0 w-fit max-w-[85%] rounded-[1.25rem] rounded-tl-sm bg-white px-4 py-3 text-base leading-normal sm:px-4.5 sm:py-3.5 sm:text-lg">
                  그 셋업 어떻게 했어요? 저도 따라해보고 싶어요
                </p>
                <p className="m-0 w-fit max-w-[85%] justify-self-end rounded-[1.25rem] rounded-tr-sm bg-(--chat-me) px-4 py-3 text-base leading-normal text-[#111419] sm:px-4.5 sm:py-3.5 sm:text-lg">
                  제 워크플로우 카드로 정리해뒀어요
                </p>
                <div className="w-full max-w-92 justify-self-end overflow-hidden rounded-xl bg-white">
                  <div className="flex justify-center bg-muted pb-3 pt-4.5">
                    <ScaledCard className="[--s:0.26] sm:[--s:0.38]" cardClassName="shadow-none" />
                  </div>
                  <div className="border-t border-border px-4 py-3.5">
                    <p className="text-base font-semibold leading-[1.4] sm:text-[1.0625rem]">{HERO_CARD.title}</p>
                    <p className="mt-1 font-mono text-[0.8125rem] leading-none text-muted-foreground">stackd.kr</p>
                  </div>
                </div>
              </div>
            </HeroIntro>
          </article>

          {/* 슬라이드 2: 무질서 → 순서 (EL-HOME-018) */}
          <article className={`${SLIDE} bg-background`}>
            <div aria-hidden className="absolute inset-0">
              {WORDFIELD.map(([name, pos]) => (
                <span key={name} className={`absolute whitespace-nowrap font-mono text-muted-foreground opacity-[0.07] md:opacity-[0.14] ${pos}`}>
                  {name}
                </span>
              ))}
            </div>
            <div className={SLIDE_INNER}>
              <div>
                <p className="text-base font-medium text-muted-foreground">이런 적 있죠</p>
                <p className={SLIDE_Q}>
                  새 도구는 매주 쏟아지는데, 뭘 어떤 순서로 조합할지는 아무도 안 알려줘요
                </p>
                <div className="mt-8 grid gap-2 border-t border-border pt-7">
                  <span className="text-base font-medium text-muted-foreground">Stackd의 답</span>
                  <p className="text-lg font-medium xl:text-xl">도구 목록이 아니라, 상황과 순서가 담긴 워크플로우를 통째로 공유해요</p>
                </div>
              </div>
              <div
                role="img"
                aria-label="흩어진 도구 이름들이 순서 있는 단계로 정리되는 모습"
                className={SLIDE_VIZ}
              >
                <div className="flex max-w-64 flex-wrap gap-3">
                  {["chrome-devtools", "superpowers", "make-prd", "ponytail", "claude-mem"].map((name, i) => (
                    <span
                      key={name}
                      className={`rounded-full border border-border bg-card px-4 py-2 font-mono text-base leading-none text-muted-foreground ${i === 1 ? "-rotate-[4deg]" : i === 3 ? "rotate-3" : ""}`}
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <span aria-hidden className="basis-full rotate-90 text-center text-4xl text-muted-foreground lg:basis-auto lg:rotate-0 lg:text-left shrink-0">→</span>
                <ol className="relative grid gap-4.5 rounded-xl border border-border bg-card px-7 py-6">
                  <span aria-hidden className="absolute bottom-8 left-[calc(1.75rem+14px)] top-8 w-px bg-border" />
                  {["superpowers", "make-prd", "ponytail"].map((name, i) => (
                    <li key={name} className="relative flex items-center gap-3.5">
                      <span className="z-[1] flex size-7 items-center justify-center rounded-full bg-foreground font-mono text-[11px] font-medium text-background">
                        {`0${i + 1}`}
                      </span>
                      <span className="font-mono text-[1.0625rem] font-medium leading-none">{name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>

          {/* 슬라이드 3: 길다 vs 한 장 (EL-HOME-019) */}
          <article className={`${SLIDE} bg-muted`}>
            <div className={SLIDE_INNER}>
              <div>
                <p className="text-base font-medium text-muted-foreground">이런 적 있죠</p>
                <p className={SLIDE_Q}>
                  블로그 글은 너무 길고, 트윗은 너무 얕아요
                </p>
                <div className="mt-8 grid gap-2 border-t border-foreground/10 pt-7">
                  <span className="text-base font-medium text-muted-foreground">Stackd의 답</span>
                  <p className="text-lg font-medium xl:text-xl">카드 한 장이 요약, 클릭하면 단계별 설명이 상세 페이지로 열려요</p>
                </div>
              </div>
              <div
                role="img"
                aria-label="긴 문서가 카드 한 장으로 요약되는 모습"
                className={SLIDE_VIZ}
              >
                <div aria-hidden className="grid w-54 gap-2.5 rounded-lg border border-border bg-card p-6">
                  {Array.from({ length: 9 }, (_, i) => (
                    <span key={i} className={`block h-2 rounded-sm bg-muted ${i % 2 === 0 ? "w-[92%]" : "w-[70%]"}`} />
                  ))}
                </div>
                <span aria-hidden className="basis-full rotate-90 text-center text-4xl text-muted-foreground lg:basis-auto lg:rotate-0 lg:text-left shrink-0">→</span>
                <ScaledCard className="[--s:0.36] sm:[--s:0.52] md:[--s:0.42] lg:[--s:0.52]" cardClassName="shadow-[0_12px_28px_-12px_rgba(17,20,25,0.18)]" />
              </div>
            </div>
          </article>
        </HomeCarousel>
      </section>

      {/* 카드 쇼케이스 (EL-HOME-020) — 슬라이드 1의 카드를 실물 크기 블리드로 */}
      <section aria-label="카드 실물 보기" className="relative overflow-hidden border-t border-border py-16 sm:py-24">
        {/* 스크롤 리빌 (ANIMATION.md #6) — 콘텐츠는 서버 렌더 유지 */}
        <ScrollReveal className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div data-reveal>
            <h2 className="text-2xl sm:text-3xl">방금 그 카드, 펼치면 이렇습니다</h2>
            <p className="mt-3 max-w-[62ch] text-muted-foreground">
              채팅에 실려 있던 카드 그대로예요. 상황 한 줄, 단계 레일, 개발 스택까지 — 한 장에 담겨요.
            </p>
          </div>
          <div data-reveal className="flex justify-center md:justify-end">
            {/* 모바일·md는 블리드 없이 온전히(0.58), lg는 0.8 콘텐츠 안 수렴(뷰포트 우측 32px 여백 — 가장자리 밀착 답답함 해소),
                원본(1.0)·-10vw 블리드는 xl+(1280부터 여백이 뻗침을 흡수, 8/25 실측) */}
            <ScaledCard
              className="[--s:0.58] sm:-mr-[12vw] sm:[--s:0.9] md:mr-0 md:[--s:0.58] lg:mr-0 lg:[--s:0.8] xl:-mr-[10vw] xl:[--s:1]"
              cardClassName="shadow-[0_24px_56px_-16px_rgba(17,20,25,0.16)]"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* 과정 레일 (EL-HOME-021) — 시그니처 단계 레일 조형 재사용 */}
      <section aria-label="만드는 과정" className="border-t border-border py-16 sm:py-24">
        {/* 스크롤 리빌 (ANIMATION.md #6) — 단계는 각자 진입 시 등장 */}
        <ScrollReveal className="container-page">
          <div data-reveal>
            <h2 className="text-2xl sm:text-3xl">적은 그대로, 카드 한 장이 됩니다</h2>
            <p className="mt-3 max-w-[62ch] text-muted-foreground">
              위의 예시 카드도 이 순서로 만들어졌어요. 저장 전까지 로그인은 필요 없어요.
            </p>
          </div>
          <ol className="relative mt-12 grid gap-14">
            <span aria-hidden className="absolute bottom-4 left-4 top-4 w-px bg-border" />
            <li data-reveal className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-4 sm:gap-6">
              <span className="z-[1] flex size-8 items-center justify-center rounded-full bg-foreground font-mono text-xs font-medium text-background">01</span>
              <div>
                <h3 className="mt-1 text-lg sm:text-xl">상황과 단계를 적는다</h3>
                <p className="mt-2 max-w-[62ch] text-muted-foreground">
                  언제 쓰는 워크플로우인지 한 줄, 그리고 도구를 쓰는 순서대로 단계를 담아요. 도구는
                  카탈로그에서 고르거나 직접 입력해요.
                </p>
                <div
                  role="img"
                  aria-label="빌더에 제목과 첫 단계가 입력된 모습"
                  className="mt-5 grid max-w-xl gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">제목 — 이 워크플로우를 한 줄로</p>
                    <p className="mt-1.5 rounded-lg border border-input px-3 py-2 text-sm leading-normal">{HERO_CARD.title}</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                    <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[9px] font-medium text-background">01</span>
                    <div>
                      <p className="font-mono text-[0.8125rem] font-medium leading-[1.2]">{HERO_CARD.steps[0].tool.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{HERO_CARD.steps[0].note}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li data-reveal className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-4 sm:gap-6">
              <span className="z-[1] flex size-8 items-center justify-center rounded-full bg-foreground font-mono text-xs font-medium text-background">02</span>
              <div>
                <h3 className="mt-1 text-lg sm:text-xl">카드로 미리 본다</h3>
                <p className="mt-2 max-w-[62ch] text-muted-foreground">
                  입력한 내용이 그대로 한 장의 카드가 돼요. 단계 레일과 스택 태그까지, 공유될 모습 그대로
                  미리 봅니다.
                </p>
                <ScaledCard className="mt-5 [--s:0.5]" cardClassName="shadow-none" />
              </div>
            </li>
            <li data-reveal className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-4 sm:gap-6">
              <span className="z-[1] flex size-8 items-center justify-center rounded-full bg-foreground font-mono text-xs font-medium text-background">03</span>
              <div>
                <h3 className="mt-1 text-lg sm:text-xl">링크·PNG로 공유한다</h3>
                <p className="mt-2 max-w-[62ch] text-muted-foreground">
                  링크를 복사하거나 PNG로 저장해서 어디든 공유해요. 링크가 붙는 곳마다 카드 미리보기가 함께
                  실려요.
                </p>
                <div className="mt-5 grid max-w-xl gap-3">
                  <div
                    role="img"
                    aria-label="링크 복사와 PNG 저장 버튼이 있는 공유 줄"
                    className="flex items-center justify-between gap-4 overflow-hidden rounded-lg border border-border bg-card px-3.5 py-2.5"
                  >
                    <span className="min-w-0 flex-1 truncate font-mono text-[0.8125rem] text-muted-foreground">stackd.kr/card-detail/wf_3x9k2m</span>
                    <span className="flex shrink-0 gap-2">
                      <span className={buttonVariants({ variant: "outline", size: "sm" })}>링크 복사</span>
                      <span className={buttonVariants({ variant: "outline", size: "sm" })}>PNG 저장</span>
                    </span>
                  </div>
                  <div role="img" aria-label="링크 미리보기 카드" className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="flex h-24 items-center justify-center bg-muted">
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">Workflow Card</span>
                    </div>
                    <div className="border-t border-border px-3.5 py-3">
                      <p className="text-sm font-semibold leading-[1.4]">{HERO_CARD.title}</p>
                      <p className="mt-1 font-mono text-xs leading-none text-muted-foreground">stackd.kr</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </ScrollReveal>
      </section>

      {/* 빌더 (EL-HOME-024 + 005~014) — 헤딩은 서버 렌더, 폼은 클라이언트 */}
      <section id="builder" className="scroll-mt-16 border-t border-border py-16 sm:py-24">
        <div className="container-page">
          {/* 수정 모드는 헤딩부터 바꾼다 — 같은 화면이라 맥락 표시가 없으면 새로 쓰는 것으로 읽힌다 (CPY-HOME-058) */}
          <h2 className="text-2xl sm:text-3xl">{initial ? "워크플로우 수정하기" : "내 워크플로우 적기"}</h2>
          <p className="mt-3 max-w-[62ch] text-muted-foreground">
            카드 한 장까지 2분이면 충분해요. 저장할 때만 GitHub 로그인이 필요해요.
          </p>
        </div>
        <WorkflowBuilder initial={initial} />
      </section>

      <BackToTop />
    </main>
  );
}
