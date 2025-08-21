// src/types/category.ts
export const CATEGORY_CODES = [
  'ADMINISTRATION',
  'MEDICAL',
  'HOUSING',
  'EMPLOYMENT',
  'EDUCATION',
  'LIFE_SUPPORT',
] as const;

export type CategoryCode = (typeof CATEGORY_CODES)[number];

export const CATEGORY_LABELS: Record<CategoryCode, string> = {
  ADMINISTRATION: '행정',
  MEDICAL: '의료',
  HOUSING: '주거',
  EMPLOYMENT: '취업/근로',
  EDUCATION: '교육',
  LIFE_SUPPORT: '생활 지원',
};

export const DEFAULT_CATEGORY: CategoryCode = 'ADMINISTRATION';

export function isCategoryCode(v: unknown): v is CategoryCode {
  return (
    typeof v === 'string' && (CATEGORY_CODES as readonly string[]).includes(v)
  );
}
