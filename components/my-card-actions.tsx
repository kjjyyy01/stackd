"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteWorkflow, togglePublic } from "@/app/actions/workflow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

type Props = { id: string; isPublic: boolean; hidden: boolean; hiddenReason?: string | null };

const FAIL = "처리에 실패했어요 — 다시 시도해주세요"; // CPY-ME-004 · ERR-ME-001

// EL-ME-005~008 — 목록 항목의 배지 + 소유자 액션 (서버 액션이라 클라이언트)
// ponytail: 삭제·토글 호출부가 card-actions.tsx(SCR-004)와 겹친다 — 세 번째 화면이 쓰면 훅으로 추출
export default function MyCardActions({ id, isPublic, hidden, hiddenReason }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const [shown, setShown] = useState(isPublic); // 낙관적 값 — 실패하면 되돌린다 (REQ-ME-004)

  function toggle(next: boolean) {
    setShown(next); // 배지·스위치 즉시 반영
    startTransition(async () => {
      const r = await togglePublic(id, next);
      if (!r.ok) {
        setShown(!next); // 롤백 (AC-2·3·4)
        toast.error(FAIL);
        return;
      }
      router.refresh(); // 서버 값으로 확정
    });
  }

  function remove() {
    startTransition(async () => {
      const r = await deleteWorkflow(id);
      if (!r.ok) {
        toast.error(FAIL); // 항목은 그대로 둔다 — 재시도 가능 (AC-3)
        return;
      }
      setConfirming(false);
      router.refresh(); // 서버 액션의 revalidatePath('/me')가 목록에서 뺀다
    });
  }

  return (
    <div className="mt-4 grid gap-3">
      {/* EL-ME-005 — hidden이 공개 여부보다 우선 (BR-018) */}
      {hidden ? (
        <p className="text-sm leading-[1.75] text-destructive">
          이 카드는 신고 검토로 숨겨졌어요 — 사유: {hiddenReason}. 문의는 하단 링크로
        </p>
      ) : (
        <Badge variant={shown ? "default" : "secondary"} className="w-fit">
          {shown ? "공개" : "비공개"}
        </Badge>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {/* EL-ME-008 — hidden이면 공개해도 타인에게 안 보이므로 토글 자체를 막는다 (BR-018) */}
        <label className="flex items-center gap-2.5 text-sm">
          <Switch
            checked={shown}
            disabled={hidden || pending}
            onCheckedChange={toggle}
            aria-label="공개 전환"
          />
          <span>공개 전환</span>
        </label>

        <div className="ml-auto flex gap-2">
          {/* EL-ME-006 — 로드·소유자 확인은 SCR-001 몫 (REQ-ME-005) */}
          <Button asChild variant="outline" className="h-11 px-5">
            <Link href={`/?edit=${id}`}>수정</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => setConfirming(true)}
            disabled={pending}
            className="h-11 px-5"
          >
            삭제
          </Button>
        </div>
      </div>

      {/* EL-ME-007 삭제 확인 (CPY-WF-011) */}
      <Dialog open={confirming} onOpenChange={setConfirming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말 삭제할까요? 되돌릴 수 없어요</DialogTitle>
            <DialogDescription>삭제하면 이 링크를 받은 사람도 더는 볼 수 없어요.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirming(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={remove} disabled={pending}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
