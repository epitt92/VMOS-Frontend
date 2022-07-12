import styled from '@emotion/styled';

const Drawer = ({ backdrop, open, onClose, children }) => {
  const handleBackdropClick = e => {
    if (e.target.className.indexOf('drawer-backdrop') !== -1) {
      onClose();
    }
  };
  return (
    <Backdrop className="drawer-backdrop" open={backdrop} onClick={handleBackdropClick}>
      <DrawerContainer open={open}>{children}</DrawerContainer>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  z-index: 1111;
  opacity: ${props => (props.open ? 1 : 0)};
  transition: ${props => (props.open ? 'opacity 100ms ease-in-out transform 0ms' : 'none')};
  transform: ${props => (props.open ? 'scale(1,1)' : 'scale(0,0)')};
  backdrop-filter: blur(1.5px);
`;

const DrawerContainer = styled.div`
  position: fixed;
  right: 0;
  height: 100%;
  width: min(450px, 90%);
  background-color: white;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  box-shadow: -7px 0px 11px rgb(0 0 0 / 5%);
`;

export default Drawer;
