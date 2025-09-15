import { useState } from 'react';

const useLowerCase = (defaultValue = '') => {
  const [value, setValue] = useState(`${defaultValue}`);

  const formatValue = (input) => {
    setValue(`${input}`.toLowerCase());
  };

  return [value, formatValue];
};

export default useLowerCase;
