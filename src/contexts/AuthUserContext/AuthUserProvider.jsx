import React, {
  useMemo,
} from 'react';
import AuthUserContext from './AuthUserContext';
import useAuthUserContextLogic from './AuthUserContext.logic/useAuthUserContextLogic';

const AuthUserProvider = ({ children }) => {
  const {
    ...valuesToProvide
  } = useAuthUserContextLogic();

  return useMemo(() => (
    <AuthUserContext.Provider
      value={{
        ...valuesToProvide,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  ), [
    JSON.stringify({
      ...valuesToProvide,
    }),
  ]);
};

export default AuthUserProvider;
