// src/hooks/useLatestNotices.ts
// 최신 공고
import * as React from 'react';
import { fetchJSONOrMock } from '../apis/api';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList, MOCK_BACKEND_LATEST } from '../data/notices';

export function useLatest(limit = 50) {
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

  const list: Notice[] = React.useMemo(
    () => mapBackendList(data ?? []),
    [data],
  );
  return { list, loading, error, usedMock };
}
