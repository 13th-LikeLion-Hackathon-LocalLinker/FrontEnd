import * as React from 'react';
import { fetchJSON } from '../apis/api';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';

/** 응답 배열 꺼내기(래핑 방어) */
const unpackArray = (res: any): BackendNotice[] => {
  if (Array.isArray(res)) return res as BackendNotice[];
  if (Array.isArray(res?.items)) return res.items as BackendNotice[];
  if (Array.isArray(res?.postings)) return res.postings as BackendNotice[];
  if (Array.isArray(res?.data)) return res.data as BackendNotice[];
  if (Array.isArray(res?.content)) return res.content as BackendNotice[];
  if (Array.isArray(res?.list)) return res.list as BackendNotice[];
  return [];
};

type Variant = {
  sizeKey: string;
  pageKey: string;
  start: number; // 첫 페이지 번호
  zeroBased: boolean; // true: 0부터, false: 1부터
  label: string;
};

/** closing-soon 페이지네이션 자동 수집 (필터/정렬 없음, id 기준 dedupe) */
async function fetchClosingSoonAll(pageSize: number, maxPages: number) {
  const variants: Variant[] = [
    {
      sizeKey: 'size',
      pageKey: 'page',
      start: 0,
      zeroBased: true,
      label: 'size/page (0-based)',
    },
    {
      sizeKey: 'pageSize',
      pageKey: 'page',
      start: 0,
      zeroBased: true,
      label: 'pageSize/page (0-based)',
    },
    {
      sizeKey: 'limit',
      pageKey: 'page',
      start: 0,
      zeroBased: true,
      label: 'limit/page (0-based)',
    },
    {
      sizeKey: 'size',
      pageKey: 'pageNumber',
      start: 1,
      zeroBased: false,
      label: 'size/pageNumber (1-based)',
    },
  ];

  let best: BackendNotice[] = [];
  let bestLabel = '';

  for (const v of variants) {
    const byId = new Map<number, BackendNotice>();
    let effectiveSize = pageSize;
    let prevIdsSig = '';

    console.log('[closing-soon][variant:start]', v.label, { pageSize });

    for (let i = 0, page = v.start; i < maxPages; i++, page++) {
      const params: Record<string, any> = {};
      params[v.sizeKey] = effectiveSize;
      params[v.pageKey] = page;

      const qs = new URLSearchParams();
      Object.entries(params).forEach(([k, val]) => qs.set(k, String(val)));
      const url = `/api/postings/closing-soon?${qs.toString()}`;

      console.log('[closing-soon][request]', {
        variant: v.label,
        i,
        page,
        effectiveSize,
        url,
      });

      let res: any;
      try {
        res = await fetchJSON(url);
      } catch (e) {
        console.log('[closing-soon][request:error]', {
          variant: v.label,
          i,
          page,
          e,
        });
        break;
      }

      const items = unpackArray(res);
      const ids = items.map((x) => x.id);
      console.log('[closing-soon][response]', {
        variant: v.label,
        i,
        page,
        count: items.length,
        ids,
      });

      if (!items.length) {
        console.log('[closing-soon][end:empty]', { variant: v.label, i, page });
        break;
      }

      // 페이지 내용이 이전과 동일하면(서버가 page 무시) 종료
      const sig = JSON.stringify(ids);
      if (i > 0 && sig === prevIdsSig) {
        console.log('[closing-soon][end:repeated-page]', {
          variant: v.label,
          i,
          page,
        });
        break;
      }
      prevIdsSig = sig;

      // dedupe by id
      const before = byId.size;
      for (const n of items) byId.set(n.id, n);
      const after = byId.size;
      console.log('[closing-soon][dedupe]', {
        variant: v.label,
        i,
        page,
        added: after - before,
        uniqueSoFar: after,
      });

      // 힌트 사용(있다면)
      const hasNext =
        typeof res?.hasNext === 'boolean'
          ? (res.hasNext as boolean)
          : undefined;
      const totalPages =
        typeof res?.totalPages === 'number'
          ? (res.totalPages as number)
          : undefined;

      // 서버가 cap을 걸어 첫 응답이 요청보다 작으면, 그 크기로 보정
      if (i === 0 && items.length > 0 && items.length < effectiveSize) {
        effectiveSize = items.length;
        console.log('[closing-soon][cap-detected]', {
          variant: v.label,
          newEffectiveSize: effectiveSize,
        });
      }

      // 종료 조건
      if (hasNext === false) {
        console.log('[closing-soon][end:hasNext=false]', {
          variant: v.label,
          i,
          page,
        });
        break;
      }
      if (typeof totalPages === 'number') {
        const reached = v.zeroBased
          ? page + 1 >= totalPages
          : page >= totalPages;
        if (reached) {
          console.log('[closing-soon][end:totalPages]', {
            variant: v.label,
            i,
            page,
            totalPages,
          });
          break;
        }
      }
      if (
        hasNext === undefined &&
        totalPages === undefined &&
        items.length < effectiveSize
      ) {
        console.log('[closing-soon][end:short-page-no-hints]', {
          variant: v.label,
          i,
          page,
          got: items.length,
          expect: effectiveSize,
        });
        break;
      }
    }

    const result = Array.from(byId.values());
    console.log('[closing-soon][variant:summary]', v.label, {
      uniqueCount: result.length,
    });

    if (result.length > best.length) {
      best = result;
      bestLabel = v.label;
    }
  }

  if (best.length > 0) {
    console.log('[closing-soon][variant:chosen]', bestLabel, {
      uniqueCount: best.length,
    });
    return best;
  }

  // 모든 변형 실패 → 단건 호출만
  console.log('[closing-soon][fallback:single-call]');
  try {
    const once = unpackArray(await fetchJSON('/api/postings/closing-soon'));
    console.log('[closing-soon][fallback:single-call:result]', {
      count: once.length,
      ids: once.map((x) => x.id),
    });
    return once;
  } catch (e) {
    console.log('[closing-soon][fallback:single-call:error]', e);
    return [];
  }
}

/** 공개 훅: 페이지네이션 자동 수집 → Notice[] 매핑 */
export function useDue(pageSize = 200, maxPages = 50) {
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
        const raw = await fetchClosingSoonAll(pageSize, maxPages);
        const mapped = mapBackendList(raw);
        if (!cancelled) {
          setList(mapped);
          setLoading(false);
        }
        console.log('[closing-soon][hook:done]', {
          received: raw.length,
          mapped: mapped.length,
        });
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? String(e));
          setList([]);
          setLoading(false);
        }
        console.log('[closing-soon][hook:error]', e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pageSize, maxPages]);

  return { list, loading, error };
}
