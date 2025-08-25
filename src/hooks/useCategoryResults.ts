import * as React from 'react';
import { fetchJSON } from '../apis/api';
import type { CategoryCode } from '../types/category';
import type { BackendNotice, Notice } from '../data/notices';
import { mapBackendList } from '../data/notices';

const DEBUG = true;
// dev에서만 true, 배포는 false 권장
const DEBUG_PROBE = true;

type Params = {
  cat: CategoryCode;
  page?: number;
  size?: number;
  visa?: string; // 언더스코어 포맷(D_2 등)만 전달된다고 가정
  married?: boolean; // ⚠️ UI 용도로만 받음. 요청에는 포함하지 않음(IGNORED)
};

const pick = (res: any): BackendNotice[] => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.postings)) return res.postings;
  const f = res?.data ?? res?.content ?? res?.list ?? [];
  return Array.isArray(f) ? f : [];
};

// 백엔드 카테고리 정규화 (오탈자/대소문자 방지)
function normalizeCategory(x: unknown): CategoryCode | null {
  const up = String(x ?? '')
    .toUpperCase()
    .trim();
  const fixed = up === 'ADMINSTRATION' ? 'ADMINISTRATION' : up;
  const allowed: Record<string, CategoryCode> = {
    ADMINISTRATION: 'ADMINISTRATION',
    MEDICAL: 'MEDICAL',
    HOUSING: 'HOUSING',
    EMPLOYMENT: 'EMPLOYMENT',
    EDUCATION: 'EDUCATION',
    LIFE_SUPPORT: 'LIFE_SUPPORT',
  };
  return allowed[fixed] ?? null;
}

const VISA_RE = /^(C|D|E|F|G|H)_[0-9]+$/;

const qs = (o: Record<string, any>) => {
  const u = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'string' && v.trim() === '') return;
    u.set(k, typeof v === 'boolean' ? String(v) : String(v));
  });
  return u.toString();
};

// married는 더 이상 받지 않도록 타입을 좁힘
async function fetchCategory(
  base: { category: CategoryCode; page: number; size: number; visa?: string },
  signal: AbortSignal,
): Promise<BackendNotice[]> {
  const url = `/api/postings/category?${qs(base)}`;
  if (DEBUG) console.log('[useCategoryResults] 🚀 GET', url, 'params:', base);
  const res = await fetchJSON(url, { signal });
  const items = pick(res);
  if (DEBUG) {
    console.log(
      '[useCategoryResults] 📡 RESP count:',
      items.length,
      'raw response:',
      res,
    );
    console.log(
      '[useCategoryResults] 📋 Sample items:',
      items.slice(0, 3).map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        eligibility: item.eligibility,
      })),
    );
  }
  return items;
}

export function useCategoryResults(params: Params) {
  const [list, setList] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // 🚦 비자 값은 언더스코어 포맷만 허용
        const visaParam =
          typeof params.visa === 'string' && VISA_RE.test(params.visa)
            ? params.visa
            : undefined;

        if (DEBUG && params.visa && !visaParam) {
          console.warn(
            '[useCategoryResults] ⚠️ invalid visa format (expect C_4,D_2,...):',
            params.visa,
          );
        }

        // ⚠️ married는 UI 유지용으로만 받고, 실제 요청에는 포함하지 않는다.
        const base = {
          category: params.cat,
          page: params.page ?? 0,
          size: params.size ?? 50,
          visa: visaParam,
          // married: ❌ 제외
        };

        if (DEBUG) {
          console.log('[useCategoryResults] 🔧 Processed params:', {
            original: params,
            processed: base,
            visaValid: !!visaParam,
            marriedIgnored: params.married, // 디버그용 노출만
          });
        }

        // 1) 실제 요청 (추가 strict 필터 전)
        const got = await fetchCategory(base as any, ac.signal);

        // 2) 카테고리 정규화 기반 strict 필터 + 0건 폴백
        const strict = got.filter(
          (n) => normalizeCategory(n.category) === params.cat,
        );
        const finalItems = strict.length > 0 ? strict : got;

        if (DEBUG) {
          console.log('[useCategoryResults] 🎯 Filtering result:', {
            rawCount: got.length,
            strictCount: strict.length,
            finalCount: finalItems.length,
            fallbackUsed: strict.length === 0 && got.length > 0,
            cat: params.cat,
            sample: finalItems.slice(0, 3).map((x) => ({
              id: x.id,
              title: x.title,
              category: x.category,
              eligibility: x.eligibility,
            })),
          });
        }

        // (선택) 탐침: 이제 married는 제외되므로 visa only만 확인
        if (DEBUG && DEBUG_PROBE && base.visa !== undefined) {
          try {
            const onlyVisa = await fetchCategory({ ...base }, ac.signal);
            console.log('[probe] 🔍 visa only →', onlyVisa.length, {
              visa: base.visa,
            });
          } catch (e) {
            console.warn('[probe] visa only error:', e);
          }
        }

        // 매핑
        const mappedItems = mapBackendList(finalItems);
        if (DEBUG) {
          console.log('[useCategoryResults] 🗺️ Mapping result:', {
            beforeMapping: finalItems.length,
            afterMapping: mappedItems.length,
            sampleMapped: mappedItems.slice(0, 2).map((n) => ({
              id: n.id,
              title: n.title,
              category: n.category,
              period: n.period,
            })),
          });
        }

        if (!ac.signal.aborted) setList(mappedItems);
      } catch (e: any) {
        if (!ac.signal.aborted) {
          console.error('[useCategoryResults] ❌ ERROR', e);
          setError(e?.message ?? String(e));
          setList([]);
        }
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
    // ⬇️ married는 이제 무시되므로 의존성 제거
  }, [params.cat, params.page, params.size, params.visa]);

  // 최종 상태 디버깅
  React.useEffect(() => {
    if (!DEBUG) return;
    console.log('[useCategoryResults] 🏁 Final State:', {
      listLength: list.length,
      loading,
      error,
      params: {
        cat: params.cat,
        visa: params.visa,
        marriedIgnored: params.married,
      },
    });
  }, [list.length, loading, error, params.cat, params.visa, params.married]);

  return { list, loading, error };
}
