// src/pages/Category/CategoryPage.styles.ts
import styled from '@emotion/styled';

export const Wrap = styled.div`
  padding: 12px 16px 24px;
  background: transparent; /* 기존 'ackground' 오타 수정 */
`;

export const CountBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 건수 | 에러 좌우 배치 */
  gap: 8px;
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 12px;
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
