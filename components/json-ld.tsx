// 구조화 데이터 공용 렌더러 (PRD-04 §JSON-LD)
// `<`를 이스케이프하는 이유: 사용자 입력(카드 제목 등)이 <script> 안쪽으로 들어가는 자리라,
// 제목에 `</script>`가 섞이면 스크립트 블록이 조기 종료된다. JSON 파서는 <를 <로 읽으므로 데이터는 무손상.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
