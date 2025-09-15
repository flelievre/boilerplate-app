import {
  useEffect,
} from 'react';
import useCounter from './useCounter';

const useLocalStorageListener = ({
  keysToListenTo = [],
} = {}) => {
  const {
    counter: localStorageChanged,
    incrementCounter: setLocalStorageChanged,
  } = useCounter();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (keysToListenTo.includes(event.key)) {
        setLocalStorageChanged();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    keysToListenTo.forEach((key) => {
      window.addEventListener(key, setLocalStorageChanged);
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      keysToListenTo.forEach((key) => {
        window.removeEventListener(key, setLocalStorageChanged);
      });
    };
  }, []);

  return {
    localStorageChanged,
    setLocalStorageChanged,
  };
};

export default useLocalStorageListener;
