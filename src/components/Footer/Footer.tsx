import React from 'react';
import * as S from './Footer.styles';

function Footer() {
  return (
    <S.FooterWrapper>
      <S.ServiceName>서비스명</S.ServiceName>
      <S.FooterText>
        개인정보 처리방침 <br />
        Copyright ⓒ 서비스명. All Rights Reserved
      </S.FooterText>
    </S.FooterWrapper>
  );
}

export default Footer;
