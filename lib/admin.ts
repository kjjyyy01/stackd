// admin 게이트 (BR-022) — 페이지·서버 액션 양쪽이 같은 함수를 쓴다. 순수 함수만.

// uid가 env 허용 목록에 있으면 true.
// env 미설정·빈 값·uid 없음은 전부 false — fail-closed (REQ-ADMIN-001 AC-3)
export function isAdmin(uid: string | null | undefined, allowList: string | undefined): boolean {
  if (!uid || !allowList) return false;
  return allowList
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .includes(uid);
}
