import styled from '@emotion/styled';

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 375px;
  height: 56px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.base};
`;

export const HeaderMain = styled(HeaderShell)`
  padding: 16px 18px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const HeaderDetail = styled(HeaderShell)`
  padding: 12px 16px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const HeaderChat = styled(HeaderShell)`
  padding: 17px 14px;
  justify-content: center;
  align-items: flex-end;
`;

export const MainTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DetailTextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 24px;

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

export const ChatText = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const ChatIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  position: absolute;
  left: 14px;
`;
