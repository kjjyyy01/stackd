// 홈 히어로에 박히는 0번 카드 데이터 (EL-HOME-003) — 상한 케이스 겸용 (TC-CARD-001-04)
// WORKFLOW = agent 계층만(skills·mcp·plugins). 기술 스택은 STACK 태그의 몫이다.
import type { WorkflowInput } from "./limits";

// 전 필드 상한 정확히: 제목 30자·상황 20자·단계 8개·메모 60자·태그 4개 (BR-001·010·011·013·015)
export const HERO_CARD: WorkflowInput = {
  title: "클로드 코드와 서브에이전트로 3주 만에 서비스 출시하기",
  situation_short: "혼자서 3주 안에 MVP를 출시할 때",
  situation: "혼자 3주 안에 실서비스를 내야 하는데, 기획부터 배포까지 전부 직접 해야 하는 상황.",
  steps: [
    {
      tool: { name: "superpowers", category: "plugin" },
      note: "유일한 오케스트레이터. brainstorming과 grill로 스코프를 먼저 자르고 나머지는 백로그로 보낸다",
      detail: "superpowers 하나만 오케스트레이터로 쓴다 — 동시에 여러 개를 켜지 않는다. 착수 전 brainstorming으로 의도를 캐묻고, /grill-me로 가설과 스코프를 스트레스 테스트한다. 기획서는 make-plan으로 — 화면은 7개 이하로 강제하고, 넘치는 아이디어는 backlog.md로 보낸다.",
    },
    {
      tool: { name: "make-prd", category: "skill" },
      note: "화면별 수용 기준을 ID로 고정해서 구현 도중에 스코프가 조용히 흔들리지 않게 단단히 못을 박아 둔다",
      detail: "MVP 기획서를 화면 단위 PRD로 바꾼다. SCR·EL·REQ·BR·CPY 같은 ID 스킴으로 값은 한 곳에만 두고 나머지는 참조만 한다. 수정도 항상 이 스킬로 돌려 정합성 검사 9항목을 통과시킨다 — 검사가 미검증 P0 하나를 잡아낸 적이 있다.",
    },
    {
      tool: { name: "sequential-thinking", category: "mcp" },
      note: "설계 판단이 갈릴 때만 붙여서 결론만이 아니라 검토하고 버린 대안까지 한 줄씩 빠짐없이 기록해 둔다",
      detail: "단순 구현에는 쓰지 않는다 — 오버헤드다. 순환 의존, 화면 계약 변경, 원인 후보가 여럿인 디버깅처럼 선택지를 끝까지 따라가야 하는 판단에서만 켠다. 산출물은 결론이 아니라 기록이다: 3주 뒤 '왜 이렇게 했지'에 답할 수 있게.",
    },
    {
      tool: { name: "ponytail", category: "plugin" },
      note: "구현 구간 상시로 켠다. 혹시 몰라서 미리 만드는 추상화와 의존성을 착수하는 그 시점에 바로 차단한다",
      detail: "구현 세션의 도구 묶음 — 전부 Claude Code 안에서 돈다. ponytail(YAGNI 강제: 한 구현체뿐인 인터페이스·쓰지 않을 설정·'나중을 위한' 스캐폴딩 차단), context7(라이브러리 문서를 기억이 아니라 현재 버전으로), frontend-design·design-taste-frontend(밋밋한 UI가 감지되면 재패스). /tdd는 도메인 로직·유틸에만 — UI는 시각 확인 루프가 테스트를 대신한다.",
    },
    {
      tool: { name: "chrome-devtools", category: "mcp" },
      note: "화면 하나가 끝날 때마다 스크린샷과 본인 눈으로 이중 확인하고 갈리는 판정은 전부 실측으로 결정한다",
      detail: "코드만 보고 넘어가지 않는다. 모바일·데스크톱 브레이크포인트별로 스크린샷을 찍고, 본인 눈으로 한 번 더 본다. 비율처럼 숙고로 안 나오는 건 렌더해서 잰다 — 카드 4:5는 상한 케이스를 px 단위로 재서 확정했다.",
    },
    {
      tool: { name: "commit-push", category: "skill" },
      note: "작업 브랜치에서 Vercel 프리뷰로 확인한 뒤 main에 머지하고 원인과 해결은 커밋 메시지에 꼭 남긴다",
      detail: "직접 만든 개인 스킬이다(카탈로그엔 없음 — git add·commit·push를 Conventional Commits로 감싼 것). 첫 파일을 건드리기 전에 브랜치부터 만들고, 트러블슈팅 해결 커밋에는 원인·해결 한 줄을 반드시 넣는다 — 세션 기록이 유실돼도 git log에서 복원할 수 있게(이중화). main 직커밋은 핫픽스만. 같은 역할은 superpowers의 finishing-a-development-branch로도 된다.",
    },
    {
      tool: { name: "claude-mem", category: "plugin" },
      note: "세션의 관찰과 판단을 자동으로 보존한다 — 구현 세션과 기록 세션을 잇는 유일한 다리 역할을 한다",
      detail: "구현 중에는 기록하지 않는다. claude-mem이 세션의 관찰·판단을 자동 보존하고, 하루 끝에 기록 세션이 이걸 소스로 읽는다. 상시 켜두는 유일한 메모리 계층이라 이게 꺼지면 EOD 기록의 원천이 사라진다.",
    },
    {
      tool: { name: "Notion · Obsidian", category: "plugin" },
      note: "하루 끝 기록 세션에서만 켠다 — 과정은 Notion에, 다음 프로젝트에도 쓸 지식은 Obsidian에 둔다",
      detail: "구현 세션에는 붙이지 않는다(컨텍스트 오염). EOD 20~30분: '이 프로젝트에서 무슨 일이 있었나'는 Notion 개발 로그(트러블슈팅·과정 요약), '다음 프로젝트에서도 쓸 지식인가'는 Obsidian TIL. 트러블슈팅만은 당일 필수 — 하루 지나면 디테일이 증발한다.",
    },
  ],
  dev_stack: [
    { name: "TypeScript", category: "language" },
    { name: "Next.js", category: "framework" },
    { name: "Tailwind CSS", category: "framework" },
    { name: "Supabase", category: "tool" },
  ],
  role: "1인 개발자",
  accent: "ink",
  is_public: true,
};
