import styled from '@emotion/styled';

export const Grid = styled.div`
  margin: 0 16px 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
`;

export const ItemLink = styled.a`
  background: transparent;
  border: 0;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
`;

export const IconTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: #FFFFFF;
  opacity: 1;
  transform: rotate(0deg);
  display: block;
  object-fit: cover;
`;

export const Label = styled.span`
  display: block;
  width: 50px;
  height: 17px;
  opacity: 1;
  transform: rotate(0deg);
  font-size: 12px;
  font-weight: 700;
  line-height: 17px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
