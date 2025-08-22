import styled from '@emotion/styled';

export const StyledRadioLabel = styled.label`
  display: flex;
  align-items: center;
  height: 22px;
  gap: 6px;
  opacity: 1;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  color: #373c38;

  input[type='radio'] {
    width: 22px;
    height: 22px;
    border: 2px solid #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
  }

  input[type='radio']:checked {
    background-color: #174726;
    border-color: #174726;
  }

  input[type='radio']:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(23, 71, 38, 0.3);
  }
`;
