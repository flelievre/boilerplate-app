import React, {
  useMemo,
} from 'react';
import {
  Helmet,
} from 'react-helmet-async';
import AppContext from './AppContext';
import useAppContextLogic from './AppContext.logic/useAppContextLogic';

const AppProvider = ({
  children = <></>,
  customBreakpoints = undefined,
}) => {
  const {
    themeName,
    ...valuesToProvide
  } = useAppContextLogic(customBreakpoints);

  return useMemo(() => (
    <AppContext.Provider
      value={{
        ...valuesToProvide,
        themeName,
      }}
    >
      {children}
    </AppContext.Provider>
  ), [JSON.stringify({ ...valuesToProvide, themeName })]);
};

export default AppProvider;
