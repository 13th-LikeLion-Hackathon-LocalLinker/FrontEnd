import React from 'react';
import { useNavigate } from 'react-router-dom';
import Line from '../../Line/Line';
import * as S from './QuickActions.styles';
import { ITEMS } from './QuickActions.types';

export default function QuickActions() {
  const navigate = useNavigate();

  const go = (code: string) => {
    navigate(`/category?category=${code}&page=1`);
  };

  return (
    <>
      <S.Grid>
        {ITEMS.map((item) => (
          <S.ItemLink
            key={item.code}
            href={`/category?category=${item.code}&page=1`}
            onClick={(e) => {
              e.preventDefault();
              go(item.code);
            }}
            aria-label={item.label}
          >
            <S.IconTile>
              <S.Icon src={item.icon} alt="" aria-hidden="true" />
            </S.IconTile>
            <S.Label>{item.label}</S.Label>
          </S.ItemLink>
        ))}
      </S.Grid>

      <Line />
    </>
  );
}
