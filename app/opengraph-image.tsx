import { ImageResponse } from "next/og";
import { DEFAULT_OG_FONTS, DefaultOg, OG_SIZE } from "@/lib/og";

// 전 페이지 기본 OG — 개별 페이지가 덮어쓰지 않으면 이 이미지가 쓰인다 (PRD-04 "정적 기본")
// 태그라인은 한글 — 빌드 타임이라 fetch가 불가해 서브셋 폰트를 번들에 박아 쓴다 (OQ-003 판정)
export const alt = "Stackd — AI 워크플로우 카드";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<DefaultOg />, { ...size, fonts: DEFAULT_OG_FONTS });
}
