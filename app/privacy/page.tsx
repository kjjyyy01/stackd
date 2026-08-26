import type { Metadata } from "next";
import Link from "next/link";

// SCR-005 메타 — 법적 문서는 색인 대상 (PRD-04)
export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Stackd가 수집하는 개인정보 항목과 이용 목적, 보관·삭제, 제3자 제공을 안내합니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="container-page flex-1 py-10 lg:py-14">
      <article className="max-w-[62ch]">
        {/* EL-LEGAL-001 페이지 유일 h1 */}
        <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">개인정보처리방침</h1>

        {/* EL-LEGAL-003 시행일·개정 이력 */}
        <p className="mt-3 text-sm text-muted-foreground">
          시행일 <time dateTime="2026-09-08">2026년 9월 8일</time> · 최초 제정 (개정 이력 없음)
        </p>

        <p className="mt-8 leading-[1.75]">
          Stackd(이하 &ldquo;서비스&rdquo;)는 AI 워크플로우 카드를 만들고 공유하는 개인 운영 서비스입니다. 서비스는
          아래와 같이 개인정보를 처리하며, 처리방침이 개정되면 이 페이지의 시행일을 갱신해 알립니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">1. 수집하는 개인정보 항목</h2>
        <p className="mt-3 leading-[1.75]">
          서비스는 별도의 회원가입 절차 없이 GitHub 계정으로만 로그인합니다. 로그인 시 GitHub으로부터 다음 정보를
          전달받습니다.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-[1.75]">
          <li>
            <strong className="font-medium">GitHub 이메일 주소</strong> — 계정 식별 목적으로 인증 저장소에만 보관하며,
            서비스 화면·공유 이미지·분석 도구·알림 어디에도 표시하거나 전송하지 않습니다.
          </li>
          <li>
            <strong className="font-medium">GitHub 핸들·프로필 이미지</strong> — 카드를 저장하는 시점의 값을 카드에 함께
            기록해 작성자 표기에 사용합니다.
          </li>
          <li>
            <strong className="font-medium">소속·역할</strong> — 선택 입력 항목입니다. 입력하지 않아도 서비스를 모두
            이용할 수 있습니다.
          </li>
          <li>
            <strong className="font-medium">이용 행태 정보</strong> — 방문한 페이지, 클릭 등 서비스 이용 기록과 쿠키를
            Google Analytics를 통해 수집합니다.
          </li>
          <li>
            <strong className="font-medium">신고자 식별자</strong> — 게시물을 신고할 때 로그인 상태라면 계정 식별자를
            함께 기록합니다. 반복 신고 남용을 확인하기 위한 용도입니다.
          </li>
        </ul>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">2. 수집·이용 목적</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-[1.75]">
          <li>로그인 및 본인 게시물 확인 — GitHub 이메일</li>
          <li>공개 게시물의 작성자 표기 — GitHub 핸들·프로필 이미지, 소속·역할</li>
          <li>이용 통계 확인과 서비스 개선 — 이용 행태 정보</li>
          <li>신고 처리 및 남용 확인 — 신고자 식별자</li>
        </ul>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">3. 보관 및 삭제</h2>
        <p className="mt-3 leading-[1.75]">
          개인정보는 회원 탈퇴 시까지 보관합니다. 설정 화면에서 탈퇴하면 계정과 작성한 워크플로우 카드가{" "}
          <strong className="font-medium">즉시 모두 삭제되며 복구할 수 없습니다.</strong> 별도의 유예 기간이나 분리 보관은
          두지 않습니다.
        </p>
        <p className="mt-3 leading-[1.75]">
          다만 신고 기록에 남은 신고자 식별자는 계정과의 연결이 끊긴 임의의 문자열 형태로 남습니다. 이 값만으로는 개인을
          알아볼 수 없습니다.
        </p>
        <p className="mt-3 leading-[1.75]">
          또한 카드를 공유했을 때 다른 서비스(메신저·소셜 미디어 등)가 자체적으로 저장한 미리보기 이미지는 서비스가
          통제할 수 없으며, 삭제 후에도 해당 서비스에 일정 기간 남아 있을 수 있습니다.
        </p>
        <p className="mt-3 leading-[1.75]">
          탈퇴는{" "}
          <Link href="/settings" className="underline underline-offset-4">
            설정
          </Link>
          에서 진행할 수 있습니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">4. 제3자 제공 및 처리 위탁</h2>
        <p className="mt-3 leading-[1.75]">
          서비스는 개인정보를 판매하지 않으며, 아래 사업자에 서비스 운영에 필요한 범위에서만 처리를 위탁합니다.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-[1.75]">
          <li>
            <strong className="font-medium">Supabase</strong> — 로그인 인증과 데이터베이스 보관
          </li>
          <li>
            <strong className="font-medium">Google (Google Analytics)</strong> — 이용 행태 통계 분석
          </li>
          <li>
            <strong className="font-medium">Vercel</strong> — 웹사이트 호스팅
          </li>
          <li>
            <strong className="font-medium">Slack</strong> — 신고 접수 알림. 신고 본문만 전달하며 신고자를 알아볼 수 있는
            정보는 포함하지 않습니다.
          </li>
        </ul>
        <p className="mt-3 leading-[1.75]">
          위 사업자는 국외에 서버를 두고 있어 개인정보가 국외에서 처리될 수 있습니다. GitHub 이메일 주소는 위 사업자 중
          Supabase의 인증 저장소 외에는 전달되지 않습니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">5. 이용자의 권리와 문의</h2>
        <p className="mt-3 leading-[1.75]">
          이용자는 언제든지 본인이 작성한 카드를 열람·수정·삭제할 수 있고, 탈퇴를 통해 모든 정보의 삭제를 요청할 수
          있습니다. 열람과 수정은 내 카드 화면에서, 삭제와 탈퇴는 설정 화면에서 직접 처리됩니다.
        </p>
        <p className="mt-3 leading-[1.75]">
          그 밖의 문의는 모든 페이지 하단의 <strong className="font-medium">문의·피드백</strong>을 통해 보내주세요.
        </p>

        {/* EL-LEGAL-004 상호 링크 */}
        <p className="mt-12 border-t border-border pt-6 leading-[1.75]">
          <Link href="/terms" className="inline-block py-2.5 underline underline-offset-4">
            이용약관 보기
          </Link>
        </p>
      </article>
    </main>
  );
}
