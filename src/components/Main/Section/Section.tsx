import React from 'react';
import type { PropsWithChildren } from 'react';
import { Head, Title, Add, List } from './Section.styles';

export function SectionHeader({ title }: { title: string }) {
  return (
    <Head>
      <Title>{title}</Title>
      <Add aria-label="더 보기">＋</Add>
    </Head>
  );
}

export function SectionList({ children }: PropsWithChildren) {
  return <List>{children}</List>;
}
