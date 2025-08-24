import styled from '@emotion/styled';

const DrawWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 208px;
  background: white;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition:
    transform 0.3s ease-in-out,
    visibility 0.3s;
  z-index: 1100;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 14px 20px;
  color: ${({ theme }) => theme.colors.surface.on};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const DrawerFooter = styled.div`
  display: flex;
  padding: 14px 20px;
  color: ${({ theme }) => theme.colors.surface.on};
  align-items: center;
  width: 100%;
  background: white;
`;

const Language = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  img {
    width: 22px;
    height: 22px;
  }
`;

const Country = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
`;

export {
  DrawWrapper,
  Overlay,
  Menu,
  MenuItem,
  DrawerFooter,
  Language,
  Country,
};
