// OG 공용 — 정적 기본 이미지(app/opengraph-image.tsx)와 /api/og 폴백이 같은 그림을 쓴다
// 카드와 동일한 고정 팔레트 (workflow-card.tsx · DESIGN.md §색 사용 규칙)

import { TAGLINE_FONT } from "@/lib/og-font";
import { WORDMARK_DARK } from "@/lib/og-wordmark";

export const OG_SIZE = { width: 1200, height: 630 };
export const INK = "#111419";
export const SURFACE = "#ffffff";
export const MUTED = "#656972";

// DefaultOg 렌더에 반드시 같이 넘긴다 — 태그라인이 한글이라 폰트가 없으면 통째로 빈칸이 된다.
// 호출부가 2곳(정적 OG·/api/og 폴백)이라 각자 넘기게 두면 한쪽을 빠뜨린다
export const DEFAULT_OG_FONTS = [
  { name: "Sans", data: TAGLINE_FONT, weight: 400 as const, style: "normal" as const },
];

// ERR-OG-001 폴백 겸 사이트 기본 OG — DEFAULT_OG_FONTS와 세트로만 쓴다
export function DefaultOg() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: INK,
        color: SURFACE,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
      }}
    >
      {/* 카드의 시그니처 단계 레일을 축약 — 세로선 + 노드 3개 */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{ width: 14, height: 14, borderRadius: 7, background: i === 0 ? SURFACE : MUTED }}
          />
        ))}
        <div style={{ width: 160, height: 2, background: MUTED, marginLeft: 4 }} />
      </div>

      {/* 워드마크는 이미지 — @vercel/og 기본 폰트가 Geist 하나뿐이라 텍스트로는 서체·굵기가 안 맞는다 */}
      {/* 633×157 원본 비율 유지 (4.0318:1) */}
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori는 next/image를 못 읽는다 */}
      <img src={WORDMARK_DARK} width={420} height={104} alt="" />
      {/* 문구를 고치면 lib/og-font.ts 서브셋도 다시 받아야 한다 — 없는 글자는 빈칸으로 나온다 */}
      <div style={{ fontSize: 40, color: MUTED, marginTop: 28 }}>
        내 AI 워크플로우를 카드 한 장으로 — stackd.kr
      </div>
    </div>
  );
}
