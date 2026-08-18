"use client";

import { useState } from "react";
import { toast } from "sonner";
import { submitFeedback, type FeedbackType } from "@/app/actions/feedback";
import { LIMITS } from "@/lib/limits";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  type?: FeedbackType;
  workflowId?: string;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

// 신고·문의 공용 dialog — 푸터는 contact, SCR-004 신고는 report (PRD-06 submitFeedback)
export default function FeedbackDialog({
  type = "contact",
  workflowId,
  title,
  description,
  trigger,
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  // form action 대신 onSubmit — 실패 시 React가 폼을 리셋하지 않아 입력이 남는다 (ERR-FB-001 "dialog 유지")
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await submitFeedback(new FormData(event.currentTarget));
    setPending(false);

    if (result.status === "ok") {
      toast.success("보내주셔서 감사해요 — 확인 후 반영할게요"); // CPY-COMMON-002
      setOpen(false);
    } else {
      toast.error("전송에 실패했어요 — 잠시 후 다시 시도해주세요"); // CPY-COMMON-003
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="hidden" name="type" value={type} />
          {workflowId && <input type="hidden" name="workflowId" value={workflowId} />}
          <div className="grid gap-2">
            <label htmlFor="feedback-body" className="text-sm font-medium">
              내용
            </label>
            <Textarea
              id="feedback-body"
              name="body"
              required
              minLength={LIMITS.feedback_body.min}
              maxLength={LIMITS.feedback_body.max}
              rows={5}
              placeholder="내용을 1~500자로 적어주세요" // CPY-COMMON-009
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" size="lg" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? "보내는 중" : "보내기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
