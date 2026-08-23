// 홈 히어로에 박히는 0번 카드 데이터 (EL-HOME-003) — 상한 케이스 겸용
import type { WorkflowInput } from "./limits";

// 전 필드 상한 정확히: 제목 30자·상황 20자·단계 8개·메모 60자·태그 4개 (BR-001·010·011·013·015)
export const HERO_CARD: WorkflowInput = {
  title: "클로드 코드와 서브에이전트로 3주 만에 서비스 출시하기",
  situation_short: "혼자서 3주 안에 MVP를 출시할 때",
  situation: "혼자 3주 안에 실서비스를 내야 하는데, 기획부터 배포까지 전부 직접 해야 하는 상황.",
  steps: [
    { tool: { name: "Claude Code", category: "agent" }, note: "아이디어를 grill로 두들겨서 스코프를 일곱 화면 이하로 강제로 줄이고 남은 건 전부 백로그 파일로 보낸다", detail: "스코프를 줄이는 건 기능을 빼는 게 아니라 판정 시점을 앞당기는 일이다." },
    { tool: { name: "sequential-thinking", category: "mcp" }, note: "순환 의존이나 착수 순서가 걸릴 때만 붙이고 판단 근거는 문서에 한 줄로 남긴 뒤 넘어간다", detail: "근거를 남기지 않으면 같은 판단을 사흘 뒤에 다시 하게 된다." },
    { tool: { name: "make-prd", category: "skill" }, note: "화면별 수용 기준을 아이디로 고정해서 구현 도중에 스코프가 조용히 흔들리지 않게 못을 박는다", detail: "수용 기준이 없으면 구현 중 협상이 시작되고 일정이 그때부터 흔들린다." },
    { tool: { name: "Supabase", category: "tool" }, note: "인증과 데이터베이스와 보안 정책을 한 곳에서 전부 끝내고 커스텀 서버라는 선택지는 아예 후보에서 지워 버린다", detail: "커스텀 서버는 3주 일정에서 유지비가 가장 비싼 선택지다." },
    { tool: { name: "shadcn/ui", category: "framework" }, note: "디자인 토큰을 먼저 확정한 다음에 재스킨해서 화면마다 간격과 색이 제각각으로 갈라지지 않도록 미리 막아 둔다", detail: "토큰을 나중에 확정하면 이미 쓴 화면을 전부 다시 손봐야 한다." },
    { tool: { name: "ponytail", category: "plugin" }, note: "혹시 몰라서 미리 만드는 추상화와 유틸을 착수하는 시점에 자동으로 차단해서 나중에 읽어야 할 코드를 줄인다", detail: "혹시 몰라서 만든 코드는 대부분 쓰이지 않고 읽는 비용만 남는다." },
    { tool: { name: "chrome-devtools", category: "mcp" }, note: "화면 하나가 끝날 때마다 브레이크포인트별로 스크린샷을 찍어서 깨진 곳을 그 자리에서 바로 고치고 넘어간다", detail: "검증 루프가 크롬뿐이면 iOS 사파리는 미검증 상태로 런칭된다." },
    { tool: { name: "Vercel", category: "tool" }, note: "매일 배포해서 로컬에서만 도는 코드를 완성한 것으로 세지 않도록 검증 루프를 단단하게 굳혀 두고 계속 지킨다", detail: "로컬에서만 도는 코드는 완성이 아니다 — 배포된 URL이 기준이다." },
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
