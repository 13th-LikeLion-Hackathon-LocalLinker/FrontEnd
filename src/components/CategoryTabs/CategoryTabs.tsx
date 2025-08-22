import React from 'react';
import { Tabs, TabButton } from './CategoryTabs.styles';
import { CATEGORY_LABELS } from '../../types/category';
import type { CategoryTabsProps } from './CategoryTabs.types';

export default function CategoryTabs({ active, order, onChange, className }: CategoryTabsProps) {
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