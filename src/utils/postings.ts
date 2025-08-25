// src/lib/postings.ts
import { fetchJSON } from '../apis/api';
import type { BackendNotice } from '../data/notices';
import type { CategoryCode } from '../types/category';

export const CATS: CategoryCode[] = [
  'ADMINISTRATION',
  'MEDICAL',
  'HOUSING',
  'EMPLOYMENT',
  'EDUCATION',
  'LIFE_SUPPORT',
];

export const LANGS = ['KO', 'EN', 'UZ', 'JA', 'ZH', 'TH', 'VI'] as const;

export const qs = (o: Record<string, unknown>) => {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(o)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'string' && v.trim() === '') continue;
    u.set(k, String(v));
  }
  return u.toString();
};

export const unpack = (res: any) => {
  if (Array.isArray(res?.postings)) {
    return {
      items: res.postings as BackendNotice[],
      hasNext: !!res.hasNext,
      totalPages:
        typeof res.totalPages === 'number' ? res.totalPages : undefined,
    };
  }
  if (Array.isArray(res)) return { items: res as BackendNotice[] };
  const f = res?.data ?? res?.content ?? res?.list ?? [];
  return { items: Array.isArray(f) ? (f as BackendNotice[]) : [] };
};

export const ts = (s: string | null) => (s ? new Date(s).getTime() : NaN);
export const latestScore = (n: BackendNotice) =>
  Math.max(ts(n.applyStartAt), ts(n.applyEndAt));

export async function collectCategoryAll(
  cat: CategoryCode,
  pageSize: number,
  maxPages: number,
  visa?: string, // ← 비자만 필터로 사용
) {
  const byId = new Map<number, BackendNotice>();
  for (const lang of LANGS) {
    for (let page = 0; page < maxPages; page += 1) {
      let res: any;
      try {
        res = await fetchJSON(
          `/api/postings/category?${qs({ category: cat, size: pageSize, page, language: lang, visa })}`,
        );
      } catch {
        break;
      }
      const { items, hasNext, totalPages } = unpack(res);
      if (!items.length) break;
      items.forEach((n) => byId.set(n.id, n));
      if (hasNext === false || (totalPages && page + 1 >= totalPages)) break;
    }
  }
  return Array.from(byId.values());
}

export async function collectAllCategories(
  pageSize: number,
  maxPages: number,
  visa?: string,
) {
  const byId = new Map<number, BackendNotice>();
  for (const cat of CATS) {
    const chunk = await collectCategoryAll(cat, pageSize, maxPages, visa);
    chunk.forEach((n) => byId.set(n.id, n));
  }
  return Array.from(byId.values());
}
