import React from 'react';
import * as S from './Footer.styles';

function Footer() {
  return (
    <S.FooterWrapper>
      <S.ServiceName>K한걸음</S.ServiceName>
      <S.FooterText>개인정보 처리방침</S.FooterText>
      <S.FooterText>Copyright © 서비스명. All Rights Reserved</S.FooterText>
    </S.FooterWrapper>
  );
}

export default Footer;
