import React from 'react';
import * as S from './layout.styles';
import type { LayoutProps } from './layout.types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Layout({
  children,
  showHeader = true,
  showFooter = true,
  headerProps,
}: LayoutProps) {
  return (
    <S.PageWrapper>
      {showHeader && <Header {...headerProps} />}
      <S.Content>{children}</S.Content>
      {showFooter && <Footer />}
    </S.PageWrapper>
  );
}

export default Layout;
