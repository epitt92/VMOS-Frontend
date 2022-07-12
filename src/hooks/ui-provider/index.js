import { DrawerProvider } from 'components/Drawer/hooks/DrawerContext';
import { ModalProvider } from 'components/Modal/hooks/ModalContext';

export const UIProvider = props => {
  return (
    <>
      <ModalProvider>
        <DrawerProvider>{props.children}</DrawerProvider>
      </ModalProvider>
    </>
  );
};
