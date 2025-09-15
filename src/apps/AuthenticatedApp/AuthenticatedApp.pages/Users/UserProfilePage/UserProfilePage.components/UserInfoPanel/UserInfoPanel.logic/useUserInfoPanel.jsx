import {
  useContext,
  useEffect,
} from 'react';
import {
  AppContext,
  ModalEditContext,
} from '@/utils';
import {
  AuthUserContext,
} from '@/contexts';
import {
  capitalize,
} from 'lodash';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import {
  useParams,
} from 'react-router';

const useUserInfoPanel = () => {
  const {
    t,
    isMobile,
  } = useContext(AppContext);
  const {
    setFormConfig,
    setCollection,
    setObjToEditInfo,
    isFormLoading,
  } = useContext(ModalEditContext);
  const {
    authUser,
    authUser: {
      _id: authUserId,
      firstName,
      lastName,
      lang,
    } = {},
  } = useContext(AuthUserContext);
  const {
    userId,
  } = useParams();
  const userToEditIsAuthUser = (authUserId === userId);
  useEffect(() => {
    setFormConfig({
      fields: [
        {
          inputType: 'TextField',
          name: 'firstName',
          type: 'text',
          label: 'First name',
          placeholder: 'First name',
          multiline: false,
          required: true,
          errorHelper: 'First name is invalid',
          valueFormatter: (value) => capitalize(value),
          modalTitle: userToEditIsAuthUser
            ? t('Update your first name')
            : t('Update first name'),
          successMessageToDisplay: 'First name updated',
          submitButtonText: 'Update',
        },
        {
          inputType: 'TextField',
          name: 'lastName',
          type: 'text',
          label: 'Last name',
          placeholder: 'Last name',
          multiline: false,
          required: true,
          errorHelper: 'Last name is invalid',
          valueFormatter: (value) => value.toUpperCase(),
          modalTitle: userToEditIsAuthUser
            ? t('Update your last name')
            : t('Update last name'),
          successMessageToDisplay: 'Last name updated',
          submitButtonText: 'Update',
        },
      ],
      areFormInputsInvalid: ({ firstName, lastName }) => ({
        firstName: !firstName,
        lastName: !lastName,
      }),
      formAction: ({ firstName, lastName }) => axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/me`, {
        firstName,
        lastName,
        lang,
      }),
    });
  }, []);

  useEffect(() => {
    setCollection([authUser]);
  }, [authUser]);

  return {
    t,
    isFormLoading,
    userToEditIsAuthUser,
    firstName,
    lastName,
    setObjToEditInfo,
    isMobile,
  };
};

export default useUserInfoPanel;
