import React, {
  useMemo,
} from 'react';
import ScreenContext from './ScreenContext';
import useScreenContextLogic from './ScreenContext.logic/useScreenContextLogic';

const ScreenProvider = ({
  children = <></>,
  customBreakpoints = undefined,
}) => {
  const {
    ...valuesToProvide
  } = useScreenContextLogic(customBreakpoints);

  return useMemo(() => (
    <ScreenContext.Provider
      value={{ ...valuesToProvide }}
    >
      {children}
    </ScreenContext.Provider>
  ), [JSON.stringify({ ...valuesToProvide })]);
};

export default ScreenProvider;
