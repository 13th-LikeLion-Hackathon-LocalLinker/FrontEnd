import styled from '@emotion/styled';

const BannerContainer = styled.div`
  box-sizing: border-box;
  width: 334px;
  height: 143px;
  margin: 0 auto;
  margin-bottom: 14px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  position: relative;
  padding: 14px 18px;
  justify-content: center;
  align-items: flex-end;
  gap: 6px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.container};
  background: #f4fbf5;
`;

const Title = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary.base};
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
`;

const Body = styled.div`
  width: 100%;
  color: #8ed498;
  font-size: 14px;
  line-height: 18px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.primary.base};
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;

  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
`;

const BellIcon = styled.div`
  display: flex;
  position: absolute;
  width: 80px;
  top: -10px;
  right: 35px;
  aspect-ratio: 1/1;
`;
export { BannerContainer, Title, Body, Button, BellIcon };
