// src/hooks/useCategoryResults.ts
import * as React from 'react';
import { fetchJSONOrMock } from '../apis/api';
import type { CategoryCode } from '../types/category';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList, MOCK_BACKEND_LATEST } from '../data/notices';
import { buildQS, normalizeVisa } from '../utils/shared';

type Language = 'KO' | 'EN' | 'UZ' | 'JA' | 'ZH' | 'TH' | 'VI';

type Params = {
  cat: CategoryCode; // "ADMINSTRATION" | "MEDICAL" | ...
  page?: number;
  size?: number;
  visa?: string;
  language?: Language;
  married?: boolean;
};

export function useCategoryResults(params: Params) {
  const [list, setList] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [usedMock, setUsedMock] = React.useState(false);

  React.useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    setUsedMock(false);

    const url =
      `/api/postings/category?` +
      buildQS({
        category: params.cat,
        page: typeof params.page === 'number' ? params.page : undefined,
        size: typeof params.size === 'number' ? params.size : undefined,
        visa: normalizeVisa(params.visa),
        language: params.language,
        married:
          typeof params.married === 'boolean' ? params.married : undefined,
      });

    fetchJSONOrMock<BackendNotice[]>(
      url,
      { signal: ac.signal },
      MOCK_BACKEND_LATEST,
    )
      .then(({ data, usedMock }) => {
        setUsedMock(usedMock);
        const raw = usedMock
          ? (data ?? []).filter((n) => n.category === params.cat) // 목업: 카테고리만 반영
          : (data ?? []);
        setList(mapBackendList(raw));
      })
      .catch((e) => {
        console.warn(
          '[useCategoryResults] fallback to MOCK due to error:',
          (e as Error)?.message,
        );
        const raw = MOCK_BACKEND_LATEST.filter(
          (n) => n.category === params.cat,
        );
        setList(mapBackendList(raw));
        setError(null);
        setUsedMock(true);
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [
    params.cat,
    params.page,
    params.size,
    params.visa,
    params.language,
    params.married,
  ]);

  return { list, loading, error, usedMock };
}
