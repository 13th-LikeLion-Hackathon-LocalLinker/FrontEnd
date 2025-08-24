// 최신 공고
import * as React from 'react';
import { fetchJSON } from '../apis/api';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';

export function useLatest(limit = 50) {
  const [list, setList] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res: any = await fetchJSON(
          `/api/postings/latest?limit=${limit}`,
          {
            signal: ac.signal,
          },
        );

        // 응답 형태 방어: [], {data}, {content}, {list} 모두 수용
        const payload = Array.isArray(res)
          ? res
          : (res?.data ?? res?.content ?? res?.list ?? []);
        const arr: BackendNotice[] = Array.isArray(payload) ? payload : [];

        if (!ac.signal.aborted) {
          setList(mapBackendList(arr)); // BackendNotice[] -> Notice[]
          setLoading(false);
        }
      } catch (e: any) {
        if (e?.name === 'AbortError') return; // 개발모드 StrictMode에서 정상
        setError(e?.message ?? String(e));
        setList([]);
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [limit]);

  return { list, loading, error };
}
