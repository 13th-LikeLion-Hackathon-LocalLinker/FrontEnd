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
  onSubmit?: () => void;
  visaOptions: readonly Option[] | Option[];
  nationalities: readonly Option[] | Option[];
};
