"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteAccount, updateRoleDefault } from "@/app/actions/account";
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
import { LIMITS, charCount, matchesHandle } from "@/lib/limits";

const ROLE_OVER = "소속·역할은 한글·영문·숫자로 20자까지 쓸 수 있어요"; // CPY-CARD-007 · ERR-CARD-003
const SAVE_FAIL = "저장에 실패했어요"; // CPY-SET-005 · ERR-SET-002
const DELETE_FAIL = "탈퇴 처리에 실패했어요 — 잠시 후 다시 시도해주세요"; // CPY-SET-004 · ERR-SET-001

// EL-SET-003 — 소속·역할 기본값 폼 (REQ-SET-002)
export function RoleDefaultForm({ initial }: { initial: string }) {
  const [role, setRole] = useState(initial);
  const [over, setOver] = useState(false);
  const [pending, startTransition] = useTransition();

  // 상한 넘는 입력은 값 자체를 반영하지 않는다 — 빌더와 같은 차단 방식 (AC-2)
  function change(s: string) {
    if (charCount(s) > LIMITS.role.max) return setOver(true);
    setOver(false);
    setRole(s);
  }

  function save() {
    startTransition(async () => {
      const r = await updateRoleDefault(role);
      // 서버 재검증 실패도 같은 코드로 돌아온다 (AC-2 후단)
      if (!r.ok) {
        toast.error(r.code === "ERR-CARD-003" ? ROLE_OVER : SAVE_FAIL);
        return;
      }
      toast.success("저장했어요"); // CPY-SET-007
    });
  }

  return (
    <section className="grid gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor="role-default" className="text-sm font-medium">
          소속·역할 기본값 (새 카드에 자동으로 채워져요)
        </label>
        <span
          className={`font-mono text-xs ${over ? "text-destructive" : "text-muted-foreground"}`}
        >
          {charCount(role)}/{LIMITS.role.max}
        </span>
      </div>
      <Input
        id="role-default"
        value={role}
        onChange={(e) => change(e.target.value)}
        aria-describedby={over ? "role-default-error" : undefined}
      />
      {over && (
        <p id="role-default-error" className="text-sm leading-[1.75] text-destructive">
          {ROLE_OVER}
        </p>
      )}
      <Button onClick={save} disabled={pending} className="h-11 w-fit px-5">
        저장
      </Button>
    </section>
  );
}

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
