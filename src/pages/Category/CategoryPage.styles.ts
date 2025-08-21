import styled from '@emotion/styled';

export const Wrap = styled.div`
  padding: 12px 16px 24px;
`;

export const CountBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 12px;
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
`;

export const Pager = styled.nav`
  margin: 20px 0 8px;
  display: flex;
  justify-content: center;
  gap: 6px;
  button {
    min-width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .active {
    background: #0fb050;
    color: #fff;
    border-color: #0fb050;
  }
`;