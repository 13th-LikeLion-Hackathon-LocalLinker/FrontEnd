import styled from '@emotion/styled';

export const Pager = styled.nav`
  width: 100%;
  max-width: 300px;
  height: 24px;
  margin: 0 auto;
  margin-top: 14px;
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  gap: 12px;
  align-items: center;
  justify-items: center;
`;

export const IconButton = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.32;
    cursor: default;
  }

  img,
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PageList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px; /* 간격을 16px에서 24px로 증가 */
  color: #616462;
  font-size: 14px;
  line-height: 24px;
`;

export const PageItem = styled.button<{ active?: boolean }>`
  position: relative;
  display: inline-block;
  border: 0;
  background: transparent;
  padding: 4px 8px; /* 클릭 영역 확보를 위한 패딩 추가 */
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
