const areFormInputsInvalid = ({
  firstName = '',
  lastName = '',
}) => ({
  firstName: !firstName.trim(),
  lastName: !lastName.trim(),
});

export default areFormInputsInvalid; 