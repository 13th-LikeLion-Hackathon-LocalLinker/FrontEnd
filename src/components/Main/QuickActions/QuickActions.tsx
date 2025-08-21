import React from 'react';
import * as S from './QuickActions.styles';
import icon1 from '../../../assets/icons/main/1.svg';
import icon2 from '../../../assets/icons/main/2.svg';
import icon3 from '../../../assets/icons/main/3.svg';
import icon4 from '../../../assets/icons/main/4.svg';
import icon5 from '../../../assets/icons/main/5.svg';
import icon6 from '../../../assets/icons/main/6.svg';

const ITEMS = [
  { icon: icon1, label: '행정' },
  { icon: icon2, label: '의료' },
  { icon: icon3, label: '주거' },
  { icon: icon4, label: '취업/근로' },
  { icon: icon5, label: '교육' },
  { icon: icon6, label: '생활 지원' },
];

export default function QuickActions() {
  return (
    <S.Grid>
      {ITEMS.map(({ icon, label }) => (
        <S.ItemLink key={label} href="#" aria-label={label}>
          <S.IconTile>
            <S.Icon src={icon} alt="" aria-hidden="true" />
          </S.IconTile>
          <S.Label>{label}</S.Label>
        </S.ItemLink>
      ))}
    </S.Grid>
  );
}
