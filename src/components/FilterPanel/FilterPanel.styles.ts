// src/components/FilterPanel/FilterPanel.styles.ts
import styled from '@emotion/styled';

export const Card = styled.div`
  width: 100%; /* 패널 고정 너비 */
  margin: 8px 4px 10px 0; /* 레이아웃에 맞게 여백 유지 */
  padding: 14px 12px;
  background: #ffffff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 0 0 1px #e5e7eb inset;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr; /* 라벨 고정폭 */
  align-items: center;
  column-gap: 80px;
  row-gap: 10px;

  & + & {
    margin-top: 14px; /* ⬆️ 세로 간격 살짝 확대 */
  }

  label {
    color: #0b0b0b;
    font-size: 13px;
    font-weight: 500;
    margin-left: 2px;
  }
`;

export const Inline = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 40px;
`;

export const Select = styled.select`
  width: 136px; /* ⬆️ 고정 너비 */
  height: 36px; /* ⬆️ 고정 높이 */
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  margin-left: 20px;
  background: #f8f9f8;
  /* 고정폭을 위해 flex 속성 제거 */
`;

export const Radio = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #4b5563;
  font-size: 13px;
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 147.5px); /* 버튼 고정 너비 */
  gap: 10px;
  margin-top: 36px; /* 필드와 버튼 사이 간격 확대 */
  justify-content: space-between;
`;

export const GhostBtn = styled.button`
  width: 147.5px; /* 버튼 고정 너비 */
  height: 42px; /*  버튼 고정 높이 */
  background: #e9ece9; /* 지정 색상 */
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
`;

export const PrimaryBtn = styled.button`
  width: 147.5px; /* ⬆️ 버튼 고정 너비 */
  height: 42px; /* ⬆️ 버튼 고정 높이 */
  background: #0fb050; /* primary */
  border-radius: 5px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
`;
