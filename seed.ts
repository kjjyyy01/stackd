// 임시 시드 — OG·상세·admin 확인용. 확인 끝나면 `node --env-file=.env.local seed.ts --clean`
import { createClient } from "@supabase/supabase-js";
import { HERO_CARD } from "./lib/hero-card.ts";

const SEED_ID = "5eed0001"; // 16진 8자(BR-023) + 눈에 띄는 값 — 정리할 때 찾기 쉽게

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

if (process.argv.includes("--clean")) {
  await db.from("feedback").delete().eq("workflow_id", SEED_ID);
  const { error } = await db.from("workflows").delete().eq("id", SEED_ID);
  console.log(error ? `삭제 실패: ${error.message}` : `삭제 완료 — workflows(${SEED_ID}) + 연결된 feedback`);
  process.exit(0);
}

const { data: users } = await db.auth.admin.listUsers();
const me = users.users[0];
if (!me) throw new Error("auth.users가 비어 있다 — 먼저 GitHub 로그인 필요");

const { error: wErr } = await db.from("workflows").upsert({
  id: SEED_ID,
  user_id: me.id,
  ...HERO_CARD,
  author_handle: (me.user_metadata?.user_name as string) ?? "unknown",
  author_avatar: (me.user_metadata?.avatar_url as string) ?? null,
});
console.log(wErr ? `workflows 실패: ${wErr.message}` : `workflows OK — /card-detail/${SEED_ID}`);

// /admin 확인용 — 미처리 신고 1건이 있어야 hidden 토글 버튼이 보인다
const { error: fErr } = await db.from("feedback").insert({
  type: "report",
  workflow_id: SEED_ID,
  body: "[시드] admin 화면 확인용 임시 신고입니다.",
  reporter_id: me.id,
});
console.log(fErr ? `feedback 실패: ${fErr.message}` : "feedback OK — /admin 기본 필터에 1건");
