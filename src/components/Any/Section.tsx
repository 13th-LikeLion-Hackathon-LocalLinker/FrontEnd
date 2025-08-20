import React from 'react';
import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin-top: 8px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
`;

const Add = styled.button`
  border: 0;
  background: transparent;
  font-size: 20px;
  color: black;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 16px 16px;
`;

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
