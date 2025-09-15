import {
  useParams,
} from 'react-router';

const useControlledParam = ({
  authorizedValues = [],
  paramName = '',
}) => {
  const defaultValue = authorizedValues[0];

  const params = useParams();

  const isSet = !!params[paramName];

  const paramValue = isSet
    ? params[paramName]
    : defaultValue;

  const isValid = authorizedValues.includes(paramValue);

  const validParamValue = isValid
    ? paramValue
    : defaultValue;

  const activeIndex = authorizedValues.indexOf(validParamValue);

  return {
    validParamValue,
    isSet,
    isValid,
    activeIndex,
  };
};

export default useControlledParam;
