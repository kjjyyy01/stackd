// OG 공용 — 정적 기본 이미지(app/opengraph-image.tsx)와 /api/og 폴백이 같은 그림을 쓴다
// 카드와 동일한 고정 팔레트 (workflow-card.tsx · DESIGN.md §색 사용 규칙)

export const OG_SIZE = { width: 1200, height: 630 };
export const INK = "#111419";
export const SURFACE = "#ffffff";
export const MUTED = "#656972";

// ERR-OG-001 폴백 겸 사이트 기본 OG — 한글 없음(폰트 없이 렌더돼야 한다)
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

      <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
        stackd
      </div>
      <div style={{ fontSize: 40, color: MUTED, marginTop: 28 }}>
        Share your AI workflow as a card — stackd.kr
      </div>
    </div>
  );
}
