import {
  isEmail,
} from '@/utils';

const areFormInputsInvalid = ({
  email = '',
}) => ({
  email: !isEmail(email),
});

export default areFormInputsInvalid;
