import styled from '@emotion/styled';

const FooterWrapper = styled.div`
  width: 100%;
  height: 140px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  padding: 44px 133px 39px 20px;
  gap: 8px;
  z-index: 1000;
  color: ${({ theme }) => theme.colors.outline.base};
`;

const ServiceName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const FooterText = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

export { FooterWrapper, ServiceName, FooterText };
