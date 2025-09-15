import {
  capitalize,
} from 'lodash';
import {
  useState,
} from 'react';

const useCapitalize = (defaultValue = '') => {
  const [value, setValue] = useState(`${defaultValue}`);

  const formatValue = (input) => {
    setValue(capitalize(input));
  };

  return [value, formatValue];
};

export default useCapitalize;
