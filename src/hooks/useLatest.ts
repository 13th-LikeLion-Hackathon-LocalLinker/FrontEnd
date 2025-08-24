
import * as React from 'react';
import { fetchJSON } from '../apis/api';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';
import type { CategoryCode } from '../types/category';

const CATS: CategoryCode[] = ['ADMINISTRATION', 'MEDICAL', 'HOUSING', 'EMPLOYMENT', 'EDUCATION', 'LIFE_SUPPORT'];
const LANGS = ['KO', 'EN', 'UZ', 'JA', 'ZH', 'TH', 'VI'] as const;

const unpack = (res: any) => {
  if (Array.isArray(res)) return { items: res as BackendNotice[] };
  if (Array.isArray(res?.postings)) return { items: res.postings as BackendNotice[], hasNext: !!res.hasNext, totalPages: res.totalPages as number | undefined };
  const f = res?.data ?? res?.content ?? res?.list ?? [];
  return { items: Array.isArray(f) ? (f as BackendNotice[]) : [] };
};

const ts = (s: string | null) => (s ? new Date(s).getTime() : NaN);
const latestScore = (n: BackendNotice) => Math.max(ts(n.applyStartAt), ts(n.applyEndAt));

const qs = (o: Record<string, any>) => {
  const u = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'string' && v.trim() === '') return;
    u.set(k, String(v));
  });
  return u.toString();
};

async function collectCategoryAll(cat: CategoryCode, pageSize: number, maxPages: number) {
  const byId = new Map<number, BackendNotice>();
  for (const lang of LANGS) {
    let page = 0;
    while (page < maxPages) {
      let r: any;
      try {
        r = await fetchJSON(`/api/postings/category?${qs({ category: cat, size: pageSize, page, language: lang })}`);
      } catch {
        break;
      }
      const { items, hasNext, totalPages } = unpack(r);
      if (!items.length) break;
      items.forEach((n) => byId.set(n.id, n));
      if (hasNext === false || (typeof totalPages === 'number' && page + 1 >= totalPages) || items.length < pageSize) break;
      page += 1;
    }
  }
  return Array.from(byId.values());
}

export function useLatest(pageSize = 200, maxPages = 50) {
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
          const chunk = await collectCategoryAll(cat, pageSize, maxPages);
          chunk.forEach((n) => all.set(n.id, n));
          if (!cancelled) {
            const sorted = Array.from(all.values()).sort((a, b) => latestScore(b) - latestScore(a));
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
  }, [pageSize, maxPages]);

  return { list, loading, error };
}
