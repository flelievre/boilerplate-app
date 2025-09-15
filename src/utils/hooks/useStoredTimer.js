import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import createPersistedState from 'use-persisted-state';

const useStoredTimer = ({
  localStorageKey = '',
  expirationTime = 60 * 1000,
}) => {
  const useTimerState = createPersistedState(localStorageKey);
  const [expirationTimestamp, setExpirationTimestamp] = useTimerState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Call this when magic link is successfully requested
  const setStoreTimer = useCallback(() => {
    const now = Date.now();
    const expiry = now + expirationTime;
    setExpirationTimestamp(expiry);
  }, []);

  useEffect(() => {
    if (!expirationTimestamp) return;
  
    const updateSecondsLeft = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.ceil((expirationTimestamp - now) / 1000));
      setSecondsLeft(diff);
    };

    updateSecondsLeft();

    const interval = setInterval(updateSecondsLeft, 1000);
  
    return () => clearInterval(interval);
  }, [expirationTimestamp]);

  const isExpired = secondsLeft <= 0;

  return {
    setStoreTimer,
    secondsLeft,
    isActive: !!expirationTimestamp && !isExpired,
  };
};

export default useStoredTimer;