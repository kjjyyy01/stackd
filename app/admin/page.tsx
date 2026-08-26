import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adminResolve, adminSetHidden } from "@/app/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isAdmin } from "@/lib/admin";
import { LIMITS } from "@/lib/limits";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// 운영 화면 — 사용자 노출 없음 (PRD-04)
export const metadata: Metadata = {
  title: "운영",
  robots: { index: false, follow: false },
};

type Workflow = {
  id: string;
  title: string;
  author_handle: string;
  is_public: boolean;
  hidden: boolean;
  hidden_reason: string | null;
  situation: string;
  steps: { tool_name: string; note: string; detail: string }[];
};

type Row = {
  id: number;
  type: string;
  body: string;
  reporter_id: string | null;
  resolved: boolean;
  created_at: string;
  workflow_id: string | null;
  workflows: Workflow | null;
};

const TYPE_LABEL: Record<string, string> = {
  report: "신고",
  contact: "문의",
  feedback: "피드백",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ all?: string; err?: string }>;
}) {
  const { all, err } = await searchParams;

  // 게이트 (BR-022) — 비허용은 404, 로그인 유도 없음 (REQ-ADMIN-001 AC-2)
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!isAdmin(claims?.claims.sub, process.env.ADMIN_USER_IDS)) notFound();

  // service role — 비공개·hidden 대상도 여기서 열람해야 판단이 된다 (PRD-09)
  let query = createAdminClient()
    .from("feedback")
    .select(
      "id, type, body, reporter_id, resolved, created_at, workflow_id, workflows(id, title, author_handle, is_public, hidden, hidden_reason, situation, steps)",
    )
    .order("created_at", { ascending: false })
    .limit(100); // 페이지네이션 없음 (v1)

  const showAll = all === "1";
  if (!showAll) query = query.eq("resolved", false);

  const { data } = await query.overrideTypes<Row[]>();
  const rows = data ?? [];

  return (
    <main className="container-page flex-1 py-10 lg:py-14">
      {/* EL-ADMIN-001 (CPY-ADMIN-001) */}
      <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">신고·문의 처리</h1>

      {/* EL-ADMIN-002 필터 — 링크형이라 JS 없이 동작 (CPY-ADMIN-003) */}
      <p className="mt-4 text-sm">
        <Link
          href={showAll ? "/admin" : "/admin?all=1"}
          className="inline-block py-2.5 underline underline-offset-4"
        >
          {showAll ? "미처리만 보기" : "전체 보기"}
        </Link>
        <span className="ml-3 text-muted-foreground">{rows.length}건</span>
      </p>

      {/* 액션 실패 (ERR-ADMIN-002) */}
      {err && (
        <p className="mt-4 rounded-md border border-destructive/40 px-4 py-3 text-sm text-destructive">
          처리에 실패했어요 — 사유를 1~200자로 적었는지 확인하고 다시 시도해주세요
        </p>
      )}

      {rows.length === 0 ? (
        /* EL-ADMIN-005 (CPY-ADMIN-004) */
        <p className="mt-10 text-muted-foreground">처리할 신고·문의가 없어요</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {rows.map((row) => (
            <li key={row.id} className="rounded-xl border border-border p-5">
              {/* 메타 줄 — 배지는 텍스트 병기 (§15) */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{TYPE_LABEL[row.type] ?? row.type}</Badge>
                {row.resolved && <Badge variant="outline">처리 완료</Badge>}
                <time dateTime={row.created_at}>
                  {new Date(row.created_at).toLocaleString("ko-KR")}
                </time>
                <span>· 신고자 {row.reporter_id ? "로그인" : "익명"}</span>
              </div>

              {/* 본문 — 텍스트 렌더만, 링크화 없음 (PRD-08 XSS) */}
              <p className="mt-3 whitespace-pre-wrap leading-[1.75]">{row.body}</p>

              {row.workflows && <TargetCard workflow={row.workflows} />}

              <div className="mt-4 flex flex-wrap items-end gap-3">
                {row.workflows && <HiddenForm workflow={row.workflows} />}
                {!row.resolved && (
                  <form action={adminResolve}>
                    <input type="hidden" name="feedbackId" value={row.id} />
                    <Button type="submit" variant="outline" size="lg" className="h-11">
                      처리 완료
                    </Button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

// EL-ADMIN-003 대상 요약 — 펼치기는 native <details>라 JS가 필요 없다
function TargetCard({ workflow: w }: { workflow: Workflow }) {
  return (
    <div className="mt-4 rounded-lg bg-muted/40 p-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">{w.title}</span>
        <span className="font-mono text-muted-foreground">@{w.author_handle}</span>
        {!w.is_public && <Badge variant="outline">비공개</Badge>}
        {w.hidden && <Badge variant="destructive">숨김</Badge>}
        <Link
          href={`/card-detail/${w.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 underline underline-offset-4"
        >
          상세 열기
        </Link>
      </div>

      {w.hidden && w.hidden_reason && (
        <p className="mt-2 text-sm text-muted-foreground">숨김 사유: {w.hidden_reason}</p>
      )}

      <details className="mt-2">
        <summary className="cursor-pointer py-2 text-sm text-muted-foreground">전문 보기</summary>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-[1.75]">{w.situation}</p>
        <ol className="mt-3 space-y-2 text-sm leading-[1.75]">
          {w.steps.map((s, i) => (
            <li key={i}>
              <span className="font-mono text-muted-foreground">{i + 1}. </span>
              <span className="font-mono">{s.tool_name}</span> — {s.note}
              <span className="block text-muted-foreground">{s.detail}</span>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}

// EL-ADMIN-004·006 — 숨기기는 사유 필수라 입력을 항상 같이 둔다 (BR-018)
function HiddenForm({ workflow: w }: { workflow: Workflow }) {
  return (
    <form action={adminSetHidden} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="id" value={w.id} />
      <input type="hidden" name="hidden" value={String(!w.hidden)} />
      {!w.hidden && (
        <label className="text-sm">
          <span className="sr-only">숨김 사유</span>
          <Input
            name="reason"
            required
            minLength={LIMITS.hidden_reason.min}
            maxLength={LIMITS.hidden_reason.max}
            placeholder="숨김 사유 (카드 자리에 모두에게 표시돼요, 1~200자)"
            className="h-11 w-full sm:w-96"
          />
        </label>
      )}
      <Button type="submit" variant={w.hidden ? "outline" : "destructive"} size="lg" className="h-11">
        {w.hidden ? "다시 보이기" : "숨기기"}
      </Button>
    </form>
  );
}
