const areFormInputsInvalid = ({
  organizationName = '',
  employeeCount = '',
}) => ({
  organizationName: !organizationName.trim(),
  employeeCount: !employeeCount,
});

export default areFormInputsInvalid; 