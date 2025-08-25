import React from 'react';
import * as S from './ServiceIntroPage.styles';

function ServiceIntroPage() {
  return (
    <S.ServiceIntroContainer>
      <S.ServiceIntroTitle>
        저희 서비스는{' '}
        <S.HighlightText>
          외국인들이 쉽고 빠르게 필요한 제도, 혜택
        </S.HighlightText>
        을 찾을 수 있도록 돕는 플랫폼입니다.
      </S.ServiceIntroTitle>
      <S.ServiceIntroDescription>
        공공기관과 지자체의 공지를 한곳에 모아 정리하고,{' '}
        <S.HighlightText>AI 요약과 다국어 번역</S.HighlightText>으로 이해를 쉽게
        해드립니다. 비자 유형, 카테고리, 혼인 여부에 맞춘{' '}
        <S.HighlightText>맞춤형 탐색</S.HighlightText>으로 나에게 필요한 지원만
        골라 볼 수 있고, 최신 공고와 마감 임박 소식도 놓치지 않습니다. 챗봇에
        자연어로 질문하면 조건에 맞는 정보를 출처와 마감일과 함께 바로 안내받을
        수 있어 안심할 수 있습니다. 한국어를 포함한 7개 언어를 지원해 다양한
        이용자가 편리하게 사용할 수 있으며,{' '}
        <S.HighlightText>복잡한 제도를 쉽고 빠르게 연결</S.HighlightText>하는
        것이 저희의 목표입니다.
      </S.ServiceIntroDescription>
    </S.ServiceIntroContainer>
  );
}

export default ServiceIntroPage;
