import React from 'react';
import Drawer from '../Drawer';

const DrawerContext = React.createContext({});

export const DrawerProvider = props => {
  const [open, setOpen] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [options, setOptions] = React.useState();

  const showDrawer = options => {
    setOptions(options);
    setBackdrop(true);
    setOpen(true);
    document.body.classList.add('no-scroll');
  };

  const closeDrawer = () => {
    setOpen(false);
    setTimeout(() => {
      setBackdrop(false);
    }, 150);
    document.body.classList.remove('no-scroll');
  };

  return (
    <DrawerContext.Provider
      value={{
        showDrawer,
        closeDrawer,
      }}>
      <Drawer open={open} backdrop={backdrop} onClose={closeDrawer}>
        {options && options.render ? options.render({ onClose: closeDrawer }) : null}
      </Drawer>
      {props.children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const { showDrawer, closeDrawer } = React.useContext(DrawerContext);

  const drawer = ({ ...options }) => {
    return new Promise(res => {
      showDrawer({ ...options });
    });
  };

  return { drawer, closeDrawer };
};
