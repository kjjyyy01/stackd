// SCR-001 홈 — 지금은 카피만 선반영한 자리표. 빌더·예시 카드는 별도 TODO 항목
export default function Home() {
  return (
    <main className="container-page flex flex-1 flex-col justify-center py-16 sm:py-24">
      <h1 className="max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">
        도구는 아는데, 어떻게 쓰는지는 모른다.
      </h1>
      <p className="mt-6 max-w-[62ch] text-muted-foreground">
        실제 개발자들이 어떤 상황에서, 어떤 순서로 agent를 쓰는지 — 워크플로우를 카드 한 장으로
        공유하세요.
      </p>
    </main>
  );
}
