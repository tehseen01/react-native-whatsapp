import {Pressable, Modal as NativeModal, TouchableOpacity} from 'react-native';

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface ContextProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface ModalProps {
  children: ReactNode;
}

const ModalContext = createContext<ContextProps>({
  showModal: false,
  setShowModal: () => {},
});

const Modal = ({children}: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{showModal, setShowModal}}>
      {children}
    </ModalContext.Provider>
  );
};

const ModalTrigger = ({children}: {children: ReactNode}) => {
  const {setShowModal} = useContext(ModalContext);

  return (
    <TouchableOpacity onPress={() => setShowModal(prev => !prev)}>
      {children}
    </TouchableOpacity>
  );
};

const ModalContent = ({children}: {children: ReactNode}) => {
  const {showModal, setShowModal} = useContext(ModalContext);

  return (
    <NativeModal
      animationType="fade"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      transparent>
      <Pressable
        className="flex-1 justify-center items-center bg-black/30"
        onPress={() => setShowModal(false)}>
        {children}
      </Pressable>
    </NativeModal>
  );
};

export {Modal, ModalTrigger, ModalContent};
