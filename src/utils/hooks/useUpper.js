import { useState } from 'react';

const useUpper = (defaultValue = '') => {
  const [value, setValue] = useState(`${defaultValue}`);

  const formatValue = (input) => {
    setValue(`${input}`.toUpperCase());
  };

  return [value, formatValue];
};

export default useUpper;
