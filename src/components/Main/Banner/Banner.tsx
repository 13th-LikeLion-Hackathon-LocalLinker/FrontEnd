import React from 'react';
import * as S from './Banner.styles';

export default function Banner() {
  return (
    <S.Card aria-label="채용 공고 알림 배너">
      <S.Title>채용 공고 홍보 기간이 끝나가는 중인 공고예요!</S.Title>
      <S.Body>
        국내 정기거주 아동 교육권 보장을 위한 체류자격 부여 방안
        <br />
        지금 바로 확인해 보세요.
      </S.Body>
    </S.Card>
  );
}
