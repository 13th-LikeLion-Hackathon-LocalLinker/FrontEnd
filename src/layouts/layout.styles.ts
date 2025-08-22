import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
`;

export const Frame = styled.div`
  width: 375px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f6f4;
  position: relative;
  overflow: hidden;
`;

export const Content = styled.main`
  flex: 1 1 auto;
  min-height: 0;
  background: #f4f6f4;
`;
