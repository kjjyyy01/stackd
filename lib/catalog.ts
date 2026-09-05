// 카탈로그 조회 (BR-026) — 등재 = 공개된 도구. 이름 중복 0건이라 name이 키다
// 상대경로 + 타입 속성 필수 — node --test는 @/ 별칭을 못 풀고, 속성 없으면 JSON import가 실패한다
import catalog from "../data/catalog.json" with { type: "json" };

const NAMES = new Set((catalog as { name: string }[]).map((i) => i.name));

export function isCatalogTool(name: string) {
  return NAMES.has(name.trim());
}
