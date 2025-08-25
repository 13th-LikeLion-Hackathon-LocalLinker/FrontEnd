import styled from '@emotion/styled';

/* (선택) 바깥 래퍼: 가운데 정렬만 담당 */
export const Stage = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  padding-top: 56px;
`;

/* 실제 프레임: 가로만 375 고정, 세로는 유동 */
export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #f4f6f4;
  position: relative;
  overflow-x: hidden;
`;

export const Content = styled.main`
  flex: 1 1 auto;
  display: block;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
