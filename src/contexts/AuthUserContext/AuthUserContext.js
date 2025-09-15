import { createContext } from 'react';

const AuthUserContext = createContext({
  authUser: null,
  renewJwe: () => {},
  isLoading: false,
});

export default AuthUserContext;
