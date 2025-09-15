import {
  useState,
} from 'react';

const useCounter = (defaultValue = 0) => {
  const [counter, setCounter] = useState(defaultValue);

  const incrementCounter = () => {
    setCounter((prevValue) => (prevValue + 1));
  };

  const decrementCounter = () => {
    setCounter((prevValue) => (prevValue - 1));
  };

  const resetCounter = () => {
    setCounter(defaultValue);
  };

  const counterIsNotNull = (counter > 0);

  return {
    counter,
    counterIsNotNull,
    incrementCounter,
    decrementCounter,
    resetCounter,
  };
};

export default useCounter;
