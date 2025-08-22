import * as React from 'react';
import { fetchJSON } from '../apis/api'; 
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList, mapBackendToNotice } from '../data/notices';
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

  const run = React.useCallback(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    fetchJSON<T>(url, { signal: ac.signal })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [url]);

  React.useEffect(run, deps);
  const refetch = React.useCallback(() => run(), [run]);

  return { data, loading, error, refetch };
}

export function useLatestNotices(limit = 50) {
  const { data, loading, error, refetch } = useFetch<BackendNotice[]>(
    `/api/postings/latest?limit=${limit}`,
    [limit],
  );
  const list: Notice[] = React.useMemo(
    () => mapBackendList(data ?? []),
    [data],
  );
  return { list, loading, error, refetch };
}

export function useDueSoonNotices(limit = 200) {
  const { data, loading, error, refetch } = useFetch<BackendNotice[]>(
    `/api/postings/latest?limit=${limit}`,
    [limit],
  );

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

  return { list, loading, error, refetch };
}

export function useCategoryNotices(cat: CategoryCode, limit = 200) {
  const { data, loading, error, refetch } = useFetch<BackendNotice[]>(
    `/api/postings/latest?limit=${limit}`,
    [cat, limit],
  );

  const list: Notice[] = React.useMemo(() => {
    const filtered = (data ?? []).filter((n) => normCat(n.category) === cat);
    return filtered.map(mapBackendToNotice);
  }, [data, cat]);

  return { list, loading, error, refetch };
}
