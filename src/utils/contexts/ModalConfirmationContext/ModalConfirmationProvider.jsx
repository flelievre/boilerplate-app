import React, {
  useMemo,
} from 'react';
import ModalConfirmationContext from './ModalConfirmationContext';
import useModalConfirmationContextLogic from './ModalConfirmationContext.logic/useModalConfirmationContextLogic';

const ModalConfirmationProvider = ({
  children = <></>,
}) => {
  const {
    ...valuesToProvide
  } = useModalConfirmationContextLogic();

  return useMemo(() => (
    <ModalConfirmationContext.Provider
      value={{ ...valuesToProvide }}
    >
      {children}
    </ModalConfirmationContext.Provider>
  ), [JSON.stringify({ ...valuesToProvide })]);
};

export default ModalConfirmationProvider;
