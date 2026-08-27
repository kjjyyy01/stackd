"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { clearDraft, isDraftEmpty, isResuming, loadDraft } from "@/lib/draft";

// 초안 이어쓰기/새로 시작 신호 — 빌더가 수신 (형제 컴포넌트라 이벤트로 연결)
export const DRAFT_EVENT = "stackd:draft";

type Props = { editId?: string }; // 수정 모드로 로드된 카드 id (SCR-001 §11 #3)

// 초안 복원 배너 (EL-HOME-004) — 헤더 아래 전역, 빌더가 하단이라 여기서 알린다
export default function DraftBanner({ editId }: Props) {
  const [show, setShow] = useState(false);

  // hydration 후에만 — 서버 HTML은 배너 없음 (PRD §13)
  useEffect(() => {
    const saved = loadDraft();
    // 수정 모드에서는 같은 카드의 초안만 되묻는다 (§11 #3 — 다른 초안은 빌더가 폐기)
    // `/card` 복귀는 배너 없이 즉시 복원이라 제외 (§6 뒤로가기)
    const ask = saved && !isDraftEmpty(saved) && !isResuming() && (!editId || saved.editId === editId);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 저장소는 마운트 후 1회만 읽는다
    if (ask) setShow(true);
  }, [editId]);

  if (!show) return null;

  const act = (action: "restore" | "discard") => {
    if (action === "discard") clearDraft();
    window.dispatchEvent(new CustomEvent(DRAFT_EVENT, { detail: action }));
    setShow(false);
    if (action === "restore") document.getElementById("builder")?.scrollIntoView();
  };

  return (
    <div role="status" className="border-b border-border bg-card">
      <div className="container-page flex flex-wrap items-center gap-3 py-3">
        <p className="flex-1 text-sm">작성하던 워크플로우가 있어요 — 이어서 쓸까요?</p>
        <Button type="button" size="sm" onClick={() => act("restore")}>이어서 쓰기</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => act("discard")}>새로 시작</Button>
      </div>
    </div>
  );
}
