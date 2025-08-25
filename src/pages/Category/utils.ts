import { normalizeVisa } from '../../utils/shared';

// 언더스코어 포맷으로 강제 (예: D_2, E_7)
export const toVisaParam = (visaValue?: string): string | undefined => {
  if (!visaValue) return undefined;
  const n = normalizeVisa(visaValue) || visaValue;
  return n.trim().toUpperCase().replace(/-/g, '_').replace(/\s+/g, '');
};
