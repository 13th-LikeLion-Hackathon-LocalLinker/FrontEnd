import React from 'react';
import { SortWrap, SortItem } from './SortButtons.styles';
import type { SortButtonsProps } from './SortButtons.types';

export default function SortButtons({
  sortKey,
  onChangeSort,
}: SortButtonsProps) {
  return (
    <SortWrap role="tablist" aria-label="정렬">
      <SortItem
        $active={sortKey === 'due'}
        onClick={() => onChangeSort('due')}
        aria-pressed={sortKey === 'due'}
      >
        마감순
      </SortItem>
      <span style={{ color: '#e5e7eb' }}>|</span>
      <SortItem
        $active={sortKey === 'latest'}
        onClick={() => onChangeSort('latest')}
        aria-pressed={sortKey === 'latest'}
      >
        최신등록순
      </SortItem>
    </SortWrap>
  );
}
