# 커스텀 도구 토글 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 워크플로우 단계의 도구가 카탈로그에 없는 것일 때 사용자가 "공개된 도구가 아님"을 표시할 수 있게 하고, 그 표시를 카드·상세·OG 세 표면에 노출한다.

**Architecture:** `steps[].tool`에 선택적 `custom?: boolean` 필드를 더한다. 선택적이라 DB 마이그레이션도 초안 버전 상승도 없다. 토글의 노출 조건은 저장하지 않고 `data/catalog.json` 조회로 매번 판정한다 — 로컬 상태로 두면 새로고침 후 사라지기 때문이다. 표시는 세 표면이 각자 렌더하되 문구는 `custom` 하나로 통일한다.

**Tech Stack:** Next.js 16 App Router · TypeScript · Tailwind v4 · `node --test` (도메인 로직 전용) · satori(OG 이미지)

**Spec:** `docs/superpowers/specs/2026-09-04-custom-tool-toggle-design.md`

## Global Constraints

- **라이트 단일 테마** — `dark:` 접두사 사용 금지. `globals.css`의 `@custom-variant dark`가 무력화한다
- **브레이크포인트는 Tailwind 내장(sm/md/lg/xl)만** — 커스텀 정의 금지
- **카드 라벨은 영어** (`01_제품개요.md:21`) — 배지 문구는 `custom` 고정. 한국어는 상세 페이지 설명문에만
- **mono는 영문 기계 식별자·카드 라벨에만** — 카드의 기존 `WORKFLOW`·`STACK`이 mono이므로 배지도 mono
- **한글 조판**: `word-break: keep-all`, 본문 행간 1.75, 자간 0
- **주석은 30자 내외**로 간결하게, 무엇을 하는 코드인지 이해되게
- **커밋은 Conventional Commits** (`feat:`/`fix:`/`docs:`), 한국어
- **검증 명령**: `npm test` / `npm run lint` / `npx tsc --noEmit` / `npm run build`
- **테스트에서 `custom`을 넣을 땐 객체 리터럴 대입 금지** — `valid()`의 `tool`이 `{name, category}`로 추론돼 `TS2353`이 난다. `(v.steps[i].tool as Record<string, unknown>).custom = …` 캐스트를 쓴다(`limits.test.ts:53`의 기존 관행)
- **시각 확인 필수**: 구현 후 chrome-devtools 스크린샷(모바일·데스크톱) + 본인 눈, 둘 다 통과해야 완료
- **브랜치**: `feat/custom-tool-toggle` (이미 생성됨, `main`에서 분기)

---

### Task 1: 데이터 모델 + 검증 (BR-026)

**Files:**
- Modify: `lib/limits.ts:19-22` (카테고리 상수), `lib/limits.ts:25-34` (타입), `lib/limits.ts:72-83` (검증 루프)
- Test: `lib/limits.test.ts`

**Interfaces:**
- Produces:
  - `CUSTOMIZABLE_CATEGORIES: readonly ["skill", "plugin", "mcp", "agent"]`
  - `WorkflowInput["steps"][number]["tool"]` = `{ name: string; category: Category; custom?: boolean }`
  - `validateWorkflow`가 `custom` 위반 시 `{ ok: false, code: "ERR-BLDR-008", field: "steps.{i}.tool.custom" }` 반환
  - `custom === false`·`undefined`는 결과 객체에서 키가 **제거된 채** 반환

- [ ] **Step 1: 실패하는 테스트 5개 작성**

`lib/limits.test.ts` 맨 끝에 추가:

```ts
test("custom true + skill 계열이면 통과하고 값이 보존된다 (BR-026)", () => {
  const v = valid();
  v.steps[0].tool.name = "commit-push";
  v.steps[0].tool.category = "skill";
  (v.steps[0].tool as Record<string, unknown>).custom = true;
  const r = validateWorkflow(v);
  assert.equal(r.ok, true);
  assert.deepEqual(r.ok && r.value.steps[0].tool, { name: "commit-push", category: "skill", custom: true });
});

test("custom true + language/framework/tool이면 ERR-BLDR-008 (BR-026)", () => {
  const v = valid();
  (v.steps[1].tool as Record<string, unknown>).custom = true; // steps[1]은 category "tool"
  assert.deepEqual(validateWorkflow(v), { ok: false, code: "ERR-BLDR-008", field: "steps.1.tool.custom" });
});

test("custom false면 통과하되 키가 제거된다 (BR-026)", () => {
  const v = valid();
  (v.steps[0].tool as Record<string, unknown>).custom = false;
  const r = validateWorkflow(v);
  assert.equal(r.ok, true);
  assert.deepEqual(r.ok && r.value.steps[0].tool, { name: "Claude Code", category: "agent" });
});

test("custom 없으면 통과한다 — 기존 카드 하위호환 (BR-026)", () => {
  const r = validateWorkflow(valid());
  assert.equal(r.ok, true);
  assert.equal(r.ok && "custom" in r.value.steps[0].tool, false);
});

test("custom이 boolean이 아니면 ERR-BLDR-008 (BR-026)", () => {
  const v = valid();
  (v.steps[0].tool as Record<string, unknown>).custom = "yes";
  assert.deepEqual(validateWorkflow(v), { ok: false, code: "ERR-BLDR-008", field: "steps.0.tool.custom" });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test`
Expected: 위 5개 중 최소 3개 FAIL (`custom` 키가 결과에서 사라지고, `ERR-BLDR-008`이 안 나옴)

- [ ] **Step 3: 카테고리 상수 추가**

`lib/limits.ts:20` (`DEV_STACK_CATEGORIES` 줄) 바로 아래에 추가:

```ts
// custom 표시가 가능한 카테고리 (BR-026) — 언어·프레임워크엔 "공개 안 됨"이 성립하지 않는다
export const CUSTOMIZABLE_CATEGORIES = ["skill", "plugin", "mcp", "agent"] as const;
```

- [ ] **Step 4: 타입 변경**

`lib/limits.ts:29`를 아래로 교체:

```ts
  steps: { tool: { name: string; category: Category; custom?: boolean }; note: string; detail: string }[];
```

- [ ] **Step 5: 검증 루프 구현**

`lib/limits.ts:82`의 `steps.push(...)` 한 줄을 아래로 교체:

```ts
    // custom = 카탈로그에 없는 도구 표시 (BR-026). false는 기본값이라 저장하지 않는다
    if (tool.custom !== undefined && typeof tool.custom !== "boolean") return fail("ERR-BLDR-008", `steps.${i}.tool.custom`);
    if (tool.custom === true && !isIn(CUSTOMIZABLE_CATEGORIES, tool.category)) return fail("ERR-BLDR-008", `steps.${i}.tool.custom`);
    const t: WorkflowInput["steps"][number]["tool"] = { name, category: tool.category };
    if (tool.custom === true) t.custom = true;
    steps.push({ tool: t, note, detail });
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `npm test`
Expected: PASS — 기존 31개 + 신규 5개 = 36개 전부 통과

- [ ] **Step 7: 타입·린트 확인**

Run: `npx tsc --noEmit && npm run lint`
Expected: 둘 다 오류 0

- [ ] **Step 8: 커밋**

```bash
git add lib/limits.ts lib/limits.test.ts
git commit -m "feat: steps[].tool.custom 선택 필드 + 검증 (BR-026)

카탈로그에 없는 도구를 표시하는 custom 플래그를 추가한다. 선택적 필드라
기존 카드의 steps jsonb와 사용자 초안이 그대로 유효하다 — DB 마이그레이션 0건.

custom=true는 skill·plugin·mcp·agent에만 허용한다(언어·프레임워크엔 '공개 안 됨'이
성립하지 않는다). false는 기본값이라 결과에서 키를 제거해 기존 카드와 모양을 맞춘다."
```

---

### Task 2: 카탈로그 조회 유틸 + 빌더 체크박스 (EL-HOME-025)

**Files:**
- Create: `lib/catalog.ts`
- Create: `lib/catalog.test.ts`
- Modify: `components/workflow-builder.tsx` (import 구역, `patchStep` 아래, 단계 편집 블록 `:176-207` 내부)

**Interfaces:**
- Consumes: Task 1의 `CUSTOMIZABLE_CATEGORIES`, `WorkflowInput["steps"][number]["tool"]`
- Produces: `isCatalogTool(name: string): boolean` — `data/catalog.json`에 같은 `name`이 있으면 `true`

- [ ] **Step 1: 실패하는 테스트 작성**

`lib/catalog.test.ts` 신규 생성:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { isCatalogTool } from "./catalog.ts";

test("카탈로그에 있는 도구는 true (BR-026)", () => {
  assert.equal(isCatalogTool("superpowers"), true);
});

test("카탈로그에 없는 도구는 false — 개인 제작 스킬 (BR-026)", () => {
  assert.equal(isCatalogTool("commit-push"), false);
});

test("빈 문자열·공백은 false", () => {
  assert.equal(isCatalogTool(""), false);
  assert.equal(isCatalogTool("   "), false);
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test`
Expected: FAIL — `Cannot find module './catalog.ts'`

- [ ] **Step 3: 유틸 구현**

`lib/catalog.ts` 신규 생성:

```ts
// 카탈로그 조회 (BR-026) — 등재 = 공개된 도구. 이름 중복 0건이라 name이 키다
// 상대경로 + 타입 속성 필수 — node --test는 @/ 별칭을 못 풀고, 속성 없으면 JSON import가 실패한다
import catalog from "../data/catalog.json" with { type: "json" };

const NAMES = new Set((catalog as { name: string }[]).map((i) => i.name));

export function isCatalogTool(name: string) {
  return NAMES.has(name.trim());
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test`
Expected: PASS — 36 + 3 = 39개 전부 통과

**실측 완료(착수 전 프로브)**: 상대경로 + `with { type: "json" }`는 `node --test`·`tsc --noEmit` 둘 다 통과. 속성을 빼면 `ERR_IMPORT_ATTRIBUTE_MISSING`으로 실패한다.

- [ ] **Step 5: 빌더에 체크박스 추가**

`components/workflow-builder.tsx` import 구역에 추가:

```ts
import { isCatalogTool } from "@/lib/catalog";
import { CUSTOMIZABLE_CATEGORIES } from "@/lib/limits";
```

`patchStep` 정의(`:117`) 바로 아래에 추가:

```ts
  // 카탈로그에 없고 skill 계열일 때만 custom 토글을 띄운다 (BR-026·EL-HOME-025)
  const canMarkCustom = (t: Step["tool"]) =>
    !isCatalogTool(t.name) && (CUSTOMIZABLE_CATEGORIES as readonly string[]).includes(t.category);
```

단계 편집 블록(`d.steps.map` 내부, `detail` 입력 아래)에 추가:

```tsx
                  {canMarkCustom(s.tool) && (
                    <label className="mt-2 flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="size-4"
                        checked={s.tool.custom === true}
                        onChange={(e) => patchStep(i, { tool: { ...s.tool, custom: e.target.checked } })}
                      />
                      <span style={{ wordBreak: "keep-all" }}>공개된 도구가 아니에요 — 카드에 표시할게요</span>
                    </label>
                  )}
```

- [ ] **Step 6: 빌드·타입·린트 확인**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 전부 오류 0

- [ ] **Step 7: 시각 확인**

`npm run dev`가 이미 떠 있다면 그 포트를 쓴다(사용자 소유 — 새로 띄우지 않는다). 홈에서 확인할 것:
1. 단계에 카탈로그 도구(`superpowers`)를 추가 → **체크박스 없음**
2. 직접 입력으로 `commit-push`·카테고리 `skill` 추가 → **체크박스 나타남**, 기본 꺼짐
3. 체크 → 새로고침 → **체크 상태가 초안 복원으로 유지됨**
4. 직접 입력으로 `Rust`·카테고리 `language` 추가 → **체크박스 없음**

- [ ] **Step 8: 커밋**

```bash
git add lib/catalog.ts lib/catalog.test.ts components/workflow-builder.tsx
git commit -m "feat: 빌더 custom 체크박스 — 카탈로그 미등재 도구에만 (EL-HOME-025)

노출 조건을 카탈로그 조회로 판정한다. 툴 피커의 method 신호를 로컬 상태로 들고 있으면
초안 복원·?edit= 로드·새로고침에서 사라져 사용자가 켤 수도 끌 수도 없는 값이 남는다.

카탈로그 268개는 이름 중복이 없어 name이 안전한 키다."
```

---

### Task 3: 카드 배지

**Files:**
- Modify: `components/workflow-card.tsx:78-85`

**Interfaces:**
- Consumes: Task 1의 `tool.custom?: boolean`
- Produces: 카드에서 `custom` 배지 렌더. 다른 표면이 의존하는 export 없음

- [ ] **Step 1: 배지 렌더 추가**

`components/workflow-card.tsx:78-80`의 `<div className="min-w-0 flex-1">` + 도구명 `<p>`를 아래로 교체:

```tsx
              <div className="min-w-0 flex-1">
                {/* ponytail: 도구명 mono 고정 — 직접 입력으로 한글명이 오면 sans 분기 필요 */}
                <div className="flex items-center gap-1.5">
                  <p className="min-w-0 truncate font-mono text-sm font-medium leading-none">{s.tool.name}</p>
                  {/* 카탈로그에 없는 도구 — 남이 그대로 못 쓴다는 표시 (BR-026) */}
                  {s.tool.custom && (
                    <span
                      className="shrink-0 rounded-sm px-1 py-0.5 font-mono text-[0.625rem] font-medium leading-none"
                      style={{ background: CHIP, color: MUTED }}
                    >
                      custom
                    </span>
                  )}
                </div>
```

`truncate`가 핵심이다 — 도구명 40자 상한과 배지가 만나면 **도구명 쪽이 말줄임되며 폭을 흡수**해야 카드 560px가 안 깨진다.

- [ ] **Step 2: 빌드·타입·린트 확인**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 전부 오류 0

- [ ] **Step 3: 상한 케이스 시각 확인**

미리보기(`/card`)에서 확인:
1. 도구명 40자(`"x".repeat(40)`) + `custom` 켬 → 도구명이 말줄임되고 **배지가 잘리지 않음**
2. 8단계 전부 `custom` 켬 → 카드 세로가 700px를 안 넘음
3. chrome-devtools로 **모바일(390) · 데스크톱(1440)** 스크린샷, 가로 오버플로 0
4. 본인 눈 확인

- [ ] **Step 4: 커밋**

```bash
git add components/workflow-card.tsx
git commit -m "feat: 카드에 custom 배지 — 도구명 truncate로 폭 흡수 (BR-026)

도구명은 min-w-0 truncate, 배지는 shrink-0으로 둬 40자 도구명과 만나도
도구명 쪽이 말줄임되며 카드 560px 고정폭을 지킨다. 배지 지면은 STACK 태그와
같은 CHIP 색을 재사용한다."
```

---

### Task 4: 상세 페이지 배지 + 한국어 설명 (CPY-WF-017)

**Files:**
- Modify: `app/card-detail/[id]/page.tsx:214-222`

**Interfaces:**
- Consumes: Task 1의 `tool.custom?: boolean`
- Produces: 없음

- [ ] **Step 1: 배지와 설명문 추가**

`app/card-detail/[id]/page.tsx:217`의 도구명 줄을 아래로 교체:

```tsx
                {String(i + 1).padStart(2, "0")} {s.tool.name}
                {s.tool.custom && (
                  <span className="ml-2 rounded-sm bg-muted px-1.5 py-0.5 align-middle font-mono text-xs font-medium text-muted-foreground">
                    custom
                  </span>
                )}
```

`wf.steps.map(...)`을 감싼 `<ol>`/`<ul>` **바로 아래**에 설명문 추가 (`custom`이 하나라도 있을 때만 — 단계마다 반복하면 잡음이다):

```tsx
          {wf.steps.some((s) => s.tool.custom) && (
            <p className="mt-6 text-sm leading-[1.75] text-muted-foreground" style={{ wordBreak: "keep-all" }}>
              custom 표시가 붙은 도구는 공개돼 있지 않아 그대로 가져다 쓸 수 없어요.
            </p>
          )}
```

- [ ] **Step 2: 빌드·타입·린트 확인**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 전부 오류 0

- [ ] **Step 3: 시각 확인**

1. `custom`이 있는 카드 상세 → 배지 + 설명문 1회 노출
2. `custom`이 없는 카드 상세(`/card-detail/934c9228` 저장 전 상태 등) → **설명문 미노출**
3. chrome-devtools 모바일·데스크톱 스크린샷 + 본인 눈

- [ ] **Step 4: 커밋**

```bash
git add "app/card-detail/[id]/page.tsx"
git commit -m "feat: 상세 페이지 custom 배지 + 설명문 (CPY-WF-017)

설명문은 custom이 하나라도 있을 때 목록 아래 1회만 띄운다 — 단계마다 반복하면
같은 문장이 최대 8번 나와 잡음이 된다. 카드는 요약, 상세는 설명이라는 구조를 따른다."
```

---

### Task 5: OG 배지 + 폰트 서브셋

**Files:**
- Modify: `app/api/og/route.tsx:8` (타입), `:55` (monoText), `:151` (도구명 렌더)

**Interfaces:**
- Consumes: Task 1의 `tool.custom?: boolean`
- Produces: 없음

⚠️ **이 태스크의 핵심 위험**: `monoText`가 폰트 서브셋을 문자 단위로 만든다(`:55-60`). 배지 문자를 여기 더하지 않으면 **빌드도 통과하고 다른 화면도 멀쩡한데 OG에서만 글리프가 빈다.** Day 17에 같은 유형을 겪었다.

- [ ] **Step 1: 타입 확장**

`app/api/og/route.tsx:8`을 교체:

```ts
type Step = { tool: { name: string; custom?: boolean }; note: string };
```

- [ ] **Step 2: 폰트 서브셋에 배지 문자 추가**

`app/api/og/route.tsx:55`를 교체:

```ts
    // "custom" 7글자는 배지용 — 서브셋에 없으면 OG에서만 글리프가 빈다
    const monoText = `${shown.map((s) => s.tool.name).join("")}${stack}${meta}stackd.krcustom0123456789`;
```

- [ ] **Step 3: 배지 렌더 추가**

`app/api/og/route.tsx:151`의 도구명 `<div>`를 아래로 교체:

```tsx
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 28, fontFamily: "Mono" }}>{s.tool.name}</div>
                {s.tool.custom && (
                  <div style={{ fontSize: 18, fontFamily: "Mono", color: MUTED, display: "flex" }}>custom</div>
                )}
              </div>
```

satori는 기본 `display: flex`가 아닌 다중 자식 요소를 거부하므로 `display: "flex"`를 명시해야 한다.

- [ ] **Step 4: 빌드 확인**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 전부 오류 0

- [ ] **Step 5: OG 실물 PNG 확인**

Task 2 Step 7에서 `commit-push`(`skill`, custom 켬)를 넣은 카드를 저장했을 것이다. 그 카드 id를 쓴다. 없으면 지금 하나 저장한다.

```bash
CARD=<Task 2에서 저장한 카드 id>
curl -s -o /tmp/og-custom.png -w "status=%{http_code} type=%{content_type} size=%{size_download}\n" \
  "http://localhost:3000/api/og?id=$CARD"
open /tmp/og-custom.png
```

Expected: `status=200 type=image/png`, 크기 0 아님.
**PNG를 열어 `custom` 글자가 실제로 보이는지 눈으로 확인한다** — 서브셋 누락은 200 응답에서도 발생하므로 상태 코드로는 못 잡는다.

`custom` 도구는 **앞 3단계 안에** 있어야 보인다(`slice(0, 3)`). 4번째 이후에 뒀다면 검증이 안 되니 1~3단계 중 하나에 배치한다.

- [ ] **Step 6: 커밋**

```bash
git add app/api/og/route.tsx
git commit -m "feat: OG 이미지에 custom 배지 + 폰트 서브셋 갱신 (BR-026)

monoText에 'custom' 7글자를 더한다. satori는 이 문자열로 폰트 서브셋을 만들기 때문에
빠뜨리면 빌드는 통과하고 OG에서만 글리프가 빈다 — Day 17에 겪은 유형이다.

OG는 앞 3단계만 그리므로(slice(0,3)) 4단계 이후의 custom은 이미지에 안 나타난다.
기존 동작이며 바꾸지 않는다."
```

---

### Task 6: 문서 동기화

**Files:**
- Modify: `docs/prd/05_데이터모델.md`, `08_도메인규칙.md`, `10_에러코드_카탈로그.md`, `11_UX카피사전.md`, `SCR-001_홈.md`, `SCR-004_공유카드.md`
- Modify: `docs/history.md`, `TODO.md`

**Interfaces:**
- Consumes: Task 1~5에서 실제로 구현된 동작
- Produces: 없음

- [ ] **Step 1: BR-026 신설**

`docs/prd/08_도메인규칙.md`의 BR 표 끝에 추가:

```markdown
| BR-026 | **custom 도구 표시**: `steps[].tool.custom`(선택적 boolean). `true`는 `skill·plugin·mcp·agent`에만 허용, 위반 시 `ERR-BLDR-008`. `false`는 저장하지 않고 키를 제거(기본값). 의미는 저작이 아니라 **가용성** — "공개돼 있지 않아 남이 그대로 못 씀". ⚠️ **"카탈로그 등재 도구는 custom 불가"는 서버가 강제하지 못한다** — 카탈로그가 클라이언트 정적 JSON(`data/catalog.json`)이라 서버 검증 경로에 없다. UI 계약이며, API 직접 호출 시 모순 데이터가 들어갈 수 있다(피해는 잘못된 배지 1개, 데이터 손상 아님) | SCR-001·003·004 | ERR-BLDR-008 |
```

- [ ] **Step 2: ERR-BLDR-008 신설**

`docs/prd/10_에러코드_카탈로그.md`의 BLDR 표 끝에 추가:

```markdown
| ERR-BLDR-008 | `custom`이 boolean이 아니거나, `true`인데 카테고리가 `skill·plugin·mcp·agent`가 아님 | `steps.{i}.tool.custom` | BR-026 |
```

- [ ] **Step 3: 데이터 모델 갱신**

`docs/prd/05_데이터모델.md`의 `steps` 항목에 추가:

```markdown
- `steps[].tool.custom` — 선택적 `boolean`. 카탈로그 미등재 도구 표시(BR-026). **DB 스키마 변경 없음** — `steps`는 `jsonb`이고 CHECK는 배열 길이만 본다(`schema.sql:15-17`). 키가 없으면 `false`로 읽는다
```

- [ ] **Step 4: UX 카피 2건 신설**

`docs/prd/11_UX카피사전.md`에 추가:

```markdown
| CPY-HOME-060 | 공개된 도구가 아니에요 — 카드에 표시할게요 | SCR-001 단계 편집 custom 체크박스 라벨 (EL-HOME-025) |
| CPY-WF-017 | custom 표시가 붙은 도구는 공개돼 있지 않아 그대로 가져다 쓸 수 없어요. | SCR-004 단계 목록 아래 설명문 — `custom`이 1개 이상일 때만 1회 |
```

- [ ] **Step 5: SCR-001 요소·AC 추가**

`docs/prd/SCR-001_홈.md`의 EL 표에 추가:

```markdown
| EL-HOME-025 | custom 체크박스 | `<input type="checkbox">` + CPY-HOME-060 | N | **카탈로그 미등재 AND 카테고리 ∈ {skill, plugin, mcp, agent}** 일 때만 노출. 기본 꺼짐 (BR-026) |
```

AC 절에 추가:

```markdown
- **AC-custom**: Given 직접 입력으로 `skill` 도구를 추가, When 단계 편집을 보면, Then EL-HOME-025가 꺼진 채 노출 / Given 카탈로그에서 도구를 선택, When 단계 편집을 보면, Then EL-HOME-025 **미노출** / Given 체크 후 새로고침, When 초안이 복원되면, Then 체크 상태 유지(BR-019와 함께 동작)
```

- [ ] **Step 6: SCR-004 표시 규칙 추가**

`docs/prd/SCR-004_공유카드.md`에 추가:

```markdown
- 단계의 `tool.custom`이 `true`면 도구명 옆 `custom` 배지(영문 고정 — 카드 라벨 언어 규칙). 상세에서는 배지 + 목록 아래 CPY-WF-017 설명문 1회. OG는 앞 3단계만 그리므로 4단계 이후의 배지는 이미지에 나타나지 않는다(기존 동작)
```

- [ ] **Step 7: 작업 기록**

`docs/history.md` 끝에 추가하고, 대괄호 부분만 실제 수치로 채운다:

```markdown
## 2026-09-04 — 커스텀 도구 토글 (BR-026): 카탈로그 미등재 도구 표시

**무엇을**: `steps[].tool.custom` 선택 필드 신설 + 빌더 체크박스 + 카드·상세·OG 3표면 배지

**어떻게**: `custom`을 선택적 필드로 둬 DB 마이그레이션과 초안 `VERSION` 상승을 둘 다 피했다. 토글 노출 조건은 저장하지 않고 `lib/catalog.ts`의 카탈로그 조회로 매번 판정한다 — 툴 피커의 `method` 신호를 로컬 상태로 들면 초안 복원·새로고침에서 사라진다. 카드는 도구명 `truncate` + 배지 `shrink-0`으로 560px 고정폭을 지켰다.

**왜**: 의미를 저작이 아니라 **가용성**으로 잡았다 — 기획서가 "자랑·명함이 아니라 공유·권유"로 방향을 못 박았고, "남이 그대로 써볼 수 있나"가 제품 목적에 직접 답한다. 0번 카드(`934c9228`) 6단계 메모가 이 공백을 산문으로 메우고 있던 게 착수 근거다.

**결과**:
- 테스트 [실제 개수]개 통과 · lint 0 · tsc 0 · build 통과
- 서버가 "카탈로그 등재 도구는 custom 불가"를 강제하지 못하는 한계를 BR-026에 명시 — 안 적으면 나중에 모순 데이터를 버그로 오진한다
- 기존 카드 [실제 개수]장(`custom` 없음) 정상 렌더 확인 — 하위호환 실증
- ⚠️ 런칭 D-4 작업. 머지 판정은 계획서 §머지 판정 기준을 따랐다 — [머지함 / 브랜치에 남김]
```

`TODO.md`에는 완료 항목 한 줄을 추가한다.

- [ ] **Step 8: 전체 검증**

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build`
Expected: 테스트 39개 통과, 나머지 오류 0

- [ ] **Step 9: 커밋**

```bash
git add docs/ TODO.md
git commit -m "docs: custom 도구 토글 문서 동기화 — BR-026·ERR-BLDR-008·EL-HOME-025

BR-026에 서버 강제 불가 한계를 명시한다. 안 적으면 나중에 모순 데이터를 보고
버그로 오진한다 — 알려진 한계와 버그는 대응이 다르다."
```

---

## 머지 판정 (Day 18 착수 전)

런칭 D-4이고 버퍼 잔량 2일이 마지막 지렛대다. **Task 1~6이 전부 끝나고 시각 확인까지 통과했을 때만 `main`에 머지한다.** 하나라도 미완이면 브랜치에 남기고 런칭 후로 넘긴다 — 설계 문서 §위험에 못 박은 탈출 조건이다.

머지 전 최종 확인:
- [ ] `npm test` 39개 · `lint` 0 · `tsc` 0 · `build` 통과
- [ ] 프리뷰 배포에서 카드·상세·OG 3표면 실측
- [ ] `/api/og?id=<custom 카드>` PNG를 **열어서** `custom` 글자 확인
- [ ] 기존 카드 6장(`custom` 없음)이 전부 정상 렌더 — 하위호환 실증
- [ ] 모바일·데스크톱 스크린샷 + 본인 눈
