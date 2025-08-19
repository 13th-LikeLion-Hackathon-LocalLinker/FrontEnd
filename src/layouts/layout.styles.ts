// src/layouts/Layout.styles.ts
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

export const Content = styled.main`
  flex: 1;
  padding-top: 56px; /* fixed header 만큼 공백 */
`;
