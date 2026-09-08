import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

// AI 검색용 사이트 요약 (llms.txt 규격) — sitemap과 같은 공개·!hidden 필터
export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workflows")
    .select("id, title, situation_short")
    .eq("is_public", true)
    .eq("hidden", false)
    .order("created_at", { ascending: false });

  const cards = (data ?? []).map((w) => `- [${w.title}](${SITE_URL}/card-detail/${w.id}): ${w.situation_short}`);
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## 페이지",
    `- [홈](${SITE_URL}/): 내 AI 워크플로우 카드 만들기`,
    `- [라이브러리](${SITE_URL}/workflows): 공개된 워크플로우 카드 목록`,
    "",
    "## 워크플로우 카드",
    ...cards,
    "",
  ].join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
