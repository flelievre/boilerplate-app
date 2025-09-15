import {
  useRef,
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  createAuthUserSocket,
} from '../AuthUserContext.functions';
import {
  useLocalStorageListener,
  TranslationContext,
  useCollectionSocket,
} from '@/utils';
import {
  signOut,
} from '../AuthUserContext.functions';

const useAuthUserContextLogic = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoadingAuthUser, setIsLoadingAuthUser] = useState(true);
  const {
    lang,
  } = useContext(TranslationContext);
  const {
    localStorageChanged: authLocalStorageChanged,
    // setLocalStorageChanged,
  } = useLocalStorageListener({
    keysToListenTo: ['jwe'],
  });
  const [activeSocketId, setActiveSocketId] = useState('');

  const socketRef = useRef(null);
  const previousSocketRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('jwe')) {
      socketRef.current = createAuthUserSocket({
        setAuthUser,
        setIsLoadingAuthUser,
        setActiveSocketId,
        lang,
      });
    } else {
      socketRef?.current?.disconnect();
      socketRef.current = null;
      setAuthUser(null);
      setIsLoadingAuthUser(false);
      setActiveSocketId('');
    }
  }, [authLocalStorageChanged]);
  
  useEffect(() => {
    if (activeSocketId) {
      previousSocketRef?.current?.disconnect();
      previousSocketRef.current = socketRef?.current;
    }
  }, [activeSocketId]);


  const {
    isLoading: invitationsIsLoading,
    collection: invitations,
  } = useCollectionSocket({
    collectionName: 'invitations',
    isAuthorized: (
      !!authUser?._id
      && (
        (authUser.organizations.length === 0)
        || !authUser.hasCompletedOrganizationOnboarding
      )
    ),
  });

useEffect(() => {
  return () => {
    socketRef?.current?.disconnect();
    socketRef.current = null;
    previousSocketRef?.current?.disconnect();
    previousSocketRef.current = socketRef?.current;
  };
}, []);


  // hasCompletedInvitationsPendingOnboarding
  // listen sur les invitations
  // pour chaque invitations, il voit une page avec un bouton accept / decline
  // quand le nombre d'invitations a été > 0 et qu'il avait pas fait l'onboarding invitations & organization alors on valide l'onboarding invitations

  const isLoading = (
    invitationsIsLoading
    || isLoadingAuthUser
  );

  return {
    authUser,
    isLoading,
    signOut,
    invitations,
  };
};

export default useAuthUserContextLogic;
