import styled from '@emotion/styled';

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 375px;
  height: 56px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 16px 16px; /* 하단 패딩 16px */
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.base};
`;

export const HeaderMain = styled(HeaderShell)`
  justify-content: space-between;
  align-items: flex-end;
`;

export const HeaderDetail = styled(HeaderShell)`
  justify-content: space-between;
  align-items: flex-end;
`;

export const HeaderChat = styled(HeaderShell)`
  justify-content: flex-start;
  align-items: center;
`;

export const MainTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DetailTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: -8px;
  //이부분 중요
`;

export const TitleText = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

export const MainIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
`;

export const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
