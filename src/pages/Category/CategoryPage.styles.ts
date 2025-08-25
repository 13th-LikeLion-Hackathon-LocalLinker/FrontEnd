// src/pages/Category/CategoryPage.styles.ts
import styled from '@emotion/styled';

export const Wrap = styled.div`
  padding: 12px 16px 24px;
  background: transparent; /* 기존 'ackground' 오타 수정 */
`;

export const CountBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 700px
  margin-bottom: 20px;
  margin-left: 6px;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0 8px; /* Wrap이 좌우 16px 패딩을 이미 가짐 */
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
`;
