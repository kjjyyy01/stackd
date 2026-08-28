// 공용 제한 유틸 (BR-007) — 빌더 입력·서버 액션·OG 렌더 3곳이 같은 함수를 쓴다. 순수 함수만.

// 필드별 길이·개수 한도 (PRD-08 BR)
export const LIMITS = {
  title: { min: 1, max: 30 }, // BR-010
  situation_short: { min: 1, max: 20 }, // BR-011
  situation: { min: 0, max: 1000 }, // BR-012
  steps: { min: 2, max: 8 }, // BR-001
  tool_name: { min: 1, max: 40 }, // BR-002
  step_note: { min: 1, max: 60 }, // BR-013
  step_detail: { min: 1, max: 500 }, // BR-014
  dev_stack: { min: 0, max: 4 }, // BR-015
  role: { min: 0, max: 20 }, // BR-008
  feedback_body: { min: 1, max: 500 }, // BR-021
  hidden_reason: { min: 1, max: 200 }, // BR-018
} as const;

// 카테고리 enum 7종 (BR-004) — dev_stack은 앞 3종만
export const CATEGORIES = ["language", "framework", "tool", "skill", "plugin", "mcp", "agent"] as const;
export const DEV_STACK_CATEGORIES = ["language", "framework", "tool"] as const;
export type Category = (typeof CATEGORIES)[number];
export type DevStackCategory = (typeof DEV_STACK_CATEGORIES)[number];

// 검증 통과 후 정규화된 워크플로우 입력 (서버 액션이 그대로 insert)
export type WorkflowInput = {
  title: string;
  situation_short: string;
  situation: string;
  steps: { tool: { name: string; category: Category }; note: string; detail: string }[];
  dev_stack: { name: string; category: DevStackCategory }[];
  role: string;
  accent: string;
  is_public: boolean;
};

// "자" = 사용자가 보는 글자 수 (grapheme) — 이모지 1개 = 1자 (BR-003)
const segmenter = new Intl.Segmenter();
export function charCount(s: string) {
  return [...segmenter.segment(s)].length;
}

export type LimitError = { ok: false; code: string; field: string };
export type Result<T> = { ok: true; value: T } | LimitError;

const fail = (code: string, field: string): LimitError => ({ ok: false, code, field });

// 문자열 trim 후 min~max 글자 수면 반환, 아니면 null
function str(v: unknown, { min, max }: { min: number; max: number }) {
  if (typeof v !== "string") return null;
  const t = v.trim();
  const n = charCount(t);
  return n >= min && n <= max ? t : null;
}

const isIn = <T extends readonly string[]>(list: T, v: unknown): v is T[number] =>
  typeof v === "string" && (list as readonly string[]).includes(v);

// 워크플로우 입력 검증 — 실패 시 첫 위반의 에러 코드·필드 반환 (PRD-10)
export function validateWorkflow(input: unknown): Result<WorkflowInput> {
  const d = (input ?? {}) as Record<string, unknown>;

  const title = str(d.title, LIMITS.title);
  if (title === null) return fail("ERR-BLDR-003", "title");
  const situation_short = str(d.situation_short, LIMITS.situation_short);
  if (situation_short === null) return fail("ERR-BLDR-004", "situation_short");
  const situation = str(d.situation ?? "", LIMITS.situation);
  if (situation === null) return fail("ERR-BLDR-005", "situation");

  if (!Array.isArray(d.steps) || d.steps.length < LIMITS.steps.min) return fail("ERR-CARD-001", "steps");
  if (d.steps.length > LIMITS.steps.max) return fail("ERR-BLDR-001", "steps");
  const steps: WorkflowInput["steps"] = [];
  for (const [i, raw] of d.steps.entries()) {
    const s = (raw ?? {}) as Record<string, unknown>;
    const tool = (s.tool ?? {}) as Record<string, unknown>;
    const name = str(tool.name, LIMITS.tool_name);
    if (name === null) return fail("ERR-BLDR-002", `steps.${i}.tool.name`);
    if (!isIn(CATEGORIES, tool.category)) return fail("ERR-CARD-001", `steps.${i}.tool.category`);
    const note = str(s.note, LIMITS.step_note);
    if (note === null) return fail("ERR-BLDR-005", `steps.${i}.note`);
    const detail = str(s.detail, LIMITS.step_detail);
    if (detail === null) return fail("ERR-BLDR-005", `steps.${i}.detail`);
    steps.push({ tool: { name, category: tool.category }, note, detail });
  }

  const rawStack = d.dev_stack ?? [];
  if (!Array.isArray(rawStack) || rawStack.length > LIMITS.dev_stack.max) return fail("ERR-BLDR-006", "dev_stack");
  const dev_stack: WorkflowInput["dev_stack"] = [];
  for (const [i, raw] of rawStack.entries()) {
    const t = (raw ?? {}) as Record<string, unknown>;
    const name = str(t.name, LIMITS.tool_name);
    if (name === null) return fail("ERR-BLDR-002", `dev_stack.${i}.name`);
    if (!isIn(DEV_STACK_CATEGORIES, t.category)) return fail("ERR-CARD-001", `dev_stack.${i}.category`);
    dev_stack.push({ name, category: t.category });
  }

  const roleResult = validateRole(d.role);
  if (!roleResult.ok) return roleResult;
  const role = roleResult.value;

  return {
    ok: true,
    value: {
      title, situation_short, situation, steps, dev_stack, role,
      accent: typeof d.accent === "string" && d.accent ? d.accent : "ink", // 미인식 슬러그는 서버가 팔레트로 재확인
      is_public: d.is_public !== false, // 기본 true (BR-017)
    },
  };
}

// 소속·역할 검증 (BR-008) — 빌더와 설정의 기본값 폼이 같은 규칙을 쓴다
// 길이만 본다 — 문자셋 제한 없음(BR-003), 빈 값은 "미설정"으로 통과
export function validateRole(role: unknown): Result<string> {
  const t = str(role ?? "", LIMITS.role);
  return t === null ? fail("ERR-CARD-003", "role") : { ok: true, value: t };
}

// 탈퇴 확인 입력 대조 (SCR-008 §7) — GitHub 핸들은 대소문자를 구분하지 않는다
export function matchesHandle(input: unknown, handle: string | null | undefined) {
  if (typeof input !== "string" || !handle) return false;
  return input.trim().toLowerCase() === handle.trim().toLowerCase();
}

// 신고·문의 본문 검증 (BR-021) — 통과 시 trim된 본문
export function validateFeedbackBody(body: unknown): Result<string> {
  const t = str(body, LIMITS.feedback_body);
  return t === null ? fail("ERR-FB-001", "body") : { ok: true, value: t };
}

// 숨김 사유 검증 (BR-018) — hidden=true일 때 필수, 상세 페이지에 모두에게 표시된다
export function validateHiddenReason(reason: unknown): Result<string> {
  const t = str(reason, LIMITS.hidden_reason);
  return t === null ? fail("ERR-ADMIN-002", "reason") : { ok: true, value: t };
}
