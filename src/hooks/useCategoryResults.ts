import * as React from 'react';
import { fetchJSON } from '../apis/api'; // ⬅️ 여기!
import type { CategoryCode } from '../types/category';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';
import {
  buildQS,
  normalizeVisa,
  normalizeCategoryParam,
} from '../utils/shared';

type Language = 'KO' | 'EN' | 'UZ' | 'JA' | 'ZH' | 'TH' | 'VI';

type Params = {
  cat: CategoryCode;
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

  React.useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    const categoryParam = normalizeCategoryParam(params.cat);

    const url =
      `/api/postings/category?` +
      buildQS({
        category: categoryParam,
        page: typeof params.page === 'number' ? params.page : undefined,
        size: typeof params.size === 'number' ? params.size : undefined,
        visa: normalizeVisa(params.visa),
        language: params.language,
        married:
          typeof params.married === 'boolean' ? params.married : undefined,
      });

    (async () => {
      try {
        // 서버가 배열을 바로 주거나, {data|content|list} 래퍼로 줄 수 있음 → 형태 방어
        const res: any = await fetchJSON(url, { signal: ac.signal });
        const payload = Array.isArray(res)
          ? res
          : (res?.data ?? res?.content ?? res?.list ?? []);
        const arr: BackendNotice[] = Array.isArray(payload) ? payload : [];

        // 혹시 섞여 올 수 있어 한 번 더 필터(정규화 비교)
        const filtered = arr.filter(
          (n) => normalizeCategoryParam(n?.category as any) === categoryParam,
        );

        if (!ac.signal.aborted) {
          setList(mapBackendList(filtered.length ? filtered : arr));
          setLoading(false);
        }
      } catch (e: any) {
        if (e?.name === 'AbortError') return; // StrictMode에서 정상 발생 → 무시
        setError(e?.message ?? String(e));
        setList([]);
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [
    params.cat,
    params.page,
    params.size,
    params.visa,
    params.language,
    params.married,
  ]);

  return { list, loading, error };
}
