import {
  useRef,
  useEffect,
  useState,
} from 'react';
import useCounter from './useCounter';
import useLocalStorageListener from './useLocalStorageListener';
import createCollectionSocket from '../functions/sockets/createCollectionSocket';

const useCollectionSocket = ({
  collectionName,
  isAuthorized,
}) => {
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    counter: socketRenewTrigger,
    incrementCounter: renewSocket,
    resetCounter: resetSocket,
  } = useCounter();
  const [activeSocketId, setActiveSocketId] = useState('');
  const {
    localStorageChanged: authLocalStorageChanged,
    // setLocalStorageChanged,
  } = useLocalStorageListener({
    keysToListenTo: ['jwe'],
  });

  const socketRef = useRef(null);
  const previousSocketRef = useRef(null);

  useEffect(() => {
    if (isAuthorized) {
      socketRef.current = createCollectionSocket({
        collectionName,
        setCollection,
        setIsLoading,
        setActiveSocketId,
        renewSocket,
        resetSocket,
      });
    } else {
      socketRef?.current?.disconnect();
      socketRef.current = null;
      setCollection([]);
      setIsLoading(false);
      setActiveSocketId('');
    }
  }, [socketRenewTrigger, isAuthorized, authLocalStorageChanged]);
  
  useEffect(() => {
    if (activeSocketId) {
      previousSocketRef?.current?.disconnect();
      previousSocketRef.current = socketRef?.current;
    }
  }, [activeSocketId]);

  useEffect(() => {
    return () => {
      socketRef?.current?.disconnect();
      socketRef.current = null;
      previousSocketRef?.current?.disconnect();
      previousSocketRef.current = socketRef?.current;
    };
  }, []);

  return {
    collection,
    isLoading,
  };
};

export default useCollectionSocket;
