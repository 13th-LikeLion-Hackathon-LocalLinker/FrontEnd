import React from 'react';
import * as S from './QuickActions.styles';
import { useNavigate } from 'react-router-dom';
import icon1 from '../../../assets/icons/main/1.svg';
import icon2 from '../../../assets/icons/main/2.svg';
import icon3 from '../../../assets/icons/main/3.svg';
import icon4 from '../../../assets/icons/main/4.svg';
import icon5 from '../../../assets/icons/main/5.svg';
import icon6 from '../../../assets/icons/main/6.svg';
import { CategoryCode, CATEGORY_LABELS } from '../../../types/category';

type Item = { icon: string; label: string; code: CategoryCode };

const ITEMS: readonly Item[] = [
  { icon: icon1, label: '행정', code: 'ADMINISTRATION' },
  { icon: icon2, label: '의료', code: 'MEDICAL' },
  { icon: icon3, label: '주거', code: 'HOUSING' },
  { icon: icon4, label: '취업/근로', code: 'EMPLOYMENT' },
  { icon: icon5, label: '교육', code: 'EDUCATION' },
  { icon: icon6, label: '생활 지원', code: 'LIFE_SUPPORT' },
] as const;

export default function QuickActions() {
  const navigate = useNavigate();
  const go = (code: CategoryCode) =>
    navigate(`/category?category=${code}&page=1`);

  return (
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
  );
}
