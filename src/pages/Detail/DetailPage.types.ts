interface DetailPageProps {
  id: number;
  title: string;
  category:
    | 'ADMINISTRATION'
    | 'MEDICAL'
    | 'EDUCATION'
    | 'HOUSING'
    | 'EMPLOYMENT'
    | 'EDUCATION'
    | 'LIFE_SUPPORT';
  sourceUrl: string;
  applyStartAt: string | null;
  applyEndAt: string | null;
  eligibility: string;
  tags: string;
  isPeriodLimited: boolean;
  detail: string;
}

export type { DetailPageProps };
