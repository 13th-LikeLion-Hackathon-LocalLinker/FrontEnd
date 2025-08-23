import React from 'react';
import * as S from './Header.styles';
import { useNavigate } from 'react-router-dom';
import type { HeaderProps } from './Header.types';
import menu from '../../assets/icons/menu.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow_left.svg';

function Header({
  type = 'main',
  text,
  onMenuClick,
}: HeaderProps & { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <>
      {type === 'main' && (
        <S.HeaderMain>
          <S.MainTextWrapper>
            <S.TitleText>천안시</S.TitleText>
            <S.MainIcon></S.MainIcon>
          </S.MainTextWrapper>
          <S.MenuIcon onClick={onMenuClick}>
            <img src={menu} alt="" />
          </S.MenuIcon>
        </S.HeaderMain>
      )}

      {type === 'detail' && (
        <S.HeaderDetail>
          <S.DetailTextWrapper>
            <S.MainIcon onClick={goHome} style={{ cursor: 'pointer' }}>
              <ArrowLeft style={{ color: 'white' }} />
            </S.MainIcon>
            <S.TitleText>{text ?? '상세 페이지'}</S.TitleText>
          </S.DetailTextWrapper>
          <S.MenuIcon onClick={onMenuClick}>
            <img src={menu} alt="" />
          </S.MenuIcon>
        </S.HeaderDetail>
      )}
    </>
  );
}

export default Header;
