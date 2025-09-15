import React, {
  useMemo,
} from 'react';
import ModalCreateContext from './ModalCreateContext';
import useModalCreateContextLogic from './ModalCreateContext.logic/useModalCreateContextLogic';

const ModalCreateProvider = ({
  children = <></>,
}) => {
  const {
    ...valuesToProvide
  } = useModalCreateContextLogic();

  return useMemo(() => (
    <ModalCreateContext.Provider
      value={{ ...valuesToProvide }}
    >
      {children}
    </ModalCreateContext.Provider>
  ), [JSON.stringify({ ...valuesToProvide })]);
};

export default ModalCreateProvider;
