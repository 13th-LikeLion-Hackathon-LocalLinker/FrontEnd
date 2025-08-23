import styled from '@emotion/styled';

export const Stage = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
`;

export const Page = styled.div`
  width: 375px;
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
  overflow-y: auto;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin-top: 8px;
`;

export const Add = styled.button`
  border: 0;
  background: transparent;
  font-size: 20px;
  color: black;
  cursor: pointer;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 16px 80px;
`;

export const EmptyText = styled.p`
  color: #555;
  font-size: 16px;
  text-align: center;
  margin-top: 56px;
`;
