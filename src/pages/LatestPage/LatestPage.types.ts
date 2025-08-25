import type { MarriedStr } from '../../utils/onboarding';

export type FilterFormState = {
  visa: string;
  nation: string;
  married: MarriedStr; // 'true' | 'false' | ''
};

export interface LatestPageProps {
  pageSize?: number;
  maxPages?: number;
}
