import * as React from 'react';
import { fetchJSON } from '../apis/api';
import type { CategoryCode } from '../types/category';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';

const DEBUG = true;
// 개발 중에만 탐침: 배포시 false로
const DEBUG_PROBE = true;

type Params = {
  cat: CategoryCode;
  page?: number;
  size?: number;
  visa?: string; // 언더스코어만(E_7)
  married?: boolean; // true/false
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

const toUnderscoreVisa = (v?: string) =>
  v ? v.replace(/-/g, '_').toUpperCase().replace(/\s+/g, '') : undefined;

async function fetchCategory(
  base: {
    category: CategoryCode;
    page: number;
    size: number;
    visa?: string;
    married?: boolean;
  },
  signal: AbortSignal,
): Promise<BackendNotice[]> {
  const url = `/api/postings/category?${qs(base)}`;
  if (DEBUG) console.log('[useCategoryResults] GET', url, 'params:', base);
  const res = await fetchJSON(url, { signal });
  const items = pick(res);
  if (DEBUG)
    console.log('[useCategoryResults] RESP count:', items.length, 'raw:', res);
  return items;
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
        const base = {
          category: params.cat,
          page: params.page ?? 0,
          size: params.size ?? 50,
          visa: toUnderscoreVisa(params.visa) || undefined,
          married:
            typeof params.married === 'boolean' ? params.married : undefined,
        };

        if (DEBUG) {
          console.log('[useCategoryResults] REQUEST BASE', base);
          if (base.visa && !/^(C|D|E|F|G|H)_[0-9]+$/.test(base.visa)) {
            console.warn(
              '[useCategoryResults] ⚠️ visa 형식(언더스코어)이 아님:',
              base.visa,
            );
          }
        }

        // 1) 실제 요청 (현재 UI의 조합 그대로)
        const got = await fetchCategory(base, ac.signal);
        const strict = got.filter((n) => n.category === params.cat);
        if (DEBUG) {
          console.log('[useCategoryResults] STRICT count:', strict.length, {
            category: params.cat,
            sample: strict
              .slice(0, 3)
              .map((x) => ({ id: x.id, title: x.title })),
          });
          if (strict.length === 0) {
            console.log('[useCategoryResults] 🔎 zero-result context', {
              sentVisa: base.visa,
              sentMarried: base.married,
              note: '서버 필터 미적용/데이터 부재 가능성. 아래 probe 결과 참고.',
            });
          }
        }

        // 2) 🔍 탐침 요청 (원인 분리)
        if (
          DEBUG &&
          DEBUG_PROBE &&
          (base.visa !== undefined || base.married !== undefined)
        ) {
          // (a) 비자만
          try {
            const onlyVisa = await fetchCategory(
              {
                category: base.category,
                page: base.page,
                size: base.size,
                visa: base.visa,
                married: undefined,
              },
              ac.signal,
            );
            console.log('[probe] visa only → count:', onlyVisa.length, {
              visa: base.visa,
              married: undefined,
            });
          } catch (e) {
            console.warn('[probe] visa only error:', e);
          }

          // (b) 결혼만
          try {
            const onlyMarried = await fetchCategory(
              {
                category: base.category,
                page: base.page,
                size: base.size,
                visa: undefined,
                married: base.married,
              },
              ac.signal,
            );
            console.log('[probe] married only → count:', onlyMarried.length, {
              visa: undefined,
              married: base.married,
            });
          } catch (e) {
            console.warn('[probe] married only error:', e);
          }
        }

        if (!ac.signal.aborted) setList(mapBackendList(strict));
      } catch (e: any) {
        if (!ac.signal.aborted) {
          console.error('[useCategoryResults] ERROR', e);
          setError(e?.message ?? String(e));
          setList([]);
        }
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [params.cat, params.page, params.size, params.visa, params.married]);

  return { list, loading, error };
}
