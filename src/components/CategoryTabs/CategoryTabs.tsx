import React from 'react';
import type { CategoryCode } from '../../types/category';
import { CATEGORY_LABELS } from '../../types/category';
import { Tabs, TabButton } from './CategoryTabs.styles';

type Props = {
  active: CategoryCode;
  order: CategoryCode[];
  onChange: (next: CategoryCode) => void;
  className?: string;
};

export default function CategoryTabs({ active, order, onChange, className }: Props) {
  return (
    <Tabs className={className}>
      {order.map((code) => (
        <TabButton
          key={code}
          $active={code === active}
          aria-pressed={code === active}
          onClick={() => onChange(code)}
        >
          {CATEGORY_LABELS[code]}
        </TabButton>
      ))}
    </Tabs>
  );
}
