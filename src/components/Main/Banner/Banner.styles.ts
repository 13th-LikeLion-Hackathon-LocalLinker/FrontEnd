import styled from '@emotion/styled';

export const BannerContainer = styled.div`
  box-sizing: border-box;
  width: 90%;
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

export const Title = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary.base};
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
`;

export const Body = styled.div`
  width: 100%;
  color: #8ed498;
  font-size: 14px;
  line-height: 18px;
`;

/* 🔧 div → button (Emotion은 .attrs 없음 → TSX에서 type="button" 지정) */
export const Button = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;

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

export const BellIcon = styled.div`
  display: flex;
  position: absolute;
  width: 80px;
  top: -10px;
  right: 35px;
  aspect-ratio: 1/1;
`;
