// src/components/Pager/Pager.tsx
import React from 'react';
import * as S from './Pager.styles';

type PagerProps = {
  page: number;                 // 1-based
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pager({ page, totalPages, onChange }: PagerProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <S.Pager aria-label="pagination">
      <S.PageButton onClick={() => onChange(page - 1)} disabled={page <= 1}>
        {'<'}
      </S.PageButton>

      {pages.map((p) => (
        <S.PageButton key={p} active={p === page} onClick={() => onChange(p)}>
          {p}
        </S.PageButton>
      ))}

      <S.PageButton onClick={() => onChange(page + 1)} disabled={page >= totalPages}>
        {'>'}
      </S.PageButton>
    </S.Pager>
  );
}
