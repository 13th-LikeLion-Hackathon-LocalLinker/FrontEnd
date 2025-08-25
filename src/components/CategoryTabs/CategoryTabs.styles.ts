import styled from 'styled-components';

export const Tabs = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  padding: 12px 16px 0;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  min-width: 50px;
  height: 34px;
  padding: 8px 12px;
  border-radius: 200px;
  border: none;
  cursor: pointer;

  background: ${(p) => (p.$active ? '#616462' : '#FFFFFF')};
  color: ${(p) => (p.$active ? '#FFFFFF' : '#616462')};
  font-size: 13px;
  font-weight: 600;
  line-height: 1;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
