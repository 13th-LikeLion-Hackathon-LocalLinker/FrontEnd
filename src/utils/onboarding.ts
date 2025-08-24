export type MarriedStr = '' | 'true' | 'false';

/** 여러 키 중 먼저 존재하는 로컬스토리지 값을 반환 */
function readLS(keys: string[]): string | null {
  for (const k of keys) {
    const v = localStorage.getItem(k);
    if (v && v !== 'null' && v !== 'undefined') return v;
  }
  return null;
}

export function loadOnboardingFilters(): {
  visa: string;
  nation: string;
  married: MarriedStr;
} {
  const visa = readLS(['onboardingVisa', 'visa']) ?? '';
  const nation = readLS(['onboardingNation', 'nation']) ?? '';
  const marriedRaw = readLS(['onboardingMarried', 'married']);
  const married: MarriedStr =
    marriedRaw === 'true' ? 'true' : marriedRaw === 'false' ? 'false' : '';
  return { visa, nation, married };
}

/** 국적 → 언어코드 (백엔드 language 파라미터용) */
export const NATION_TO_LANGUAGE: Record<
  string,
  'KO' | 'EN' | 'UZ' | 'JA' | 'ZH' | 'TH' | 'VI'
> = {
  미국: 'EN',
  중국: 'ZH',
  베트남: 'VI',
  태국: 'TH',
  일본: 'JA',
  우즈베키스탄: 'UZ',
  // 필요 시 더 추가
};
