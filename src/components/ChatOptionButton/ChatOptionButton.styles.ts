import styled from '@emotion/styled';

const ChatOptionButtonContainer = styled.button`
  display: flex;
  width: fit-content;
  height: 37px;
  border-radius: 200px;
  border: 1px solid ${({ theme }) => theme.colors.surface.dim};
  background-color: white;
  padding: 10px 14px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.outline.base};
  font-size: 14px;
  font-weight: 600;
`;

export { ChatOptionButtonContainer };
