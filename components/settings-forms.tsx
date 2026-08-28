"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteAccount } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { matchesHandle } from "@/lib/limits";

const DELETE_FAIL = "탈퇴 처리에 실패했어요 — 잠시 후 다시 시도해주세요"; // CPY-SET-004 · ERR-SET-001

// EL-SET-005 — 탈퇴 (REQ-SET-004). 페이지에는 버튼만, 확인 입력은 dialog 안에서 받는다
// (2026-08-28 사용자 결정 — 파괴적 행동을 한 단계 뒤로 미룬다)
export function DeleteAccountForm({ handle }: { handle: string }) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [pending, startTransition] = useTransition();
  const matched = matchesHandle(confirm, handle);

  // 닫을 때 입력을 비운다 — 남겨두면 다시 열었을 때 탈퇴 버튼이 이미 열린 상태로 뜬다
  function toggle(next: boolean) {
    setOpen(next);
    if (!next) setConfirm("");
  }

  function remove() {
    startTransition(async () => {
      // 성공하면 서버 액션이 redirect('/') 하므로 여기로 돌아오지 않는다
      const r = await deleteAccount(confirm);
      if (!r.ok) toast.error(DELETE_FAIL); // 세션·페이지 유지 (AC-3)
    });
  }

  return (
    <>
      {/* 계정 단위 종결 행동이라 solid — 목록 안에 끼어 있는 카드 삭제 트리거와 무게가 다르다 */}
      <Button
        variant="destructive"
        onClick={() => toggle(true)}
        className="h-11 w-fit px-5"
      >
        탈퇴
      </Button>

      {/* 확인 입력이 핸들과 같을 때만 실행 버튼이 열린다 (BR-020 · §7) */}
      <Dialog open={open} onOpenChange={toggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>탈퇴하기</DialogTitle>
            <DialogDescription>
              계정과 만든 카드가 모두 삭제되며 되돌릴 수 없어요.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <label htmlFor="delete-confirm" className="text-sm leading-[1.75]">
              확인을 위해 <span className="font-mono">{handle}</span> 를 입력해주세요
            </label>
            <Input
              id="delete-confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="off"
              aria-describedby="delete-confirm-hint"
            />
            <p id="delete-confirm-hint" className="text-sm leading-[1.75] text-muted-foreground">
              핸들이 일치해야 탈퇴 버튼이 열려요.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => toggle(false)}
              disabled={pending}
              className="h-11 px-5"
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={remove}
              disabled={!matched || pending}
              className="h-11 px-5"
            >
              탈퇴
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
