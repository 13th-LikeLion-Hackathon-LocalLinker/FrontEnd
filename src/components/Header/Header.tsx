import React from 'react';
import * as S from './Header.styles';
import type { HeaderProps } from './Header.types';
import menu from '../../assets/icons/menu.svg';
import { ReactComponent as ArrowDropdown } from '../../assets/icons/dropdown_arrow.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow_left.svg';

// TODO text에 따른 헤더 텍스트 변경

function Header({ type }: HeaderProps) {
  return (
    <>
      {type === 'main' && (
        <S.HeaderMain>
          <S.MainTextWrapper>
            <S.TitleText>천안시</S.TitleText>
            <S.MainIcon>
              <ArrowDropdown style={{ color: 'white' }} />
            </S.MainIcon>
          </S.MainTextWrapper>
          <S.MenuIcon>
            <img src={menu} alt="" />
          </S.MenuIcon>
        </S.HeaderMain>
      )}
      {type === 'detail' && (
        <S.HeaderDetail>
          <S.DetailTextWrapper>
            <S.MainIcon>
              <ArrowLeft style={{ color: 'white' }} />
            </S.MainIcon>
            <S.TitleText>상세 페이지</S.TitleText>
          </S.DetailTextWrapper>
          <S.MenuIcon>
            <img src={menu} alt="" />
          </S.MenuIcon>
        </S.HeaderDetail>
      )}
    </>
  );
}

export default Header;
