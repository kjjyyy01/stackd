"use client";

import { useId, useState } from "react";
import catalog from "@/data/catalog.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LIMITS, charCount, type Category } from "@/lib/limits";

type Item = { id: string; name: string; category: Category; description: string };
const CATALOG = catalog as Item[];

type Props = {
  categories: readonly Category[]; // 단계 = 7종 / 스택 = 3종 (BR-004)
  onPick: (item: { name: string; category: Category }, method: "catalog" | "manual") => void;
  searchPlaceholder: string; // CPY-HOME-025 / CPY-HOME-031
  excludeNames?: string[]; // 스택 중복 차단용 — trim 정확 일치 (§11 #10)
  autoFocus?: boolean;
};

// 도구·스택 공용 선택기 (EL-HOME-011·012) — 카탈로그 검색 + 직접 입력 상시 노출
export default function ToolPicker({ categories, onPick, searchPlaceholder, excludeNames = [], autoFocus }: Props) {
  const uid = useId();
  const [q, setQ] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualCat, setManualCat] = useState<Category>(categories[0]);
  const [manualErr, setManualErr] = useState(false); // ERR-BLDR-002

  const query = q.trim().toLowerCase();
  // 이름 0 · 설명 1 · 미일치 2 — 이름만 보면 mcp·plugin·skill 153건이 사실상 도달 불가다
  // (예: Aider는 설명의 "AI pair programming"으로만 찾을 수 있다)
  const rank = (i: Item) =>
    i.name.toLowerCase().includes(query) ? 0 : i.description.toLowerCase().includes(query) ? 1 : 2;
  // ponytail: 부분 일치 선형 검색 — 268건이라 충분, 수천 건 되면 인덱스
  const results = query
    ? CATALOG.filter((i) => categories.includes(i.category) && rank(i) < 2)
        .sort((a, b) => rank(a) - rank(b)) // 설명이 스친 항목이 정확한 이름을 밀어내지 않게
        .slice(0, 20)
    : [];
  const taken = new Set(excludeNames.map((n) => n.trim()));

  function confirmManual() {
    const name = manualName.trim();
    const n = charCount(name);
    if (n < LIMITS.tool_name.min || n > LIMITS.tool_name.max) return setManualErr(true);
    onPick({ name, category: manualCat }, "manual");
    setManualName("");
    setManualErr(false);
  }

  return (
    <div className="grid gap-4 rounded-lg border border-border bg-card p-4">
      {/* 카탈로그 검색 */}
      <div>
        <label htmlFor={`${uid}-q`} className="sr-only">{searchPlaceholder}</label>
        <Input
          id={`${uid}-q`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={searchPlaceholder}
          autoFocus={autoFocus}
          autoComplete="off"
        />
        {query && (
          <ul className="mt-2 max-h-64 divide-y divide-border overflow-y-auto rounded-lg border border-border" aria-label="검색 결과">
            {results.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">찾는 도구가 없나요? 직접 입력으로 담아보세요</li>
            )}
            {results.map((i) => {
              const dup = taken.has(i.name);
              return (
                <li key={i.id}>
                  <button
                    type="button"
                    disabled={dup}
                    onClick={() => { onPick({ name: i.name, category: i.category }, "catalog"); setQ(""); }}
                    className="flex w-full items-baseline gap-2 px-3 py-2 text-left hover:bg-muted disabled:opacity-50 focus-visible:bg-muted focus-visible:outline-none"
                  >
                    {/* 설명은 표시하지 않는다 — 좁은 폭에서 넘쳐 목록을 밀어냈다. 검색 매칭에는 계속 쓴다 */}
                    <span className="min-w-0 break-words font-mono text-sm font-medium">{i.name}</span>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">{i.category}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* 직접 입력 — 검색 결과와 무관하게 항상 (CPY-HOME-026) */}
      <div className="grid gap-2">
        <span className="text-sm text-muted-foreground">직접 입력</span>
        <div className="flex flex-wrap gap-2">
          <label htmlFor={`${uid}-name`} className="sr-only">이름</label>
          <Input
            id={`${uid}-name`}
            value={manualName}
            onChange={(e) => { if (charCount(e.target.value) <= LIMITS.tool_name.max) { setManualName(e.target.value); setManualErr(false); } }}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); confirmManual(); } }}
            placeholder="이름"
            aria-invalid={manualErr || undefined}
            aria-describedby={manualErr ? `${uid}-err` : undefined}
            className="min-w-0 flex-1"
          />
          <label htmlFor={`${uid}-cat`} className="sr-only">카테고리</label>
          <select
            id={`${uid}-cat`}
            value={manualCat}
            onChange={(e) => setManualCat(e.target.value as Category)}
            className="h-8 rounded-lg border border-input bg-background px-2 font-mono text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <Button type="button" variant="outline" onClick={confirmManual}>담기</Button>
        </div>
        {manualErr && <p id={`${uid}-err`} className="text-xs text-destructive">이름을 1~40자로 입력해주세요</p>}
      </div>
    </div>
  );
}
