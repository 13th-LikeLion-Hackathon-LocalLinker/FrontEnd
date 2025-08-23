// src/hooks/useDueSoonNotices.ts
// 마감임박
import * as React from 'react';
import { fetchJSONOrMock } from '../apis/api';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendToNotice, MOCK_BACKEND_LATEST } from '../data/notices';

const toTime = (iso: string | null) => (iso ? new Date(iso).getTime() : NaN);

export function useDue(limit = 200) {
  const [data, setData] = React.useState<BackendNotice[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [usedMock, setUsedMock] = React.useState(false);

  React.useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    setUsedMock(false);

    fetchJSONOrMock<BackendNotice[]>(
      `/api/postings/latest?limit=${limit}`,
      { signal: ac.signal },
      MOCK_BACKEND_LATEST,
    )
      .then(({ data, usedMock }) => {
        setData(data);
        setUsedMock(usedMock);
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [limit]);

  const list: Notice[] = React.useMemo(() => {
    const now = Date.now();
    return (data ?? [])
      .filter((n) => n.isPeriodLimited && !!n.applyEndAt)
      .filter((n) => {
        const end = toTime(n.applyEndAt);
        return !Number.isNaN(end) && end >= now;
      })
      .sort((a, b) => toTime(a.applyEndAt!) - toTime(b.applyEndAt!))
      .map(mapBackendToNotice);
  }, [data]);

  return { list, loading, error, usedMock };
}
