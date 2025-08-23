// src/components/PersonSwitch/PersonSwitch.styles.ts
import styled from '@emotion/styled';

export const PersonalWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 13px;
`;

export const Switch = styled('button', {
  // $on 같은 스타일용 prop이 실제 DOM 속성으로 전달되지 않도록 차단
  shouldForwardProp: (prop) => prop !== '$on',
})<{ $on: boolean }>`
  width: 44px;
  height: 24px;
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
    left: ${(p) => (p.$on ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    transition: left 120ms ease;
  }
`;
