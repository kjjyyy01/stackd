"use server";

import { revalidatePath } from "next/cache";
import { ACCENTS } from "@/components/workflow-card";
import { validateWorkflow } from "@/lib/limits";
import { createClient } from "@/lib/supabase/server";

export type SaveResult = { ok: true; id: string } | { ok: false; code: string };

// 워크플로우 id = 16진 8자 (BR-023)
const newId = () => crypto.randomUUID().slice(0, 8);

// 카드 저장 — 신규 insert / editId 있으면 소유자 update (PRD-06 saveWorkflow)
export async function saveWorkflow(draft: unknown, editId?: string): Promise<SaveResult> {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims.sub;
  if (!userId) return { ok: false, code: "ERR-AUTH-001" };

  // 클라이언트 게이트와 같은 함수로 재검증 (BR-007)
  const parsed = validateWorkflow(draft);
  if (!parsed.ok) return { ok: false, code: "ERR-CARD-001" };

  const meta = claims.claims.user_metadata ?? {};
  const row = {
    ...parsed.value,
    // 팔레트 밖 슬러그는 기본값으로 (PRD-05)
    accent: parsed.value.accent in ACCENTS ? parsed.value.accent : "ink",
    // 작성자는 저장 시점 GitHub 스냅샷 (BR-025)
    author_handle: (meta.user_name as string | undefined) ?? "unknown",
    author_avatar: (meta.avatar_url as string | undefined) ?? null,
    user_id: userId,
  };

  if (editId) {
    // 소유권 = RLS 1차, user_id 조건이 2차 (BR-024)
    const { data, error } = await supabase
      .from("workflows")
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq("id", editId)
      .eq("user_id", userId)
      .select("id")
      .maybeSingle();
    if (error) return { ok: false, code: "ERR-CARD-004" };
    // 0행 = 삭제됐거나 타인 카드. 세션은 위에서 확인했으므로 인증 문제가 아니다 (ERR-CARD-006)
    if (!data) return { ok: false, code: "ERR-CARD-006" };
    return { ok: true, id: data.id };
  }

  // id 충돌 시 최대 3회 재생성 (BR-023)
  for (let i = 0; i < 3; i++) {
    const { data, error } = await supabase
      .from("workflows")
      .insert({ ...row, id: newId() })
      .select("id")
      .single();
    if (data) return { ok: true, id: data.id };
    if (error?.code !== "23505") break; // 충돌 외 오류는 재시도해도 같다
  }
  return { ok: false, code: "ERR-CARD-004" };
}

export type ActionResult = { ok: boolean; code?: string };

// 세션 uid — 없으면 null (쓰기 액션 공통 진입 검사)
async function currentUserId(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await supabase.auth.getClaims();
  return data?.claims.sub ?? null;
}

// 카드 삭제 — 소유자만 (BR-024, PRD-06 deleteWorkflow)
export async function deleteWorkflow(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const userId = await currentUserId(supabase);
  if (!userId) return { ok: false, code: "ERR-AUTH-001" };

  const { error, count } = await supabase
    .from("workflows")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", userId);
  // count 0 = 타인 카드거나 이미 없음 — 존재 여부를 구분해 알리지 않는다 (BR-006)
  if (error || !count) return { ok: false, code: "ERR-ME-001" };
  revalidatePath("/me"); // 목록에서 즉시 빠져야 한다 (REQ-ME-003 AC-1)
  return { ok: true };
}

// 공개 전환 — hidden 카드는 전환 불가 (BR-018)
export async function togglePublic(id: string, isPublic: boolean): Promise<ActionResult> {
  const supabase = await createClient();
  const userId = await currentUserId(supabase);
  if (!userId) return { ok: false, code: "ERR-AUTH-001" };

  const { error, count } = await supabase
    .from("workflows")
    .update({ is_public: isPublic, updated_at: new Date().toISOString() }, { count: "exact" })
    .eq("id", id)
    .eq("user_id", userId)
    .eq("hidden", false);
  if (error || !count) return { ok: false, code: "ERR-ME-001" };
  revalidatePath("/me"); // 배지·스위치의 원본은 서버다 (REQ-ME-004 AC-1)
  return { ok: true };
}
