export type Notice = {
  id: string;
  category: string; // 한글 라벨(교육, 의료 등)
  type: string;     // tags 한글 + (조건부) '기간제'
  title: string;
  dept: string;     
  period: string; 
  isNew?: boolean;
  isDueSoon?: boolean;
  isPeriodLimited?: boolean;
};

// ==== 백엔드 응답 타입 & 매핑 유틸(①) ====
export type BackendNotice = {
  id: number;
  title: string;
  category:
    | 'ADMINSTRATIION' // 오타임?
    | 'ADMINISTRATION'
    | 'MEDICAL'
    | 'HOUSING'
    | 'EMPLOYMENT'
    | 'EDUCATION'
    | 'LIFE_SUPPORT';
  organization: string | null;
  sourceUrl: string | null;
  applyStartAt: string | null;
  applyEndAt: string | null;  
  eligibility: string | null; 
  tags: 'BENEFIT' | 'SYSTEM' | 'PROGRAM' | null; 
  isPeriodLimited: boolean; 
};

const CATEGORY_KO: Record<string, string> = {
  ADMINSTRATIION: '행정', 
  ADMINISTRATION: '행정',
  MEDICAL: '의료',
  HOUSING: '주거',
  EMPLOYMENT: '취업/근로',
  EDUCATION: '교육',
  LIFE_SUPPORT: '생활 지원',
};

const TAG_KO: Record<'BENEFIT' | 'SYSTEM' | 'PROGRAM', string> = {
  BENEFIT: '혜택',
  SYSTEM: '제도',
  PROGRAM: '프로그램',
};

// YY.MM.DD 포맷
function fmtDate(iso: string): string {
  const d = new Date(iso);            // ISO가 로컬로 파싱
  const yy = String(d.getFullYear() % 100).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;        
}

function buildPeriod(start: string | null, end: string | null): string {
  if (start && end) return `${fmtDate(start)}~${fmtDate(end)}`;
  return '-';
}

export function mapBackendToNotice(dto: BackendNotice): Notice {
  const categoryKo = CATEGORY_KO[dto.category] ?? dto.category;
  const tagKo = dto.tags ? TAG_KO[dto.tags] : '';

  return {
    id: String(dto.id),
    category: categoryKo,
    type: tagKo,
    title: dto.title,
    dept: dto.eligibility ?? '',
    period: buildPeriod(dto.applyStartAt, dto.applyEndAt),
    isNew: false,
    isDueSoon: false,
    isPeriodLimited: !!dto.isPeriodLimited,
  };
}

export function mapBackendList(list: BackendNotice[]): Notice[] {
  return list.map(mapBackendToNotice);
}

// ==== 사용 예시(③) - 필요하면 백엔드 응답을 여기서 바로 매핑해 export ====

const apiDataMock: BackendNotice[] = [
  {
    id: 1,
    title: '국내 장기체류 아동 교육권 보장을 위한 체류자격 부여 방안',
    category: 'EDUCATION',
    organization: '교육부',
    sourceUrl: 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=95184',
    applyStartAt: '2025-04-01T09:00:00',
    applyEndAt: '2028-03-31T18:00:00',
    eligibility: '아동(7세~18세)',
    tags: 'SYSTEM',
    isPeriodLimited: true,
  },
  {
    id: 2,
    title: '청년 창업 지원 사업 모집',
    category: 'EMPLOYMENT',
    organization: '중소벤처기업부',
    sourceUrl:
      'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1234567',
    applyStartAt: '2024-01-15T09:00:00',
    applyEndAt: '2024-02-15T18:00:00',
    eligibility: '만 18세~39세 청년',
    tags: 'BENEFIT',
    isPeriodLimited: true,
  },
  {
    id: 3,
    title: '저소득층 의료비 지원 프로그램',
    category: 'MEDICAL',
    organization: '보건복지부',
    sourceUrl:
      'https://www.mohw.go.kr/react/policy/index.jsp?PAR_MENU_ID=06&MENU_ID=06350101',
    applyStartAt: null,
    applyEndAt: null,
    eligibility: '기준중위소득 50% 이하',
    tags: 'PROGRAM',
    isPeriodLimited: false,
  },
  {
    id: 4,
    title: '신혼부부 임대주택 입주자 모집',
    category: 'HOUSING',
    organization: 'LH 한국토지주택공사',
    sourceUrl: 'https://www.lh.or.kr/contents/cont.do?sMenuId=LH_030202',
    applyStartAt: '2024-01-10T10:00:00',
    applyEndAt: '2024-01-25T17:00:00',
    eligibility: '혼인 7년 이내 신혼부부',
    tags: null,
    isPeriodLimited: true,
  },
  {
    id: 5,
    title: '노인 돌봄 제도 개편 안내',
    category: 'LIFE_SUPPORT',
    organization: '보건복지부',
    sourceUrl: 'https://www.mohw.go.kr/react/policy/index.jsp',
    applyStartAt: null,
    applyEndAt: null,
    eligibility: '만 65세 이상',
    tags: 'SYSTEM',
    isPeriodLimited: false,
  },
  {
    id: 6,
    title: '외국인 등록 및 체류 관련 행정 서비스',
    category: 'ADMINISTRATION',
    organization: '법무부 출입국·외국인정책본부',
    sourceUrl: 'https://www.immigration.go.kr/immigration/1569/subview.do',
    applyStartAt: null,
    applyEndAt: null,
    eligibility: '국내 체류 외국인',
    tags: null,
    isPeriodLimited: false,
  },
  {
    id: 7,
    title: '외국인 등록 및 체류 관련 행정 서비스',
    category: 'ADMINISTRATION',
    organization: '법무부 출입국·외국인정책본부',
    sourceUrl: 'https://www.immigration.go.kr/immigration/1569/subview.do',
    applyStartAt: null,
    applyEndAt: null,
    eligibility: '국내 체류 외국인',
    tags: null,
    isPeriodLimited: false,
  },
  {
    id: 8,
    title: '외국인 등록 및 체류 관련 행정 서비스',
    category: 'ADMINISTRATION',
    organization: '법무부 출입국·외국인정책본부',
    sourceUrl: 'https://www.immigration.go.kr/immigration/1569/subview.do',
    applyStartAt: null,
    applyEndAt: null,
    eligibility: '국내 체류 외국인',
    tags: null,
    isPeriodLimited: false,
  },
];

// 화면에서 바로 사용할 리스트
export const latest: Notice[] = mapBackendList(apiDataMock);

export const dueSoon: Notice[] = latest.map((n, i) => ({
  ...n,
  id: `d${i + 1}`,
  isDueSoon: true,
}));
