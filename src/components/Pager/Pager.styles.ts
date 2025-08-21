// src/components/Pager/Pager.styles.ts
import styled from '@emotion/styled';

export const Pager = styled.nav`
  margin: 20px 0 8px;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  min-width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${({ active }) => (active ? '#0fb050' : '#e5e7eb')};
  background: ${({ active }) => (active ? '#0fb050' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : 'inherit')};
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
