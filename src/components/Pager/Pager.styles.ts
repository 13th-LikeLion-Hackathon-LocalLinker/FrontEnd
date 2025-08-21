import styled from '@emotion/styled';

export const Pager = styled.nav`
  width: 334px;
  height: 24px;
  margin: 16px auto 0;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
`;

export const IconButton = styled.button`
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:disabled {
    opacity: 0.32;
    cursor: default;
  }

  img,
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const PageList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: #616462;
  font-size: 14px;
  line-height: 24px;
`;

export const PageItem = styled.button<{ active?: boolean }>`
  position: relative;
  display: inline-block;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;

  color: ${({ active }) => (active ? '#0A0B0D' : '#616462')};
  font-size: 14px;
  line-height: 24px;

  ${({ active }) =>
    active &&
    `
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 1px;
      background: #0A0B0D;
    }
  `}
`;
