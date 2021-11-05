import React, { createContext, useState, FC, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import Modal from '@santander/everest-ui/lib/Modal';
import constant from 'lodash/constant';
import { useToggle } from '../../components/commons/DatePicker/hooks';
import { obj } from '../../utils/types';
import { SpinnerContainer, ModalSpinner } from './styled';
import GeneralErrors from '../../components/commons/GeneralErrrors';

export interface ContextPropsModal {
  showModal: boolean;
  setShowModal: (param: boolean) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  infoModal?: InfoModal;
  setInfoModal: (param?: InfoModal) => void;
  hasErrors: boolean;
  setHasErrors: Dispatch<SetStateAction<boolean>>;
}
export const initialProps: ContextPropsModal = {
  showModal: false,
  setShowModal: constant,
  infoModal: {},
  isLoading: false,
  setIsLoading: constant,
  setInfoModal: constant,
  hasErrors: false,
  setHasErrors: constant
};
const ModalContext = createContext(initialProps);
export interface InfoModal {
  children?: JSX.Element;
  title?: string;
  icon?: {
    iconSize: string;
    iconKey: string;
    iconColor: string;
  };
  alignment?: string;
  size?: string;
  primaryText?: string;
  onPrimary?: (value: obj) => void;
  secondaryText?: string;
  onSecondary?: (value: obj) => void;
}

const ModalProvider: FC = ({ children }) => {
  const [showModal, setShowModal] = useToggle(initialProps.showModal);
  const [infoModal, setInfoModal] = useState<InfoModal>(initialProps.infoModal);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setHasErrors(false);
  }, [showModal]);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        infoModal,
        setInfoModal,
        isLoading,
        setIsLoading,
        setHasErrors,
        hasErrors
      }}
    >
      {children}
      <Modal
        zIndex={100}
        data-testid="modal-test"
        icon={infoModal?.icon}
        title={infoModal?.title}
        onClose={() => setShowModal(false)}
        open={showModal}
        {...infoModal}
      >
        <GeneralErrors hasErrors={hasErrors} setHasErrors={setHasErrors} onNotRetry={() => setShowModal(false)}>
          {isLoading && (
            <SpinnerContainer>
              <ModalSpinner data-testid="spinnner-test" loading={true} color="#ec0000" size={30} />
            </SpinnerContainer>
          )}
          {infoModal?.children || ''}
        </GeneralErrors>
      </Modal>
    </ModalContext.Provider>
  );
};

export { ModalContext };
export default ModalProvider;
