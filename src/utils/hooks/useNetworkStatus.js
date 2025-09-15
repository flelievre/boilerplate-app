import {
  useEffect,
} from 'react';
import useBoolean from './useBoolean';

const useAppNetworkConnectivity = ({
  onOnlineHandler = () => {},
  onOfflineHandler = () => {},
} = {}) => {
  const {
    value: isAppOnline,
    setTrue: setAppIsOnline,
    setFalse: setAppIsNotOnline,
  } = useBoolean({ defaultValue: navigator.onLine });

  useEffect(() => {
    window.addEventListener('online', setAppIsOnline);
    window.addEventListener('offline', setAppIsNotOnline);

    return () => {
      window.removeEventListener('online', setAppIsOnline);
      window.removeEventListener('offline', setAppIsNotOnline);
    };
  }, []);

  useEffect(() => {
    if (isAppOnline) {
      onOnlineHandler();
    } else {
      onOfflineHandler();
    }
  }, [isAppOnline, onOnlineHandler, onOfflineHandler]);

  return {
    isAppOnline,
  };
};

export default useAppNetworkConnectivity;
