// src/pages/Category/components/types/FilterPanel.ts

import type { MarriedStr } from '../../utils/onboarding';

export type Option = { label: string; value: string };

export type FilterPanelProps = {
  visa: string;
  nation: string;
  married: MarriedStr;
  onChange: (
    patch: Partial<Pick<FilterPanelProps, 'visa' | 'nation' | 'married'>>,
  ) => void;
  onReset: () => void;
  visaOptions: readonly Option[];
  nationalities: readonly Option[];
};
