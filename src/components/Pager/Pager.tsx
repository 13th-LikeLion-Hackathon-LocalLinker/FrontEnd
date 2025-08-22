import React from 'react';
import * as S from './Pager.styles';
import arrowLeft from '../../assets/icons/arrow_left.svg';
import arrowRight from '../../assets/icons/arrow_right.svg';

type PagerProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pager({ page, totalPages, onChange }: PagerProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <S.Pager aria-label="pagination">
      <S.IconButton
        aria-label="previous page"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        <img src={arrowLeft} alt="" />
      </S.IconButton>

      <S.PageList>
        {pages.map((p) => (
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
        disabled={page >= totalPages}
      >
        <img src={arrowRight} alt="" />
      </S.IconButton>
    </S.Pager>
  );
}
