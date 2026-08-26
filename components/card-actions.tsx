"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteWorkflow, togglePublic } from "@/app/actions/workflow";
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
import { track } from "@/lib/analytics";

type Props = { id: string; isOwner: boolean; isPublic: boolean; hidden: boolean };

// EL-WF-006·009 — 공유·소유자 액션 (클립보드·서버 액션이라 클라이언트)
export default function CardActions({ id, isOwner, isPublic, hidden }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  async function copyLink() {
    const url = `${location.origin}/card-detail/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("링크를 복사했어요");
      // 소유자 공유 = H-02 지표, 타인 공유는 보조 (PRD-15)
      track(isOwner ? "card_share" : "card_reshare", { share_method: "link_copy", workflow_id: id });
    } catch {
      // 클립보드 거부·미지원 — 주소를 띄워 직접 복사하게 (ERR-SHARE-003)
      toast.error(`복사가 안 되면 이 주소를 직접 복사해주세요: ${url}`);
    }
  }

  function remove() {
    startTransition(async () => {
      const r = await deleteWorkflow(id);
      if (!r.ok) {
        toast.error("처리에 실패했어요 — 다시 시도해주세요");
        return;
      }
      toast.success("삭제했어요");
      router.push("/me");
    });
  }

  function toggle(next: boolean) {
    startTransition(async () => {
      const r = await togglePublic(id, next);
      if (!r.ok) {
        toast.error("처리에 실패했어요 — 다시 시도해주세요");
        return;
      }
      router.refresh(); // 서버가 배지·스위치의 원본 — 낙관적 갱신을 되돌릴 필요가 없다
    });
  }

  return (
    <div className="mt-6">
      <Button variant="outline" onClick={copyLink} className="h-11 px-6">
        링크 복사
      </Button>

      {isOwner && (
        <div className="mt-6 border-t border-border pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href={`/?edit=${id}`}>수정</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirming(true)}
              disabled={pending}
              className="h-11 px-6"
            >
              삭제
            </Button>
          </div>

          {/* hidden이면 공개해도 타인에게 안 보인다 — 토글 자체를 막는다 (BR-018) */}
          <label className="mt-6 flex items-center gap-3 text-sm">
            <Switch
              checked={isPublic}
              disabled={hidden || pending}
              onCheckedChange={toggle}
              aria-label="공개 전환"
            />
            <span>{isPublic ? "공개" : "비공개"}</span>
          </label>
        </div>
      )}

      {/* EL-WF-010 삭제 확인 */}
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
