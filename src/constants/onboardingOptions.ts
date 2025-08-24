// 비자: 예: E-7 → E_7
// 국적: 국가명이 아니라 언어코드(KO, EN, UZ, JA, ZH, TH, VI)

export const VISA_OPTIONS: readonly { label: string; value: string }[] = [
  { label: '단기 취업(C-4)', value: 'C_4' },
  { label: '유학(D-2)', value: 'D_2' },
  { label: '어학연수(D-4)', value: 'D_4' },
  { label: '구직(D-10)', value: 'D_10' },
  { label: '취업(E-7)', value: 'E_7' },
  { label: '비전문 취업 (E-9)', value: 'E_9' },
  { label: '방문동거(F-1)', value: 'F_1' },
  { label: '거주(F-2)', value: 'F_2' },
  { label: '동반(F-3)', value: 'F_3' },
  { label: '재외동포(F-4)', value: 'F_4' },
  { label: '영주(F-5)', value: 'F_5' },
  { label: '결혼 이민(F-6)', value: 'F_6' },
  { label: '방문취업(H-2)', value: 'H_2' },
  { label: '기타(G-1)', value: 'G_1' },
];

export const NATIONALITIES: readonly { label: string; value: string }[] = [
  { label: '미국', value: 'EN' },
  { label: '중국', value: 'ZH' },
  { label: '베트남', value: 'VI' },
  { label: '태국', value: 'TH' },
  { label: '일본', value: 'JA' },
  { label: '우즈베키스탄', value: 'UZ' },
];
