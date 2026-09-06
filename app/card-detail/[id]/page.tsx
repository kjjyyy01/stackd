import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import CardActions from "@/components/card-actions";
import FeedbackDialog from "@/components/feedback-dialog";
import JsonLd from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import CardTransition from "@/components/card-transition";
import WorkflowCard from "@/components/workflow-card";
import type { WorkflowInput } from "@/lib/limits";
import { BASE_OG, SITE_URL } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

type Row = WorkflowInput & {
  id: string;
  user_id: string;
  author_handle: string;
  author_avatar: string | null;
  hidden: boolean;
  hidden_reason: string | null;
  created_at: string;
  updated_at: string;
};

// id 형식이 어긋나면 조회 없이 없는 것으로 (BR-023·006)
// generateMetadata와 본문이 같은 요청에서 두 번 부른다 — 조회는 1회로 (React cache)
const getWorkflow = cache(async (id: string) => {
  if (!/^[0-9a-f]{8}$/.test(id)) return null;
  const supabase = await createClient();
  // RLS가 비공개 타인 행을 이미 걸러낸다 — 여기 null = 없음이거나 권한 없음 (BR-006)
  const { data } = await supabase.from("workflows").select("*").eq("id", id).maybeSingle();
  const { data: claims } = await supabase.auth.getClaims();
  return data ? { wf: data as Row, isOwner: claims?.claims.sub === data.user_id } : null;
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const found = await getWorkflow(id);
  if (!found) return { title: "페이지를 찾을 수 없어요", robots: { index: false } };

  const { wf } = found;
  const title = `${wf.title} — @${wf.author_handle}`;
  const description = `${wf.situation_short} · ${wf.steps.length}단계 워크플로우`;
  // 비공개·hidden은 색인·동적 OG 제외 (BR-017·018) — 기본 OG로 폴백
  const shareable = wf.is_public && !wf.hidden;

  return {
    title,
    description,
    alternates: { canonical: `/card-detail/${wf.id}` },
    robots: shareable ? undefined : { index: false, follow: false },
    openGraph: {
      ...BASE_OG, // 선언하면 상위 openGraph가 교체된다 — site_name·type·이미지 메타를 되깐다
      title,
      description,
      url: `/card-detail/${wf.id}`,
      // 공개만 동적 OG, v=는 updated_at epoch 캐시 버스팅 (PRD-06). 비공개·hidden은 정적 기본
      images: shareable
        ? [
            {
              ...BASE_OG.images[0], // 크기·타입은 동적 OG도 같은 1200×630 (PRD-06)
              url: `/api/og?id=${wf.id}&v=${Math.floor(new Date(wf.updated_at).getTime() / 1000)}`,
              alt: `${wf.title} 워크플로우 카드`,
            },
          ]
        : BASE_OG.images,
    },
  };
}

export default async function CardDetailPage({ params }: Params) {
  const { id } = await params;
  const found = await getWorkflow(id);
  if (!found) notFound(); // ERR-SHARE-001

  const { wf, isOwner } = found;

  // hidden은 404가 아니라 블러 — 타인에게는 내용을 렌더하지 않는다 (BR-018, EL-WF-011)
  if (wf.hidden && !isOwner) {
    return (
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <h1 className="text-2xl font-semibold tracking-[-0.015em]">숨겨진 워크플로우</h1>
        <div
          aria-hidden
          className="mt-8 h-[406px] w-[325px] rounded-xl border border-border bg-muted blur-sm"
        />
        <p className="mt-6 max-w-[62ch] text-sm leading-[1.75] text-muted-foreground">
          신고 검토로 숨겨진 워크플로우예요 — 사유: {wf.hidden_reason}
        </p>
        <Link href="/?utm_source=card&utm_medium=share" className={`${buttonVariants({ size: "lg" })} mt-8 h-11 px-6`}>
          나도 내 워크플로우 카드 만들기
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* 색인 대상일 때만 구조화 데이터 — noindex 카드에 내보내면 메타와 모순 (BR-017·018) */}
      {wf.is_public && !wf.hidden && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: wf.title,
            description: `${wf.situation_short} · ${wf.steps.length}단계 워크플로우`,
            url: `${SITE_URL}/card-detail/${wf.id}`,
            // JSON-LD는 metadataBase를 상속받지 않는다 — 절대 URL로 적는다
            image: `${SITE_URL}/api/og?id=${wf.id}&v=${Math.floor(new Date(wf.updated_at).getTime() / 1000)}`,
            datePublished: wf.created_at,
            dateModified: wf.updated_at,
            inLanguage: "ko-KR",
            author: {
              "@type": "Person",
              name: wf.author_handle,
              url: `https://github.com/${wf.author_handle}`,
            },
          }}
        />
      )}
      <div className="lg:grid lg:grid-cols-[560px_minmax(0,1fr)] lg:items-start lg:gap-10">
        {/* EL-WF-001 요약 카드 — 유도 문구는 미노출(이미 상세다) */}
        <div className="[--s:0.58] sm:[--s:0.78] lg:[--s:1]">
          {/* 목록·미리보기에서 morph로 도착 (ANIMATION.md #3·#4) */}
          <CardTransition id={wf.id}>
            {/* mx-auto — 없으면 남는 폭이 전부 오른쪽에 몰린다 (/workflows와 동일) */}
            <div className="mx-auto h-[calc(700px*var(--s))] w-[calc(560px*var(--s))] overflow-hidden">
              <div className="origin-top-left [transform:scale(var(--s))]">
                <WorkflowCard id="wf-card" workflow={wf} handle={wf.author_handle} showDetailHint={false} titleAs="h1" />
              </div>
            </div>
          </CardTransition>
        </div>

        <div className="mt-8 lg:mt-0">
          {/* EL-WF-002 상태 배지 — 소유자에게만, hidden 우선 (BR-018) */}
          {isOwner && wf.hidden && (
            <Badge variant="destructive">
              이 카드는 신고 검토로 숨겨졌어요 — 사유: {wf.hidden_reason}. 문의는 하단 링크로
            </Badge>
          )}
          {isOwner && !wf.hidden && !wf.is_public && (
            <Badge variant="secondary">이 카드는 비공개예요 — 나만 볼 수 있어요</Badge>
          )}

          {/* EL-WF-005 작성자 — 이메일 미노출, GitHub 프로필로만 (BR-025) */}
          <div className="mt-6 flex items-center gap-3">
            {wf.author_avatar && (
              <Image
                src={wf.author_avatar}
                alt={`@${wf.author_handle} 프로필 이미지`}
                width={40}
                height={40}
                className="rounded-full"
                unoptimized
              />
            )}
            <a
              href={`https://github.com/${wf.author_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm underline underline-offset-4"
            >
              @{wf.author_handle}
            </a>
            {wf.role && <span className="text-sm text-muted-foreground">· {wf.role}</span>}
          </div>

          {/* EL-WF-006·009 공유·소유자 액션 (클라이언트) */}
          <CardActions id={wf.id} isOwner={isOwner} isPublic={wf.is_public} hidden={wf.hidden} />

          {/* EL-WF-007 CTA — 소유자는 UTM 없이(자기 유입은 확산이 아니다, PRD-15 §UTM) */}
          <Link
            href={isOwner ? "/" : "/?utm_source=card&utm_medium=share"}
            className={`${buttonVariants({ size: "lg" })} mt-8 h-11 w-full px-6 sm:w-auto`}
          >
            {isOwner ? "카드 하나 더 만들기" : "나도 내 워크플로우 카드 만들기"}
          </Link>

          {/* EL-WF-008 신고 — 푸터 문의와 같은 dialog, type만 report */}
          <div className="mt-6">
            <FeedbackDialog
              type="report"
              workflowId={wf.id}
              title="이 워크플로우 신고하기"
              description="문제가 되는 부분을 알려주시면 확인 후 조치할게요."
              trigger={
                <button type="button" className="py-2.5 text-sm text-muted-foreground underline underline-offset-4">
                  이 워크플로우 신고하기
                </button>
              }
            />
          </div>
        </div>
      </div>

      {/* EL-WF-003 상황 상세 — 비어 있으면 섹션 생략 (BR-012) */}
      {wf.situation && (
        <section className="mt-14">
          <h2 className="text-lg font-semibold tracking-[-0.015em]">상황</h2>
          <p className="mt-3 max-w-[62ch] whitespace-pre-wrap text-base leading-[1.75]">{wf.situation}</p>
        </section>
      )}

      {/* EL-WF-004 단계별 설명 — 카드에서 잘린 메모 전문이 여기 있다 */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-[-0.015em]">단계별 설명</h2>
        <ol className="mt-4 space-y-8">
          {wf.steps.map((s, i) => (
            <li key={`${s.tool.name}-${i}`} className="max-w-[62ch]">
              <p className="font-mono text-sm font-medium">
                {String(i + 1).padStart(2, "0")} {s.tool.name}
                {s.tool.custom && (
                  <span className="ml-2 rounded-sm bg-muted px-1.5 py-0.5 align-middle font-mono text-xs font-medium text-muted-foreground">
                    custom
                  </span>
                )}
                <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">{s.tool.category}</span>
              </p>
              <p className="mt-1 text-base leading-[1.75]">{s.note}</p>
              {s.detail && (
                <p className="mt-2 whitespace-pre-wrap text-sm leading-[1.75] text-muted-foreground">{s.detail}</p>
              )}
            </li>
          ))}
        </ol>
        {wf.steps.some((s) => s.tool.custom) && (
          <p className="mt-6 text-sm leading-[1.75] text-muted-foreground" style={{ wordBreak: "keep-all" }}>
            custom 표시가 붙은 도구는 공개돼 있지 않아 그대로 가져다 쓸 수 없어요.
          </p>
        )}
      </section>
    </main>
  );
}
