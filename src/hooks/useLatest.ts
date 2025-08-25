import * as React from 'react';
import { fetchJSON } from '../apis/api';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';
import type { CategoryCode } from '../types/category';

const CATS: CategoryCode[] = [
  'ADMINISTRATION',
  'MEDICAL',
  'HOUSING',
  'EMPLOYMENT',
  'EDUCATION',
  'LIFE_SUPPORT',
];
const LANGS = ['KO', 'EN', 'UZ', 'JA', 'ZH', 'TH', 'VI'] as const;

// ✅ 외부에서 넘길 필터: nation은 제외(UI-only)
type LatestFilters = {
  visa?: string;       // 서버가 기대하는 포맷으로 넘겨주세요 (예: D2, E9, F2 ...)
  married?: boolean;   // true / false
};

const unpack = (res: any) => {
  if (Array.isArray(res)) return { items: res as BackendNotice[] };
  if (Array.isArray(res?.postings))
    return {
      items: res.postings as BackendNotice[],
      hasNext: !!res.hasNext,
      totalPages: res.totalPages as number | undefined,
    };
  const f = res?.data ?? res?.content ?? res?.list ?? [];
  return { items: Array.isArray(f) ? (f as BackendNotice[]) : [] };
};

const ts = (s: string | null) => (s ? new Date(s).getTime() : NaN);
const latestScore = (n: BackendNotice) =>
  Math.max(ts(n.applyStartAt), ts(n.applyEndAt));

const qs = (o: Record<string, any>) => {
  const u = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'string' && v.trim() === '') return;
    u.set(k, String(v));
  });
  return u.toString();
};

async function collectCategoryAll(
  cat: CategoryCode,
  pageSize: number,
  maxPages: number,
  filters?: LatestFilters,           // ✅ 필터 추가
) {
  const byId = new Map<number, BackendNotice>();
  for (const lang of LANGS) {
    let page = 0;
    while (page < maxPages) {
      let r: any;
      try {
        r = await fetchJSON(
          `/api/postings/category?${qs({
            category: cat,
            size: pageSize,
            page,
            language: lang,
            // ✅ 비자/결혼여부만 서버로 전달
            visa: filters?.visa,
            married: filters?.married,
          })}`,
        );
      } catch {
        break;
      }
      const { items, hasNext, totalPages } = unpack(r);
      if (!items.length) break;
      items.forEach((n) => byId.set(n.id, n));

      // ✅ 서버가 요청당 50개로 캡해도 다음 페이지 시도 가능하도록
      if (
        hasNext === false ||
        (typeof totalPages === 'number' && page + 1 >= totalPages)
      ) {
        break;
      }
      page += 1;
    }
  }
  return Array.from(byId.values());
}

// ✅ filters 인자를 받도록 수정
export function useLatest(pageSize = 200, maxPages = 50, filters?: LatestFilters) {
  const [list, setList] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setList([]);

    (async () => {
      try {
        const all = new Map<number, BackendNotice>();
        for (const cat of CATS) {
          const chunk = await collectCategoryAll(cat, pageSize, maxPages, filters);
          chunk.forEach((n) => all.set(n.id, n));
          if (!cancelled) {
            const sorted = Array.from(all.values()).sort(
              (a, b) => latestScore(b) - latestScore(a),
            );
            setList(mapBackendList(sorted));
          }
        }
        if (!cancelled) setLoading(false);
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? String(e));
          setList([]);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // ✅ 비자/결혼여부가 바뀌면 재조회
  }, [pageSize, maxPages, filters?.visa, filters?.married]);

  return { list, loading, error };
}
