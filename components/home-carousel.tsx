"use client";

import { Children, useEffect, useState, type ReactNode } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Props = { children: ReactNode };

// 캐러셀 셸 (EL-HOME-016) — shadcn Carousel(Embla), 끝에서 처음으로 순환.
// 슬라이드는 서버 렌더 children — 여기서 CarouselItem으로만 감싼다.
// lg 미만은 Embla를 끄고 세로 스택 — 콘텐츠가 뷰포트(780px)를 99px 넘어
// 가로 스와이프와 세로 스크롤이 충돌했다 (390×844 실측, 2026-08-28)
const OPTS = { loop: true, breakpoints: { "(max-width: 1023px)": { active: false } } };

export default function HomeCarousel({ children }: Props) {
  const slides = Children.toArray(children);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  // 카운터 갱신 + reduce면 즉시 이동(duration 0 = Embla 즉시 모드, REQ-HOME-008)
  useEffect(() => {
    if (!api) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) api.reInit({ ...OPTS, duration: 0 });
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => void api.off("select", onSelect);
  }, [api]);

  // xl+에서만 — lg 이하는 콘텐츠(max-w-6xl)가 뷰포트를 채워 화살표가 본문과 겹친다 (2026-08-25 실측)
  const arrowCls =
    "top-1/2 z-10 hidden size-13 -translate-y-1/2 border-border bg-white/90 text-xl hover:bg-white xl:flex";

  return (
    // 휠 플러그인 = 트랙패드 가로 넘김 (Embla 본체는 터치·마우스만), 세로 휠은 페이지로 통과
    <Carousel opts={OPTS} plugins={[WheelGesturesPlugin()]} setApi={setApi} tabIndex={0} aria-label="문제와 해결 슬라이드">
      <CarouselContent className="ml-0 flex-col lg:flex-row">
        {slides.map((slide, i) => (
          <CarouselItem key={i} className="pl-0">
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious aria-label="이전 슬라이드" className={`${arrowCls} left-5 my-0`} />
      <CarouselNext aria-label="다음 슬라이드" className={`${arrowCls} right-5 my-0`} />
      <span
        aria-hidden
        className="absolute bottom-4 right-4 z-10 hidden rounded-full bg-foreground/70 px-3 py-1.5 font-mono text-xs font-medium tracking-[0.08em] text-white lg:block"
      >
        {current} / {slides.length}
      </span>
    </Carousel>
  );
}
