import {
  useRef,
  useEffect,
  useState,
} from 'react';
import useCounter from './useCounter';
import useLocalStorageListener from './useLocalStorageListener';
import createDocSocket from '../functions/sockets/createDocSocket';

const useDocSocket = ({
  docType,
  docId,
  isAuthorized,
}) => {
  const [doc, setDoc] = useState(null);
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
    if (isAuthorized && docType && docId) {
      socketRef.current = createDocSocket({
        docType,
        docId,
        setDoc,
        setIsLoading,
        setActiveSocketId,
        renewSocket,
        resetSocket,
      });
    } else {
      socketRef?.current?.disconnect();
      socketRef.current = null;
      setDoc(null);
      setIsLoading(false);
      setActiveSocketId('');
    }
  }, [socketRenewTrigger, isAuthorized, authLocalStorageChanged, docType, docId]);
  
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
    doc,
    isLoading,
  };
};

export default useDocSocket;
