import { ImageResponse } from "next/og";
import { DEFAULT_OG_FONTS, DefaultOg, INK, MUTED, OG_SIZE, SURFACE } from "@/lib/og";
import { createClient } from "@/lib/supabase/server";

// GET /api/og?id={id}&v={updated_at epoch} — 공개 카드의 동적 OG (PRD-06 · REQ-WF-007)
// v는 캐시 버스팅 전용이라 읽지 않는다. 실패·미존재·비공개·hidden은 전부 기본 이미지 200 (ERR-OG-001)

type Step = { tool: { name: string }; note: string };
type Row = {
  title: string;
  situation_short: string;
  steps: Step[];
  dev_stack: { name: string }[];
  author_handle: string;
  role: string | null;
};

type Font = { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" };
type Payload = { wf: Row; shown: Step[]; rest: number; stack: string; meta: string; fonts: Font[] };

// 구형 UA로 요청해야 Google이 woff2가 아닌 포맷을 준다 — Satori는 ttf·otf·woff만 읽는다
const LEGACY_UA = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 Chrome/40.0 Safari/537.36";

// 그 카드에 실제로 쓰인 글자만 받아온다 (OQ-003 판정) — 완성형 전체는 500KB 번들 상한을 넘는다
async function subsetFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, { headers: { "User-Agent": LEGACY_UA } }).then((r) => r.text());
  const src = /src:\s*url\((https:\/\/[^)]+)\)/.exec(css)?.[1];
  if (!src) throw new Error("google fonts css 파싱 실패");
  return fetch(src).then((r) => r.arrayBuffer());
}

// 조회·폰트만 담당 — JSX는 여기서 만들지 않는다.
// 렌더 오류는 스트리밍이라 try/catch가 못 잡는다 (react-hooks/error-boundaries가 경고하는 함정)
async function load(id: string): Promise<Payload | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("workflows")
      .select("title, situation_short, steps, dev_stack, author_handle, role")
      .eq("id", id)
      .eq("is_public", true)
      .eq("hidden", false)
      .maybeSingle();
    if (!data) return null;

    const wf = data as Row;
    const shown = wf.steps.slice(0, 3); // 도구명이 길면 4개가 1072px을 넘어 찌그러진다
    const rest = wf.steps.length - shown.length;
    const stack = wf.dev_stack.map((s) => s.name).join("  ·  ");
    const meta = [`@${wf.author_handle}`, wf.role].filter(Boolean).join("  ·  ");

    // 서브셋 요청에 넘길 글자 — 한글은 Sans, 기계 식별자는 Mono가 그린다
    const koText = `${wf.title}${wf.situation_short}${wf.role ?? ""}외 ${rest}단계`;
    const monoText = `${shown.map((s) => s.tool.name).join("")}${stack}${meta}stackd.kr0123456789`;

    const [sans600, sans400, mono] = await Promise.all([
      subsetFont("IBM+Plex+Sans+KR", 600, koText),
      subsetFont("IBM+Plex+Sans+KR", 400, koText),
      subsetFont("IBM+Plex+Mono", 400, monoText),
    ]);

    return {
      wf,
      shown,
      rest,
      stack,
      meta,
      fonts: [
        { name: "Sans", data: sans600, weight: 600, style: "normal" },
        { name: "Sans", data: sans400, weight: 400, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    };
  } catch {
    return null; // ERR-OG-001 — 폰트 fetch 실패 포함
  }
}

const fallback = () =>
  new ImageResponse(<DefaultOg />, {
    ...OG_SIZE,
    fonts: DEFAULT_OG_FONTS, // 번들 내장 서브셋 — 폰트 fetch가 죽어서 온 폴백이라 네트워크를 또 타면 안 된다
    headers: { "cache-control": "public, max-age=3600" }, // 폴백은 짧게 — 복구되면 곧 정상 이미지로
  });

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!/^[0-9a-f]{8}$/.test(id)) return fallback(); // BR-023

  const p = await load(id);
  if (!p) return fallback();

  // Satori 제약: 자식이 2개 이상인 요소는 display:flex 필수, 텍스트는 항상 자식 1개로 넘긴다
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: SURFACE,
          color: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "Sans",
        }}
      >
        {/* 상단 — 상황 라벨 · 작성자 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, color: MUTED }}>{p.wf.situation_short}</div>
          <div style={{ fontSize: 26, color: MUTED, fontFamily: "Mono" }}>{p.meta}</div>
        </div>

        {/* 제목 — 카드와 같은 상한 30자 (BR-010) */}
        <div
          style={{
            fontSize: 62,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.3,
            marginTop: 24,
          }}
        >
          {p.wf.title}
        </div>

        {/* 단계 — 카드의 시그니처(번호 노드 + mono 도구명)를 가로로 재배치 (OQ-012 판정) */}
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28, marginTop: 24 }}
        >
          {p.shown.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: INK,
                  color: SURFACE,
                  fontSize: 20,
                  fontFamily: "Mono",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 28, fontFamily: "Mono" }}>{s.tool.name}</div>
            </div>
          ))}
          {p.rest > 0 && (
            <div style={{ fontSize: 26, color: MUTED, flexShrink: 0 }}>{`외 ${p.rest}단계`}</div>
          )}
        </div>

        {/* 하단 — STACK · 워터마크 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${INK}`,
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 26, color: MUTED, fontFamily: "Mono" }}>{p.stack}</div>
          <div style={{ fontSize: 26, fontFamily: "Mono" }}>stackd.kr</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: p.fonts,
      // v= 버스팅이 있으므로 길게 — 내용이 바뀌면 updated_at이 바뀌고 URL도 바뀐다 (PRD-05)
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
  );
}
