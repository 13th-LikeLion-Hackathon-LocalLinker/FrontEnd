import styled from '@emotion/styled';

export const StyledSelect = styled.select`
  width: 334px;
  height: 40px;
  margin-bottom: 40px;
  border-radius: 4px;
  padding: 8px 10px 8px 14px;
  background: #ffffff;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0;
  color: #373c38;
  opacity: 1;
  border: none;
  cursor: pointer;

  option {
    font-size: 14px;
    padding-left: 14px;
    height: 46px;
    line-height: 46px;
  }

  &:hover {
    border: none;
    outline: none;
  }

  &:focus {
    border: none;
    outline: none;
  }
`;
