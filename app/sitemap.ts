import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

// 정적 4개 + 공개·!hidden 상세 동적 (PRD-04 §사이트맵)
// hidden은 RLS를 통과하므로 앱에서 걸러야 한다 (schema.sql "public read" 주석)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workflows")
    .select("id, updated_at")
    .eq("is_public", true)
    .eq("hidden", false);

  const details = (data ?? []).map((w) => ({
    url: `${BASE}/card-detail/${w.id}`,
    lastModified: new Date(w.updated_at),
  }));

  // 홈·라이브러리는 카드가 바뀔 때 바뀐다 — 최신 카드 시각을 lastmod로.
  // privacy·terms는 신뢰할 날짜 소스가 없어 생략 (부정확한 lastmod는 없느니만 못하다)
  const latest = details.length
    ? new Date(Math.max(...details.map((d) => d.lastModified.getTime())))
    : undefined;

  return [
    { url: `${BASE}/`, lastModified: latest },
    { url: `${BASE}/workflows`, lastModified: latest }, // SCR-006 — 컷 판정 시 이 줄도 제거
    { url: `${BASE}/privacy` },
    { url: `${BASE}/terms` },
    ...details,
  ];
}
