
import styled from '@emotion/styled';
import type { SortItemProps } from './SortButtons.types';

export const SortWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

// $active가 버튼 DOM 속성으로 내려가지않게 필터링
export const SortItem = styled('button', {
  shouldForwardProp: (prop) => prop !== '$active',
})<SortItemProps>`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${(p) => (p.$active ? '#111827' : '#9CA3AF')};
  font-weight: ${(p) => (p.$active ? 600 : 500)};
`;
