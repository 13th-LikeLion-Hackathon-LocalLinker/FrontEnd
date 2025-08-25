import styled from '@emotion/styled';

export const FooterWrapper = styled.footer`
  width: 100%;
  height: 140px;
  flex: 0 0 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 20px 16px 20px 16px;
  background: #ffffff;
  color: ${({ theme }) => theme.colors.outline.base};
`;

export const ServiceName = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

export const FooterText = styled.div`
  font-size: 12px;
  line-height: 16px;
`;
