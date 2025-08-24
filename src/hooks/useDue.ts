import * as React from 'react';
import { fetchJSON } from '../apis/api';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendToNotice } from '../data/notices';

const hasEnd = (s: string | null | undefined) => !!(s && String(s).trim());

// 날짜만 온 경우는 그날의 끝(23:59:59.999)로 보정
const toEndTsInclusive = (iso: string): number => {
  const hasTime = /T\d{2}:\d{2}/.test(iso);
  const isMidnightish = /T?00:00:00(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(iso);

  if (!hasTime || isMidnightish) {
    const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1, 23, 59, 59, 999).getTime();
  }
  return new Date(iso).getTime();
};

export function useDue(limit = 200) {
  const [list, setList] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res: any = await fetchJSON(`/api/postings/latest?limit=${limit}`, {
          signal: ac.signal,
        });

        const payload = Array.isArray(res)
          ? res
          : (res?.data ?? res?.content ?? res?.list ?? []);
        const arr: BackendNotice[] = Array.isArray(payload) ? payload : [];

        const due: Notice[] = arr
          .filter((n) => hasEnd(n.applyEndAt)) // ✅ 기준: applyEndAt만 있으면 포함
          .map((n) => ({ dto: n, endTs: toEndTsInclusive(n.applyEndAt as string) }))
          .filter((x) => Number.isFinite(x.endTs))
          .sort((a, b) => (a.endTs as number) - (b.endTs as number)) // 임박 순
          .map((x) => mapBackendToNotice(x.dto));

        if (!ac.signal.aborted) {
          setList(due);
          setLoading(false);
        }
      } catch (e: any) {
        if (e?.name === 'AbortError') return;
        setError(e?.message ?? String(e));
        setList([]);
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [limit]);

  return { list, loading, error };
}
