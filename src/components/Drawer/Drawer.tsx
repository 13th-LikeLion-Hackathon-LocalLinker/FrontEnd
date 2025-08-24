import React from 'react';
import * as S from './Drawer.styles';
import type { DrawerProps } from './Drawer.types';
import language from '../../assets/icons/language.svg';
import { ReactComponent as ArrowDropdown } from '../../assets/icons/dropdown_arrow.svg';
import { useNavigate } from 'react-router-dom';

function Drawer({ isOpen, onClose }: DrawerProps) {
  const navigate = useNavigate();

  return (
    <>
      <S.DrawWrapper isOpen={isOpen}>
        <S.Menu>
          <S.MenuItem
            onClick={() => {
              navigate('/service-intro');
              onClose();
            }}
          >
            서비스 소개
          </S.MenuItem>
          <S.MenuItem
            onClick={() => {
              navigate('/bookmarked');
              onClose();
            }}
          >
            저장한 공고
          </S.MenuItem>
          <S.MenuItem
            onClick={() => {
              navigate('/profile-setting');
              onClose();
            }}
          >
            개인 설정
          </S.MenuItem>
        </S.Menu>
        <S.DrawerFooter>
          <S.Language>
            <img src={language} alt="language" />
            <S.Country>한국어</S.Country>
          </S.Language>
          <ArrowDropdown style={{ color: '#373C38' }} />
        </S.DrawerFooter>
      </S.DrawWrapper>
      <S.Overlay isOpen={isOpen} onClick={onClose} />
    </>
  );
}

export default Drawer;
