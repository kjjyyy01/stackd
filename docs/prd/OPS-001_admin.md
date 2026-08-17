---
doc_id: PRD-OPS-001
title: 운영 — 신고·문의 처리 (admin)
page_code: ADMIN
version: 1.0.0
status: Approved
owner: Jongyeon
last_updated: 2026-08-17
depends_on: [PRD-04, PRD-05, PRD-06, PRD-08, PRD-09, PRD-10, PRD-11, PRD-13, PRD-14, PRD-17]
implements: [F-014, F-011]
---

## 1. 개요
- **목적**: 신고·문의·피드백(`feedback`)을 보고 처리하는 **운영 화면** — 사용자 노출 없음, 헤더 링크 없음, noindex(PRD-04). 라우트 `/admin`. SCR 밖(OPS-001)
- **게이트**: BR-022 — 세션 uid ∈ env `ADMIN_USER_IDS`(PRD-17), 아니면 **404**(ERR-ADMIN-001). 페이지·서버 액션 **모두**(PRD-09)
- **역할**: Slack 웹훅(F-011)은 알림 채널일 뿐, **이 화면이 최종 처리 경로**(PRD-13). Supabase 대시보드 미사용(사용자 결정)
- **컷 불가** (2026-08-17 최종 점검): 대시보드 미사용 결정상 이 화면이 `hidden`·`resolved` 처리의 **유일 경로** — 컷 대상에서 제외(Day 11 컷 순서: 라이브러리 → 수정 기능 → 소속·역할). F-011 저장·웹훅과 한 묶음

## 2. 레이아웃 & 구성 요소
| EL-ID | 요소 | 컴포넌트 | 필수 | 조건/참조 |
|---|---|---|---|---|
| EL-ADMIN-001 | h1 | 서버 렌더 헤딩 | Y | CPY-ADMIN-001 |
| EL-ADMIN-002 | 필터 | 미처리(기본) ↔ 전체 — 링크형 토글, searchParams `?all=1` | Y | `resolved` 기준. 라벨 CPY 미정의(최종 응답) |
| EL-ADMIN-003 | feedback 목록 | 최신순 행: `created_at`·`type`·`body`·`reporter_id` 유무·`resolved` + 대상 워크플로우 요약(`title`·`author_handle`·`is_public`·`hidden` 배지, 펼치면 `situation`·`steps` 전문 텍스트, `/card-detail/{id}` 링크) | Y | service role 조회 — 비공개·hidden도 여기서 열람(PRD-09). 상한 100건, 페이지네이션 없음(v1) |
| EL-ADMIN-004 | 행 액션 | 버튼 2개: hidden 토글(현재 `hidden`에 따라 라벨 1개, `workflow_id` 있을 때만) · resolve(`resolved=false`일 때) | Y | CPY-ADMIN-002 (3라벨) |
| EL-ADMIN-006 | 숨김 사유 입력 | 텍스트 입력 (1~200자) — 숨기기 클릭 시 인라인 노출 | 조건 | CPY-ADMIN-005, BR-018 필수 → 미입력 시 ERR-ADMIN-002 |
| EL-ADMIN-005 | 빈 상태 | 텍스트 | Y | 미처리 0건. CPY 미정의(최종 응답) |
| EL-ADMIN-006 | 토스트 | sonner | Y | 액션 DB 실패 — ERR 미정의(최종 응답) |

## 3. 기능 요구사항
### REQ-ADMIN-001: 접근 게이트 (P0)
- **AC-1 (정상)**: Given 세션 uid ∈ `ADMIN_USER_IDS`, When `/admin` 진입, Then 목록 렌더
- **AC-2 (검증 실패)**: Given 미로그인 또는 비허용 uid, Then `notFound()` → 404(ERR-ADMIN-001, CPY-COMMON-004). 존재 비노출 — 로그인 유도 없음(ERR-AUTH-001 아님)
- **AC-3 (서버 오류)**: Given env 미설정·비어 있음 또는 세션 조회 실패, Then 전원 404(fail-closed)
- **AC-4 (오프라인)**: 해당 없음 — 서버 렌더

### REQ-ADMIN-002: 목록 조회 (P0)
- **AC-1 (정상)**: Given 게이트 통과, Then `feedback` `created_at desc` + 대상 `workflows` service role 조인, 기본 `resolved=false`만 — EL-ADMIN-003. 0건이면 EL-ADMIN-005
- **AC-2 (검증 실패)**: 해당 없음 — 입력 없음(`?all` 외 값은 기본으로 취급)
- **AC-3 (서버 오류)**: Given service role 조회 실패, Then Next error boundary(운영자만 보는 화면 — 전용 문구 없음)
- **AC-4 (오프라인)**: 해당 없음 — 서버 렌더

### REQ-ADMIN-003: hidden 토글 (P0)
- **AC-1 (정상)**: Given 행에 `workflow_id`, When 사유(EL-ADMIN-006, 1~200자) 입력 후 hidden 토글(→true), Then `adminSetHidden(id, true, reason)` → 게이트 재확인(BR-022) → service role update `hidden=true`·`hidden_reason` + `updated_at` 갱신(OG `v` 버스팅, PRD-05) → 상세는 타인에게 블러 플레이스홀더 + 사유(BR-018)·`/api/og` 기본 이미지(ERR-OG-001)·라이브러리·사이트맵 제외 → 목록 배지 갱신. →false는 역(`is_public` 불변)
- **AC-2 (검증 실패)**: Given `workflow_id` null(문의) 또는 대상 삭제됨(FK set null) 또는 id 형식 위반(BR-023), Then 버튼 미노출 / 서버 거부. Given 사유 빈 값·201자+, Then ERR-ADMIN-002 인라인, 토글 미실행
- **AC-3 (서버 오류)**: Given update 실패, Then 토스트 + 상태 유지(ERR 미정의 — 최종 응답)
- **AC-4 (오프라인)**: 서버 액션 실패 → AC-3와 동일

### REQ-ADMIN-004: resolve 처리 (P0)
- **AC-1 (정상)**: When resolve 버튼, Then `adminResolve(feedbackId)` → 게이트 재확인 → `resolved=true` → 기본 필터에서 사라짐. 되돌리기 없음(v1 — `?all=1`에서 확인만)
- **AC-2 (검증 실패)**: Given 이미 resolved, Then 버튼 미노출. 중복 호출은 멱등
- **AC-3/4**: REQ-ADMIN-003과 동일

### REQ-ADMIN-005: 필터 (P1)
- **AC-1 (정상)**: 기본 미처리만. `?all=1` → resolved 포함 전체(최신순). 링크형 — JS 불필요
- **AC-2~4**: 해당 없음 — P1

## 4. 화면 상태 (Lite 4종)
| 상태 | UI |
|---|---|
| Loading | 해당 없음 — 서버 렌더 |
| Empty | 미처리 0건 → EL-ADMIN-005 |
| Loaded | 목록 + 행 액션 |
| Error | 조회 실패 → error boundary / 액션 실패 → 토스트 |

## 5. 사용자 행동
| 액션 | 트리거 | 결과 |
|---|---|---|
| hidden 토글 | EL-ADMIN-004 | `adminSetHidden` → `revalidatePath('/admin')`(상세·라이브러리는 dynamic 렌더라 즉시 반영) |
| resolve | EL-ADMIN-004 | `adminResolve` → 목록 갱신 |
| 대상 보기 | EL-ADMIN-003 링크 | `/card-detail/{id}` 새 탭 — 공개·!hidden일 때만 열림(admin도 일반 user로 열람, PRD-09). 내용 판단은 EL-ADMIN-003 펼치기로 |
| 필터 전환 | EL-ADMIN-002 | `?all=1` ↔ 기본 |

## 6. 화면 전환
- **진입**: 직접 URL만(헤더 링크 없음). Slack 알림 메시지에 `/admin` 링크 포함 권장(웹훅 페이로드는 F-011 구현 몫)
- **이탈**: 대상 상세(새 탭) · 헤더 로고 → `/`
- **리다이렉트**: 없음 — 비허용은 404
- **뒤로가기**: 브라우저 기본

## 7. 폼 검증
| 필드 | 규칙 | 클라 | 서버 | 에러 |
|---|---|---|---|---|
| workflow id | `^[0-9a-f]{8}$`(BR-023) | — (버튼 페이로드) | Y — 형식 외 거부 | ERR 미정의(최종 응답, DB 실패와 동일 코드 제안) |
| feedbackId | 양의 정수 | — | Y | 동일 |
| hidden | boolean | — | Y | 동일 |

## 8. 데이터 변화
- **8.2 수정**: `workflows.hidden`(+`updated_at`) — service role, RLS 우회(소유자 with check와 무관) / `feedback.resolved`
- **8.4 조회**: `feedback` 전체 + `workflows`(hidden·비공개 포함, service role)
- 생성·삭제: 없음(feedback 삭제 없음 — 기록 보존)

## 9. API 호출
| 호출 | 비고 | 실패 코드 |
|---|---|---|
| OPS-001 읽기 | PRD-06 §읽기 — service role, 게이트 후 | — |
| `adminSetHidden(id, hidden, reason?)` | PRD-06 §쓰기 | ERR-ADMIN-001(게이트) / ERR-ADMIN-002(사유) |
| `adminResolve(feedbackId)` | PRD-06 §쓰기 | ERR-ADMIN-001(게이트) |
- service role 키·`ADMIN_USER_IDS`는 서버 액션 안에서만(PRD-14·17)

## 10. UX 카피
CPY-ADMIN-001·002 · CPY-COMMON-004(404). 필터 라벨·빈 상태·실패 토스트는 미정의(최종 응답)

## 11. 엣지 케이스
| # | 케이스 | 처리 |
|---|---|---|
| 1 | admin 세션 만료 후 액션 | 게이트 재확인 실패 → `{ok:false, ERR-ADMIN-001}` → 클라 `router.refresh()` → 페이지 게이트 404 |
| 2 | 대상 워크플로우가 소유자 삭제·탈퇴로 사라짐 | `workflow_id` null(set null) → hidden 토글 미노출, resolve만 |
| 3 | 같은 카드에 신고 여러 건 | hidden은 워크플로우 상태 1개, feedback은 건별 resolved |
| 4 | hidden 후 소유자 수정 시도 | RLS with check로 hidden 유지(PRD-05), 소유자 화면엔 CPY-WF-009 |
| 5 | OG 캐시 | hidden 전 `v`로 캐시된 이미지 잔존(PRD-08 대응표 #2), 새 URL은 기본 이미지 |
| 6 | 신고 body·대상 텍스트에 악성 문구 | 텍스트 렌더, 링크화 없음(PRD-08 XSS) |
| 7 | env에 본인 uid 오타 | 본인도 404 — fail-closed 의도. Day 5 배포 URL에서 진입 확인 |

## 12. 분석 이벤트
해당 없음 — 운영 화면(운영자 트래픽은 판정 표본과 무관, 커스텀 이벤트 없음)

## 13. 비기능
- noindex(PRD-04), 서버 렌더 dynamic. LCP 예산 대상 아님(운영)
- 보안: 게이트 2중(페이지·액션), 세션 uid만 신뢰(입력 uid 없음), service role·env 서버 전용(PRD-14)
- JS 비활성: PRD-19 예외 명시(`/admin`) — 목록·필터는 서버 렌더라 보이고, 액션은 `<form action>`이면 동작(권장)

## 14. 테스트 케이스
| TC-ID | 시나리오 | 기대 결과 | 자동화 |
|---|---|---|---|
| TC-ADMIN-001-01 | 미로그인·비허용 uid로 `/admin` | 404, 로그인 유도 없음 | Y — 유닛(게이트 함수: uid·env → boolean) + 수동 |
| TC-ADMIN-001-02 | env 비어 있음 | 전원 404 | Y — 유닛 |
| TC-ADMIN-003-01 | hidden=true(+사유) → 타인 상세·`/api/og`·라이브러리 | 블러+사유 · 기본 OG · 미노출 | N — Day 16 실링크 확인(PRD-19) |
| TC-ADMIN-003-02 | hidden=false 복귀 | 원 상태 복귀(`is_public` 유지) | N — 수동 |
| TC-ADMIN-003-03 | 비허용 세션으로 액션 직접 호출 | ERR-ADMIN-001 거부, DB 불변 | Y — 유닛(액션 게이트) |
| TC-ADMIN-004-01 | resolve → 기본 필터 / `?all=1` | 사라짐 / resolved 표시 | N — 수동 |

## 15. 접근성
기본만 — 버튼 44×44, 대비 4.5:1, 테이블 `<th scope>`, 키보드 조작, 배지는 텍스트 병기

## 16. 반응형
Tailwind 내장만 — 모바일 카드형 목록, `md`+ 테이블. 상세는 DESIGN.md
