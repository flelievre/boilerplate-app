import {
  io,
} from 'socket.io-client';
import {
  VITE_BACKEND_URL,
  VITE_NODE_ENV,
} from '@/config';
import {
  deepMerge,
} from '@/utils';
import signOut from './signOut.js';
import renewJwe from './renewJwe';

const createAuthUserSocket = ({
  setAuthUser,
  setIsLoadingAuthUser,
  setActiveSocketId,
  lang
}) => {
  const socket = io.connect(`${VITE_BACKEND_URL}/jwe`, {
    auth: {
      Authorization: `Bearer ${localStorage.getItem('jwe')}`,
      lang,
    },
    reconnection: false,
  });

  socket.on('connect_error', async (e) => {
    console.log('ICIIII', e);
    socket.disconnect();
    if (e.message === '"exp" claim timestamp check failed') {
      console.log('LAAAA', e);
      try {
        await renewJwe();
      } catch (e) {
        console.log('ICI2', e);
        signOut();
      }
    } else {
      signOut();
    }
  });

  socket.on('connect', () => {
    setActiveSocketId(socket.id);
  });

  socket.on('authUser', (user) => {
    setAuthUser({ ...user });
    setIsLoadingAuthUser(false);
  });

  socket.on('authUserUpdate', (updateProps) => {
    setAuthUser((prevAuthUser) => (
      prevAuthUser
        ? deepMerge({ ...prevAuthUser }, { ...updateProps })
        : { ...updateProps }
    ));
    setIsLoadingAuthUser(false);
  });

  socket.on('tokenWillExpire', async () => {
    try {
      await renewJwe();
    } catch (e) {
      console.log(e);
      signOut();
    }
  });

  socket.on('disconnect', (reason) => {
    if (
      (
        (reason === 'io server disconnect')
        || (reason === 'transport error')
        || (reason === 'transport close')
      )
      && (VITE_NODE_ENV !== 'development')
    ) {
      signOut();
    }
  });

  return socket;
};

export default createAuthUserSocket;
