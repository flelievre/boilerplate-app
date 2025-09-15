const isFormInvalid = ({
  areFormInputsInvalid = () => ({}),
  allowEmptyValues = false,
  ...formInputs
}) => {
  const areFormInputsInvalidObj = areFormInputsInvalid({
    ...formInputs,
    allowEmptyValues,
  });
  return (
    Object.keys(
      areFormInputsInvalidObj,
    ).reduce(
      (acc, input) => (acc || (!!areFormInputsInvalidObj[input] && areFormInputsInvalidObj[input])),
      false,
    )
  );
};

export default isFormInvalid;
