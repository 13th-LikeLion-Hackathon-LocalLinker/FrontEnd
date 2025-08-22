import type { CategoryCode } from '../../types/category';

export type CategoryTabsProps = {
  active: CategoryCode;
  order: CategoryCode[];
  onChange: (next: CategoryCode) => void;
  className?: string;
};