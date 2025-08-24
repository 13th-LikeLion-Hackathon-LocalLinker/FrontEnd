
import * as React from 'react';
import { fetchJSON } from '../apis/api';
import type { CategoryCode } from '../types/category';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';

type Language = 'KO' | 'EN' | 'UZ' | 'JA' | 'ZH' | 'TH' | 'VI';

type Params = {
  cat: CategoryCode;
  page?: number;
  size?: number;
  visa?: string;
  language?: Language;
  married?: boolean;
};

const pick = (res: any): BackendNotice[] => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.postings)) return res.postings;
  const f = res?.data ?? res?.content ?? res?.list ?? [];
  return Array.isArray(f) ? f : [];
};

const qs = (o: Record<string, any>) => {
  const u = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'string' && v.trim() === '') return;
    u.set(k, typeof v === 'boolean' ? String(v) : String(v));
  });
  return u.toString();
};

async function fetchCategory(
  base: { category: CategoryCode; page: number; size: number; visa?: string; language?: Language; married?: boolean },
  signal: AbortSignal
): Promise<BackendNotice[]> {
  const res = await fetchJSON(`/api/postings/category?${qs(base)}`, { signal });
  return pick(res);
}

export function useCategoryResults(params: Params) {
  const [list, setList] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const category = params.cat;
        const page = params.page ?? 0;
        const size = params.size ?? 50;

        let got = await fetchCategory(
          {
            category,
            page,
            size,
            visa: params.visa?.trim() || undefined,
            language: params.language,
            married: typeof params.married === 'boolean' ? params.married : undefined,
          },
          ac.signal
        );

        let strict = got.filter((n) => n.category === category);
        if (!strict.length) {
          got = await fetchCategory({ category, page, size }, ac.signal);
          strict = got.filter((n) => n.category === category);
        }
        if (!strict.length) {
          const res = await fetchJSON(`/api/postings/latest?limit=${Math.max(50, size * 2)}`, { signal: ac.signal });
          strict = pick(res).filter((n) => n.category === category);
        }

        if (!ac.signal.aborted) setList(mapBackendList(strict));
      } catch (e: any) {
        if (!ac.signal.aborted) {
          setError(e?.message ?? String(e));
          setList([]);
        }
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [params.cat, params.page, params.size, params.visa, params.language, params.married]);

  return { list, loading, error };
}
