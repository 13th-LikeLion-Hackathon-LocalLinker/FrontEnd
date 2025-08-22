export type Notice = {
  id: string;
  category: string; // 한글 라벨(교육, 의료 등)
  type: string; // tags 한글 + (조건부) '기간제'
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
    | 'ADMINSTRATION'
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
  ADMINSTRATION: '행정',
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
  const d = new Date(iso); // ISO가 로컬로 파싱
  const yy = String(d.getFullYear() % 100).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}

function buildPeriod(start: string | null, end: string | null): string {
  if (!start && !end) return '상시';
  if (start && end) return `${fmtDate(start)}~${fmtDate(end)}`;
  if (start && !end) return `${fmtDate(start)}~미정`;
  return `미정~${fmtDate(end!)}`;
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
