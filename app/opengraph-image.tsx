import { ImageResponse } from "next/og";
import { DefaultOg, OG_SIZE } from "@/lib/og";

// 전 페이지 기본 OG — 개별 페이지가 덮어쓰지 않으면 이 이미지가 쓰인다 (PRD-04 "정적 기본")
// 한글은 폰트 파일이 필요해 넣지 않는다 — 워드마크만 라틴 기본 폰트로 (OQ-003 판정)
export const alt = "Stackd — AI 워크플로우 카드";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<DefaultOg />, size);
}
