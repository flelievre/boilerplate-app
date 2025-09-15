import React, {
  useMemo,
} from 'react';
import Toaster from './ToastContext.components/Toaster';
import ToastContext from './ToastContext';
import useToastContextLogic from './ToastContext.logic/useToastContextLogic';

const ToastProvider = ({
  children = <></>,
  themeName = 'light',
}) => {
  const {
    ...logic
  } = useToastContextLogic();

  const valuesToProvide = {
    ...logic,
  };

  return useMemo(() => (
    <ToastContext.Provider value={{ ...valuesToProvide }}>
      {children}
      <Toaster themeName={themeName} />
    </ToastContext.Provider>
  ), [JSON.stringify({ ...valuesToProvide, themeName })]);
};

export default ToastProvider;
