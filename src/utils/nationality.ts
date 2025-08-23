export const nationalityMap: Record<string, string> = {
  한국: 'KO',
  미국: 'EN',
  우즈베키스탄: 'UZ',
  일본: 'JA',
  중국: 'ZH',
  태국: 'TH',
  베트남: 'VI',
};

export const getNationalityCode = (nationality: string) =>
  nationalityMap[nationality] || 'UNKNOWN';
