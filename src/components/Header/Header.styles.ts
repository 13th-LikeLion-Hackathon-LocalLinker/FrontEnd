import styled from '@emotion/styled';
import { css } from '@emotion/react';

const HeaderContainer = css`
  width: 100%;
  max-width: 450px;
  position: fixed;
  height: 56px;
  top: 0;
  z-index: 1000;
`;

const HeaderMain = styled.div`
  ${HeaderContainer}
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.base};
  padding: 16px 18px;
  justify-content: space-between;
  align-items: flex-end;
`;

const MainTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MainIcon = styled.div`
  width: 24px;
  height: 24px;
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
`;

const HeaderDetail = styled.div`
  ${HeaderContainer}
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.base};
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
`;

const DetailTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TitleText = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

const HeaderChat = styled.div`
  ${HeaderContainer}
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.base};
  padding: 12px 16px;
  justify-content: flex-start;
  align-items: center;
`;

const ChatTitleText = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export {
  HeaderMain,
  HeaderDetail,
  HeaderChat,
  TitleText,
  ChatTitleText,
  MenuIcon,
  MainTextWrapper,
  MainIcon,
  DetailTextWrapper,
};
