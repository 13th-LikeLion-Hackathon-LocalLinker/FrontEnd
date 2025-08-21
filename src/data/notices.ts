export type Notice = {
  id: string;
  category: string; // 교육, 의료 등
  type: string; // 기관명 등 라벨
  title: string;
  dept: string; // 담당부서
  period: string; // 접수기간
  isNew?: boolean;
  isDueSoon?: boolean;
};

export const latest: Notice[] = [
  {
    id: 'n1',
    category: '교육',
    type: '기관',
    title: '국내 정기거주 아동 교육권 보장을 위한 체류자격 부여 방안',
    dept: '대외협력과 · 다문화팀',
    period: '25.04.01–28.03.31',
    isNew: true,
  },
  {
    id: 'n2',
    category: '교육',
    type: '기관',
    title: '국내 정기거주 아동 교육권 보장을 위한 체류자격 부여 방안',
    dept: '대외협력과 · 다문화팀',
    period: '25.04.01–28.03.31',
  },
  {
    id: 'n3',
    category: '교육',
    type: '기관',
    title: '국내 정기거주 아동 교육권 보장을 위한 체류자격 부여 방안',
    dept: '대외협력과 · 다문화팀',
    period: '25.04.01–28.03.31',
  },
];

export const dueSoon: Notice[] = latest.map((n, i) => ({
  ...n,
  id: `d${i + 1}`,
  isDueSoon: true,
}));
