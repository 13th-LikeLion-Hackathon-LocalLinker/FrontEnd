import type { HeaderProps } from '../components/Header/Header.types';

interface LayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
  headerProps: HeaderProps;
  children: React.ReactNode;
}

export type { LayoutProps };
