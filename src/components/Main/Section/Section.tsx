import React from 'react';
import type { PropsWithChildren } from 'react';
import { Head, Title, Add, List } from './Section.styles';
import { Link } from 'react-router-dom';

export function SectionHeader({ title, to }: { title: string; to?: string }) {
  const addEl = <Add>＋</Add>;

  return (
    <Head>
      <Title>{title}</Title>
      {to ? (
        <Link
          to={to}
          aria-label={`${title} 더 보기`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {addEl}
        </Link>
      ) : (
        <span aria-hidden="true">{addEl}</span>
      )}
    </Head>
  );
}

export function SectionList({ children }: PropsWithChildren) {
  return <List>{children}</List>;
}
