import styled from '@emotion/styled';

const ServiceIntroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #f0f4ff, #ffffff);
`;

const ServiceIntroTitle = styled.h1`
  font-size: 21px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 24px;
  line-height: 1.4;
  max-width: 800px;
`;

const ServiceIntroDescription = styled.p`
  font-size: 15px;
  color: #555555;
  line-height: 1.7;
  max-width: 700px;
  background: #ffffff;
  padding: 24px 17px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

const HighlightText = styled.span`
  color: #0fb050;
  font-weight: 600;
`;

export {
  ServiceIntroContainer,
  ServiceIntroTitle,
  ServiceIntroDescription,
  HighlightText,
};
