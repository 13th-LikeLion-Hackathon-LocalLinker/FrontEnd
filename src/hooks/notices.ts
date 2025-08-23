import * as React from 'react';
import { fetchJSONOrMock } from '../apis/api';
import type { BackendNotice, Notice } from '../data/notices';
import {
  mapBackendList,
  mapBackendToNotice,
  MOCK_BACKEND_LATEST,
} from '../data/notices';
import type { CategoryCode } from '../types/category';

const toTime = (iso: string | null) => (iso ? new Date(iso).getTime() : NaN);
const normCat = (v: string | null | undefined): CategoryCode | null => {
  if (!v) return null;
  const u = String(v).toUpperCase();
  if (u === 'ADMINSTRATION' || u === 'ADMINSTRATIION') return 'ADMINISTRATION';
  return u as CategoryCode;
};

function useFetch<T>(url: string, deps: React.DependencyList = []) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [usedMock, setUsedMock] = React.useState(false);

  const run = React.useCallback(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    setUsedMock(false);

    fetchJSONOrMock<T>(url, { signal: ac.signal }, null as unknown as T) // mock은 각 훅에서 주입
      .then(({ data, usedMock }) => {
        setData(data);
        setUsedMock(usedMock);
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [url]);

  React.useEffect(run, deps); // eslint-disable-line react-hooks/exhaustive-deps
  const refetch = React.useCallback(() => run(), [run]);
  return { data, loading, error, usedMock, refetch };
}

// === 최신
export function useLatestNotices(limit = 50) {
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

// === 임박
export function useDueSoonNotices(limit = 200) {
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

// === 카테고리
export function useCategoryNotices(cat: CategoryCode, limit = 200) {
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
  }, [cat, limit]);

  const list: Notice[] = React.useMemo(() => {
    const filtered = (data ?? []).filter((n) => normCat(n.category) === cat);
    return filtered.map(mapBackendToNotice);
  }, [data, cat]);

  return { list, loading, error, usedMock };
}
