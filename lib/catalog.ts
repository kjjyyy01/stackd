// 카탈로그 조회 (BR-026) — 등재 = 공개된 도구. 이름 중복 0건이라 name이 키다
// 상대경로 + 타입 속성 필수 — node --test는 @/ 별칭을 못 풀고, 속성 없으면 JSON import가 실패한다
import catalog from "../data/catalog.json" with { type: "json" };

const NAMES = new Set((catalog as { name: string }[]).map((i) => i.name));
// 이름 → 출처 URL (BR-027) — 상세 페이지 도구 링크의 1순위
const SOURCES = new Map((catalog as { name: string; source: string }[]).map((i) => [i.name, i.source]));

export function isCatalogTool(name: string) {
  return NAMES.has(name.trim());
}

export function catalogSource(name: string) {
  return SOURCES.get(name.trim());
}
