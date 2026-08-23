// 빌더 초안 — localStorage `stackd:draft` (BR-019, PRD-05 §클라이언트 초안). 순수 함수만, 서버 저장소 아님
import type { WorkflowInput } from "./limits";

export const DRAFT_KEY = "stackd:draft";
const VERSION = 2;

// 초안 = 검증 전 입력값 + 버전 + (수정 모드) editId. WorkflowInput과 필드가 같아 검증 유틸을 그대로 통과시킨다
export type Draft = WorkflowInput & { v: typeof VERSION; editId?: string };

export const EMPTY_DRAFT: Draft = {
  v: VERSION,
  title: "",
  situation_short: "",
  situation: "",
  steps: [],
  dev_stack: [],
  role: "",
  accent: "ink",
  is_public: true,
};

// 필수 키가 전부 있고 v가 맞을 때만 초안으로 인정 — 나머지는 손상 취급
const REQUIRED: (keyof Draft)[] = ["title", "situation_short", "situation", "steps", "dev_stack", "role", "accent", "is_public"];
function isDraft(x: unknown): x is Draft {
  if (!x || typeof x !== "object") return false;
  const d = x as Record<string, unknown>;
  return d.v === VERSION && REQUIRED.every((k) => k in d) && Array.isArray(d.steps) && Array.isArray(d.dev_stack);
}

// 손상·버전 불일치는 조용히 폐기(안내 없음) — 저장소에서도 지운다
export function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (isDraft(parsed)) return parsed;
  } catch {
    /* JSON 손상 또는 localStorage 접근 불가 */
  }
  clearDraft();
  return null;
}

export function saveDraft(d: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    /* 프라이빗 모드·용량 초과 — 초안은 편의 기능이라 삼킨다 */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* 무시 */
  }
}

// 복원 배너를 띄울 가치가 있나 — 입력이 하나도 없으면 false
export function isDraftEmpty(d: Draft) {
  return !d.title && !d.situation_short && !d.situation && d.steps.length === 0 && d.dev_stack.length === 0 && !d.role;
}
