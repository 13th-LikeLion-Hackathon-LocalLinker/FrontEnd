import styled from '@emotion/styled';

const ChatOptionButtonContainer = styled.button`
  display: flex;
  width: auto;
  height: 37px;
  border-radius: 200px;
  border: 1px solid ${({ theme }) => theme.colors.surface.dim};
  background-color: white;
  padding: 10px 14px;

  color: ${({ theme }) => theme.colors.outline.base};
  font-size: 14px;
  font-weight: 600;
`;

export { ChatOptionButtonContainer };
