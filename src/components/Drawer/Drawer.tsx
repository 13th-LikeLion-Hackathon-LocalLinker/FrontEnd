import React, { useEffect } from 'react';
import * as S from './Drawer.styles';
import type { DrawerProps } from './Drawer.types';
import language from '../../assets/icons/language.svg';
import { useNavigate } from 'react-router-dom';

function Drawer({ isOpen, onClose }: DrawerProps) {
  const navigate = useNavigate();

  // 언어 코드 → 언어명 매핑
  const LANGUAGE_LABELS: Record<string, string> = {
    KO: 'Korean',
    EN: 'English',
    UZ: 'Uzbek',
    JA: 'Japanese',
    ZH: 'Chinese',
    TH: 'Thai',
    VI: 'Vietnamese',
  };

  let langLabel = '한국어';
  try {
    const onboardingInfo = JSON.parse(
      localStorage.getItem('onboardingInfo') || '{}',
    );
    if (
      onboardingInfo.nationality &&
      LANGUAGE_LABELS[onboardingInfo.nationality]
    ) {
      langLabel = LANGUAGE_LABELS[onboardingInfo.nationality];
    }
  } catch {}

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

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
            <S.Country>{langLabel}</S.Country>
          </S.Language>
        </S.DrawerFooter>
      </S.DrawWrapper>
      <S.Overlay isOpen={isOpen} onClick={onClose} />
    </>
  );
}

export default Drawer;
