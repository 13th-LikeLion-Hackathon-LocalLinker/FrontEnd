import React from 'react';
import type { PagerProps } from './Pager.types';
import * as S from './Pager.styles';
import arrowLeft from '../../assets/icons/arrow_left.svg';
import arrowRight from '../../assets/icons/arrow_right.svg';

export default function Pager({ page, totalPages, onChange }: PagerProps) {
  // 현재 페이지가 속한 그룹 계산 (1~5: 그룹1, 6~10: 그룹2, ...)
  const currentGroup = Math.ceil(page / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(currentGroup * 5, totalPages);

  // 표시할 페이지 번호들
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <S.Pager aria-label="pagination">
      <S.IconButton
        aria-label="previous page"
        onClick={() => onChange(page - 1)}
        disabled={!canGoPrevious}
      >
        <img src={arrowLeft} alt="" />
      </S.IconButton>

      <S.PageList>
        {visiblePages.map((p) => (
          <S.PageItem
            key={p}
            active={p === page}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </S.PageItem>
        ))}
      </S.PageList>

      <S.IconButton
        aria-label="next page"
        onClick={() => onChange(page + 1)}
        disabled={!canGoNext}
      >
        <img src={arrowRight} alt="" />
      </S.IconButton>
    </S.Pager>
  );
}
