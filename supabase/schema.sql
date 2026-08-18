-- Stackd v1 스키마 — SSOT: docs/prd/05_데이터모델.md · 09_권한매트릭스.md
-- 실행: Supabase 대시보드 → SQL Editor → 전체 붙여넣기 → Run (1회, 재실행 안전)
-- 길이·개수 검증은 앱 레이어(제한 유틸, BR-007). DB CHECK는 방어용 최소만.

-- ─────────────────────────────────────────────
-- workflows — 카드 본문 (소유자 = auth.users)
-- ─────────────────────────────────────────────
create table if not exists public.workflows (
  id              text primary key
                  check (id ~ '^[0-9a-f]{8}$'),                 -- BR-023 16진 8자
  user_id         uuid not null references auth.users(id) on delete cascade,
  title           text not null,                                 -- 1~30자 (BR-010)
  situation_short text not null,                                 -- 1~20자 (BR-011)
  situation       text,                                          -- 0~1000자 (BR-012)
  steps           jsonb not null
                  check (jsonb_typeof(steps) = 'array'
                     and jsonb_array_length(steps) between 2 and 8), -- BR-001 방어용
  dev_stack       jsonb not null default '[]'::jsonb,            -- 0~4 (BR-015)
  author_handle   text not null,                                 -- GitHub user_name 스냅샷
  author_avatar   text,                                          -- GitHub avatar_url 스냅샷
  role            text,                                          -- 0~20자 (BR-008)
  accent          text not null default 'ink',                   -- 액센트 슬러그
  is_public       boolean not null default true,                 -- BR-017
  hidden          boolean not null default false,                -- admin만 (BR-018)
  hidden_reason   text,                                          -- hidden=true면 필수 1~200자
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()             -- 서버 액션에서 갱신
);

-- 라이브러리 목록 / 내 카드 목록 인덱스
create index if not exists workflows_library_idx
  on public.workflows (is_public, hidden, created_at desc);
create index if not exists workflows_owner_idx
  on public.workflows (user_id, created_at desc);

-- ─────────────────────────────────────────────
-- feedback — 신고·문의 (service role만 접근)
-- ─────────────────────────────────────────────
create table if not exists public.feedback (
  id          bigint generated always as identity primary key,
  type        text not null check (type in ('report', 'contact', 'feedback')),
  workflow_id text references public.workflows(id) on delete set null,
  body        text not null,                                     -- 1~500자 (BR-021)
  reporter_id uuid,                                              -- 세션 있으면 uid, 없으면 null
  resolved    boolean not null default false,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────────
-- RLS — PRD-09 권한 매트릭스와 1:1
-- ─────────────────────────────────────────────
alter table public.workflows enable row level security;

drop policy if exists "public read"  on public.workflows;
drop policy if exists "owner insert" on public.workflows;
drop policy if exists "owner update" on public.workflows;
drop policy if exists "owner delete" on public.workflows;

-- hidden 행도 읽힘 — 상세 페이지가 블러 + 사유를 렌더 (BR-018). 목록·OG는 앱에서 hidden=false 필터
create policy "public read"  on public.workflows
  for select using (is_public or auth.uid() = user_id);

create policy "owner insert" on public.workflows
  for insert with check (auth.uid() = user_id);

-- 소유자는 hidden·hidden_reason을 못 바꿈 (with check로 기존 값 고정) — admin 토글은 service role
create policy "owner update" on public.workflows
  for update
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and hidden = (select w.hidden from public.workflows w where w.id = workflows.id)
    and hidden_reason is not distinct from
        (select w.hidden_reason from public.workflows w where w.id = workflows.id)
  );

create policy "owner delete" on public.workflows
  for delete using (auth.uid() = user_id);

-- feedback: 정책 없음 = anon/authenticated 전면 차단, service role(서버 액션)만
alter table public.feedback enable row level security;
