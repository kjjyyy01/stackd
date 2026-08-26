import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// PRD-04 메타데이터 표의 noindex 행 = 크롤 제외 경로
// `$`로 끝을 고정 — `/card`만 막고 `/card-detail/{id}`는 크롤돼야 한다 (H-02 공유 루프)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/card$", "/me", "/settings", "/admin", "/auth/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
