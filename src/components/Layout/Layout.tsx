import { ReactNode } from 'react';
import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Main />
      {children}
    </>
  );
};
