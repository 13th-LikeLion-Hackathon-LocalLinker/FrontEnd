import React, { useState } from 'react';
import * as S from './layout.styles';
import type { LayoutProps } from './layout.types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Drawer from '../components/Drawer/Drawer';

function Layout({
  children,
  showHeader = true,
  showFooter = true,
  headerProps,
}: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawer = () => setIsOpen((v) => !v);

  return (
    <S.PageWrapper>
      <S.Frame>
        {showHeader && <Header {...headerProps} onMenuClick={handleDrawer} />}
        <S.Content>{children}</S.Content>
        <Drawer isOpen={isOpen} onClose={handleDrawer} />
        {showFooter && <Footer />}
      </S.Frame>
    </S.PageWrapper>
  );
}

export default Layout;
