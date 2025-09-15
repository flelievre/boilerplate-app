import {
  isEmpty,
} from 'lodash';

const generateInputsErrorsTexts = ({
  isShowingErrors = false,
  t = (s) => s,
  inputsErrorsTexts = {},
  allowEmptyValues = false,
  areFormInputsInvalid = () => ({}),
  ...formInputs
}) => {
  const validators = areFormInputsInvalid({
    ...formInputs,
    allowEmptyValues,
  });

  const inputsErrorsHelpers = {};

  Object.keys(
    validators,
  ).forEach((input) => {
    inputsErrorsHelpers[input] = (
      !isEmpty(validators)
      && !!validators[input]
      && validators[input]
      && isShowingErrors
    )
      ? t(inputsErrorsTexts[input] || '')
      : '';
  });

  const hasAnError = Object.keys(inputsErrorsHelpers)
    .map((key) => (
      !!inputsErrorsHelpers[key]
    )).reduce((acc, bool) => (
      acc || bool
    ), false);

  return {
    hasAnError,
    ...inputsErrorsHelpers,
  };
};

export default generateInputsErrorsTexts;
