import {
  useState,
  useCallback,
  useEffect,
} from 'react';

const useBoolean = ({
  defaultValue = false,
  postValueChange = () => {},
  updateDbFunction = async () => {},
} = {}) => {
  const [value, setValue] = useState(defaultValue);

  const postValueChangeCallbacked = useCallback(postValueChange, [postValueChange]);

  const setTrue = useCallback(() => {
    setValue(true);
    postValueChangeCallbacked();
    updateDbFunction(true);
  }, [setValue, postValueChangeCallbacked]);

  const setFalse = useCallback(() => {
    setValue(false);
    postValueChangeCallbacked();
    updateDbFunction(false);
  }, [setValue, postValueChangeCallbacked]);

  const toggleValue = useCallback(() => {
    setValue((prevValue) => !prevValue);
    postValueChangeCallbacked();
    updateDbFunction(!value);
  }, [setValue, postValueChangeCallbacked, value]);

  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggleValue,
  };
};

export default useBoolean;
