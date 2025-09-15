import React, {
  useMemo,
} from 'react';
import ModalEditContext from './ModalEditContext';
import useModalEditContextLogic from './ModalEditContext.logic/useModalEditContextLogic';

const ModalEditProvider = ({
  children = <></>,
}) => {
  const {
    ...valuesToProvide
  } = useModalEditContextLogic();

  return useMemo(() => (
    <ModalEditContext.Provider
      value={{ ...valuesToProvide }}
    >
      {children}
    </ModalEditContext.Provider>
  ), [JSON.stringify({ ...valuesToProvide })]);
};

export default ModalEditProvider;
