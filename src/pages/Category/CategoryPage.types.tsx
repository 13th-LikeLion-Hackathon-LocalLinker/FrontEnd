import type { MarriedStr } from '../../utils/onboarding';

export type SortKey = 'due' | 'latest';

export type FilterState = {
  visa: string;
  nation: string;
  married: MarriedStr;
};
