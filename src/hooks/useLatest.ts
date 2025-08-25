// src/hooks/useLatest.ts
import * as React from 'react';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';
import { collectAllCategories, latestScore } from '../utils/postings';

type LatestFilters = {
  visa?: string; // D_2 / E_7 … (언더스코어). nation/married 제외(UI-only)
};

export function useLatest(
  pageSize = 200,
  maxPages = 50,
  filters?: LatestFilters,
) {
  const [list, setList] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const raw: BackendNotice[] = await collectAllCategories(
          pageSize,
          maxPages,
          filters?.visa,
        );

        if (cancelled) return;
        const sorted = raw.sort((a, b) => latestScore(b) - latestScore(a));
        setList(mapBackendList(sorted));
        setLoading(false);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? String(e));
        setList([]);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pageSize, maxPages, filters?.visa]); // visa만 의존

  return { list, loading, error };
}
