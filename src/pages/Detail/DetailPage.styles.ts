import styled from '@emotion/styled';

const DetailContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  padding: 18px 20px;
  gap: 16px;
`;

const DetailHeader = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #e3e5e6;
  padding-bottom: 16px;
  gap: 4px;
`;

const DetailCategory = styled.div`
  width: fit-content;
  height: 19px;

  color: ${({ theme }) => theme.colors.surface.onVariant};
  font-size: 16px;
  font-weight: 600;
`;

const DetailTitle = styled.div`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.colors.surface.on};
  font-size: 18px;
  font-weight: 700;
`;

const DetailInfo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-top: 4px;
  gap: 6px;
`;

const DetailTarget = styled.div`
  width: 100%;
  height: 17px;

  color: ${({ theme }) => theme.colors.surface.onVariant};
  font-size: 14px;
  font-weight: 500;
`;

const DetailPeriod = styled.div`
  width: 100%;
  height: 17px;

  color: ${({ theme }) => theme.colors.surface.onVariant};
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailBody = styled.div`
  width: 100%;
  height: auto;
`;

export {
  DetailContainer,
  DetailHeader,
  DetailCategory,
  DetailTitle,
  DetailInfo,
  DetailTarget,
  DetailPeriod,
  DetailBody,
};
