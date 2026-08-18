"use server";

import { after } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateFeedbackBody } from "@/lib/limits";

// 신고(report) = SCR-004, 문의·피드백(contact) = 전 페이지 푸터 (PRD-06 submitFeedback)
const TYPES = ["report", "contact", "feedback"] as const;
export type FeedbackType = (typeof TYPES)[number];

export type FeedbackResult = { status: "ok" | "error" };

// Slack 알림 — 3초 타임아웃, 재시도 없음, 실패는 무시 (PRD-13 · BR-021)
async function notifySlack(text: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // 웹훅 실패는 저장 성공에 영향 없음 — /admin이 최종 확인 경로
  }
}

export async function submitFeedback(formData: FormData): Promise<FeedbackResult> {
  // 입력은 전부 서버에서 재검증 — 클라이언트 값을 믿지 않는다
  const rawType = String(formData.get("type") ?? "");
  const type = (TYPES as readonly string[]).includes(rawType)
    ? (rawType as FeedbackType)
    : "contact";

  const parsed = validateFeedbackBody(formData.get("body"));
  if (!parsed.ok) return { status: "error" }; // ERR-FB-001

  const rawWorkflowId = String(formData.get("workflowId") ?? "");
  const workflowId = /^[0-9a-f]{8}$/.test(rawWorkflowId) ? rawWorkflowId : null; // BR-023

  // 세션이 있으면 reporter_id로 남기고, 없으면 익명 — 이메일 등 PII 필드는 없다
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const reporterId = claims?.claims.sub ?? null;

  const { error } = await createAdminClient()
    .from("feedback")
    .insert({
      type,
      body: parsed.value,
      workflow_id: workflowId,
      reporter_id: reporterId,
    });

  if (error) return { status: "error" }; // ERR-FB-001

  // 웹훅은 응답 뒤로 — 사용자가 Slack 왕복(~1.5초)을 기다릴 이유가 없다
  after(() =>
    notifySlack(`[stackd/${type}]${workflowId ? ` card=${workflowId}` : ""} ${parsed.value}`),
  );

  return { status: "ok" };
}
