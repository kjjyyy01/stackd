import { ImageResponse } from "next/og";

// 전 페이지 기본 OG — 개별 페이지가 덮어쓰지 않으면 이 이미지가 쓰인다 (PRD-04 "정적 기본")
// 한글은 폰트 파일이 필요해 넣지 않는다 (OQ-003 판정 대기) — 워드마크만 라틴 기본 폰트로
export const alt = "Stackd — AI 워크플로우 카드";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 카드와 같은 고정 팔레트 (workflow-card.tsx)
const INK = "#111419";
const SURFACE = "#ffffff";
const MUTED = "#656972";

export default function OpengraphImage() {
  return new ImageResponse(
    (
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

        <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
          stackd
        </div>
        <div style={{ fontSize: 40, color: MUTED, marginTop: 28 }}>
          Share your AI workflow as a card — stackd.kr
        </div>
      </div>
    ),
    size,
  );
}
