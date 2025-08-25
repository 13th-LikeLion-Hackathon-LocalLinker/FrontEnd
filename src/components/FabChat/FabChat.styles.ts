import styled from '@emotion/styled';

export const ChatImg = styled.img`
  position: fixed;
  left: calc(50% + 110px);
  bottom: 98px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  user-select: none;

  @media (min-width: 400px) {
    left: calc(50% + 140px);
  }
`;

export const TopImg = styled.img`
  position: fixed;
  left: calc(50% + 110px);
  bottom: 38px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  user-select: none;

  @media (min-width: 400px) {
    left: calc(50% + 140px);
  }
`;
