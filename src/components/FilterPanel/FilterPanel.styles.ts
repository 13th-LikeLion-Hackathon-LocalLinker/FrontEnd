// src/components/FilterPanel/FilterPanel.styles.ts
import styled from '@emotion/styled';

export const Card = styled.div`
  margin: 8px 16px 12px;
  padding: 14px 12px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 0 0 1px #e5e7eb inset;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr;
  align-items: center;
  column-gap: 12px;
  row-gap: 10px;
  & + & {
    margin-top: 10px;
  }
  label {
    color: #374151;
    font-size: 13px;
  }
`;

export const Inline = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Select = styled.select`
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  background: #fff;
  flex: 1 1 auto;
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
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
`;

export const GhostBtn = styled.button`
  height: 40px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
`;

export const PrimaryBtn = styled.button`
  height: 40px;
  background: #10b981;
  border: 1px solid #10b981;
  border-radius: 10px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
`;
