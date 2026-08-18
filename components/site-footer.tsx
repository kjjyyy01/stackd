import Link from "next/link";
import FeedbackDialog from "@/components/feedback-dialog";
import { Button } from "@/components/ui/button";

// 전 페이지 공통 푸터 — /privacy · /terms + 문의·피드백 dialog (PRD-04)
export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © 2026 <span className="font-mono">stackd</span>
        </p>

        {/* -mx-2로 링크 내부 패딩을 상쇄 — 첫 항목 글자가 컨테이너 좌측 축에 맞는다 */}
        <nav aria-label="푸터" className="-mx-2 flex flex-wrap items-center gap-1 text-sm">
          <Link
            href="/privacy"
            className="rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/terms"
            className="rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            이용약관
          </Link>
          <FeedbackDialog
            title="문의·피드백"
            description="불편한 점이나 있었으면 하는 기능을 적어주세요. 답장이 필요하면 GitHub 핸들을 함께 적어주세요."
            trigger={
              <Button variant="ghost" size="lg" className="font-normal text-muted-foreground">
                문의·피드백
              </Button>
            }
          />
        </nav>
      </div>
    </footer>
  );
}
