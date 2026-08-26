import type { Metadata } from "next";
import Link from "next/link";

// SCR-005 메타 — 법적 문서는 색인 대상 (PRD-04)
export const metadata: Metadata = {
  title: "이용약관",
  description: "Stackd 서비스의 이용 조건, 게시물 책임과 작성자 표기, 금지 행위, 신고 처리와 탈퇴를 안내합니다.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="container-page flex-1 py-10 lg:py-14">
      <article className="max-w-[62ch]">
        {/* EL-LEGAL-002 페이지 유일 h1 */}
        <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">이용약관</h1>

        {/* EL-LEGAL-003 시행일·개정 이력 */}
        <p className="mt-3 text-sm text-muted-foreground">
          시행일 <time dateTime="2026-09-08">2026년 9월 8일</time> · 최초 제정 (개정 이력 없음)
        </p>

        <p className="mt-8 leading-[1.75]">
          이 약관은 Stackd(이하 &ldquo;서비스&rdquo;)의 이용 조건을 정합니다. 서비스를 이용하면 이 약관에 동의한 것으로
          봅니다. 약관이 개정되면 이 페이지의 시행일을 갱신해 알립니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">1. 서비스 정의</h2>
        <p className="mt-3 leading-[1.75]">
          서비스는 이용자가 자신의 AI 워크플로우(상황·단계·사용 도구)를 카드 형태로 작성하고, 링크로 공유하거나
          라이브러리에서 다른 이용자의 카드를 볼 수 있게 하는 웹 서비스입니다. 모든 기능은 무료로 제공됩니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">2. 게시물의 책임</h2>
        <p className="mt-3 leading-[1.75]">
          이용자가 작성한 카드의 내용에 대한 책임은 작성자 본인에게 있습니다. 서비스는 게시물의 내용을 사전에 검토하지
          않으며, 게시물의 정확성이나 유용성을 보증하지 않습니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">3. 공개 게시물의 작성자 표기</h2>
        <p className="mt-3 leading-[1.75]">
          카드를 저장하면 저장 시점의{" "}
          <strong className="font-medium">GitHub 핸들과 프로필 이미지가 작성자로 함께 기록</strong>되며, 카드·상세 페이지
          ·공유용 미리보기 이미지·라이브러리에 표시됩니다. 소속·역할을 입력한 경우 함께 표시됩니다. 표기를 원하지 않는
          경우 카드를 공개하지 않거나 삭제할 수 있습니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">4. 금지 행위</h2>
        <p className="mt-3 leading-[1.75]">다음 행위는 금지되며, 확인되는 경우 게시물이 숨김 처리될 수 있습니다.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-[1.75]">
          <li>욕설·혐오 표현, 타인에 대한 비방</li>
          <li>광고성 게시물의 반복 등록 등 스팸 행위</li>
          <li>피싱을 목적으로 하거나 이용자를 속이는 내용의 게시</li>
          <li>타인을 사칭하는 행위</li>
          <li>비공개 게시물의 주소를 추측해 접근하려는 시도</li>
        </ul>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">5. 신고와 숨김 처리</h2>
        <p className="mt-3 leading-[1.75]">
          누구나 게시물을 신고할 수 있습니다. 운영자는 신고를 확인한 뒤 게시물을 숨김 처리할 수 있으며, 숨겨진 게시물의
          상세 페이지에는 내용 대신 <strong className="font-medium">숨김 사유가 모두에게 표시</strong>됩니다. 작성자
          본인에게는 숨김 상태임을 알리는 표시가 함께 보입니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">6. 공개 게시물의 검색 노출</h2>
        <p className="mt-3 leading-[1.75]">
          카드를 공개로 저장하면 서비스의 라이브러리에 실리고 검색 엔진에도 노출될 수 있습니다. 노출을 원하지 않으면 카드
          저장 화면에서 비공개로 설정하세요. 비공개 카드는 작성자 본인만 볼 수 있으며 링크로도 열리지 않습니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">7. 삭제와 탈퇴</h2>
        <p className="mt-3 leading-[1.75]">
          이용자는 자신이 작성한 카드를 언제든지 삭제할 수 있습니다. 탈퇴하면 계정과 작성한 카드가 모두 삭제되며{" "}
          <strong className="font-medium">복구할 수 없습니다.</strong> 처리 내용은{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            개인정보처리방침
          </Link>
          을 따릅니다.
        </p>

        <h2 className="mt-10 text-lg font-semibold sm:text-xl">8. 면책</h2>
        <p className="mt-3 leading-[1.75]">
          서비스는 무료로 제공되며, 운영자는 서비스의 중단·변경·종료로 발생한 손해에 대해 책임을 지지 않습니다. 다만
          서비스를 종료하는 경우 사전에 공지하도록 노력합니다.
        </p>

        {/* EL-LEGAL-004 상호 링크 */}
        <p className="mt-12 border-t border-border pt-6 leading-[1.75]">
          <Link href="/privacy" className="inline-block py-2.5 underline underline-offset-4">
            개인정보처리방침 보기
          </Link>
        </p>
      </article>
    </main>
  );
}
