// src/components/PersonSwitch/PersonSwitch.styles.ts
import styled from '@emotion/styled';

export const PersonalWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: -10px;
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
`;

export const Switch = styled('button', {
  shouldForwardProp: (prop) => prop !== '$on',
})<{ $on: boolean }>`
  width: 28px;
  height: 15px;
  border-radius: 999px;
  border: 0;
  padding: 2px;
  cursor: pointer;
  background: ${(p) => (p.$on ? '#10B981' : '#E5E7EB')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${(p) => (p.$on ? '14px' : '2px')};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffffff;
    transition: left 120ms ease;
  }
`;
