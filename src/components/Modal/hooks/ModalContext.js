import React from 'react';
import Modal from '../Modal';

const ModalContext = React.createContext(
  {}
);

export const ModalProvider = (props) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState();

  const showModal = (options) => {
    setOptions(options);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        closeModal,
      }}
    >
      <Modal
        show={open}
        onClose={closeModal}
        width={options && options.width}
        height={options && options.height || "auto"}
      >
        {options && options.render
          ? options.render({ onClose: closeModal })
          : null}
      </Modal>
      {props.children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { showModal, closeModal } = React.useContext(ModalContext);

  const modal = ({ ...options }) => {
    return new Promise((res) => {
      showModal({ ...options });
    });
  };

  return { modal, closeModal };
};
