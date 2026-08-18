import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// 매 요청마다 Supabase 세션 토큰 갱신 → 갱신된 쿠키를 응답에 기록 (리다이렉트·DB 조회 없음)
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 응답 생성 전에 호출해야 refresh된 세션이 쿠키에 반영됨
  await supabase.auth.getClaims();

  return response;
}

export const config = {
  // 정적 파일·이미지·OG 라우트는 제외
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/og|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
