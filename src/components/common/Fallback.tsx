import React from 'react';

type FallbackProps = {
  loading: boolean;
  error?: string | null;
  empty?: boolean;
  emptyText?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Fallback({
  loading,
  error,
  empty,
  emptyText = '표시할 내용이 없습니다.',
  children,
}: FallbackProps) {
  if (loading) return <div>불러오는 중…</div>;
  if (error) return <div style={{ color: 'crimson' }}>에러: {error}</div>;
  if (empty) return <div>{emptyText}</div>;
  return <>{children}</>;
}

//fallback이 맞나 