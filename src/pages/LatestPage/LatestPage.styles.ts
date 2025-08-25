import styled from '@emotion/styled';

export const Container = styled.div`
  padding-top: 50px;
`;
export const CountSection = styled.section`
  padding: 24px 20px;
`;

export const CountText = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #111;

  .total {
    color: #0fb050;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* top right bottom left → 왼쪽 패딩 키워서 오른쪽으로 이동 */
  padding: 6px 16px 8px 32px;
`;

export const FilterWrap = styled.div`
  padding: 0 16px;
`;

export const ListSection = styled.section`
  display: grid;
  gap: 12px;
  padding: 0 16px 16px;
`;
