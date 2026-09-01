# runbook.md — 장애 대응

> 장애 중에 읽는 문서다. 설명은 최소로, 명령은 그대로 복사해 쓸 수 있게.
> PLAN Day 15~16 "장애 대비 3종" · 관련: `docs/PLAN.md` · `docs/prd/17_환경_설정_배포.md`

## 0. 런칭일 장애 시 행동 순서 (3줄)

1. **복구가 먼저, 원인은 나중** — 롤백으로 직전 정상 배포에 되돌린다. 로그를 읽는 건 되돌린 다음이다
2. **범위부터 판단** — 전체가 죽었나, 화면 하나인가. 화면 하나면 롤백하지 말고 그 경로만 고친다 (롤백은 그날 배포한 것 전부를 되돌린다)
3. **침묵하지 않는다** — 런칭 게시글에 한 줄 남긴다. 런칭 당일 무응답이 버그보다 비싸다

## 1. 롤백 (Vercel)

```bash
vercel ls --prod                 # 현재·직전 프로덕션 배포 확인 (맨 위가 현재)
vercel rollback <직전배포URL>     # 그 배포를 즉시 프로덕션으로 되돌림
vercel rollback status           # 진행 상태
```

대시보드 경로: Project → Deployments → 직전 배포 `⋯` → **Instant Rollback**

- ⚠️ **롤백은 코드만 되돌린다.** DB 스키마·데이터·환경변수는 그대로다. 마이그레이션을 돌린 뒤라면 롤백해도 안 낫는다
- ⚠️ 롤백 후 `main`은 여전히 깨진 커밋을 가리킨다. 다음 push가 다시 그 코드를 배포하므로, **원인을 고쳐 push하거나 `git revert`를 먼저** 해야 한다

## 2. DB 백업 (Supabase Free — 자동 백업 없음)

| 항목 | 내용 |
|---|---|
| 대상 | `public.workflows` (**런칭 콘텐츠 5장 포함**), `public.feedback` |
| 방법 | 대시보드 → Table Editor → 테이블 선택 → Export → **Download as CSV** |
| 주기 | 주 1회, 판정일(9/22) 전까지 최소 2회 (PRD-17) |
| 보관 | 로컬 `~/backups/stackd/YYYY-MM-DD/` — **repo 커밋 금지** (핸들·피드백 본문 포함) |

- ⚠️ **`auth.users` 삭제 = 그 사용자의 workflows 전멸** (`supabase/schema.sql:11` `on delete cascade`). 탈퇴 테스트를 프로덕션 계정으로 하면 런칭 카드가 같이 사라진다. **CSV가 유일한 복구 수단**
- `feedback.workflow_id`는 `on delete set null`이라 카드가 지워져도 피드백은 남는다 (`:42`)

## 3. 어디를 보나

| 증상 | 확인처 |
|---|---|
| 500·빈 화면 | Sentry Issues → `vercel inspect --logs <배포URL>` |
| 배포 실패 | Vercel → Deployments → 해당 빌드 로그 |
| 로그인 실패 | Supabase → Logs → Auth |
| 지표 이상 | GA4 실시간 보고서 |

## 4. 이미 겪은 실패 모드 (재발 시 여기부터)

| 증상 | 원인 | 조치 |
|---|---|---|
| 로그인 후 엉뚱한 곳으로 감 | Supabase Redirect URLs가 정확 경로로 등록됨 | `**` glob으로 등록 (PRD-17) |
| 프리뷰에서 OG 검증 불가 | `metadataBase`가 프로덕션 고정 | `lib/site.ts` — 프리뷰는 배포주소 |
| 카드 전환이 느림 | Vercel 함수 리전이 `iad1` | `icn1`로 (2026-08-30 해결) |
| Sentry 스택이 압축돼 보임 | 소스맵 미업로드 = `SENTRY_AUTH_TOKEN` 문제 | 빌드 로그에서 `Uploaded files to Sentry` 확인 |
| admin 화면이 "신고 0건" | 조회 실패를 빈 결과로 위장 | 이미 수정됨 — 에러 분기 확인 |
