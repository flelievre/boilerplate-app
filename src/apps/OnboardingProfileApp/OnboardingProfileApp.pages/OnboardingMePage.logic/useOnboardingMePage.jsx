import {
  useContext,
  useState,
} from 'react';
import {
  useNavigate,
} from 'react-router';
import {
  AuthUserContext,
} from '@/contexts';
import {
  AppContext,
  useForm,
  useCapitalize,
  useUpper,
} from '@/utils';
import {
  VITE_APP_NAME,
  VITE_BACKEND_URL,
  axios,
} from '@/config';
import ROUTES from '@/routes';
import logoLarge from '/logo-large.jpg';
import {
  INPUTS_ERRORS,
} from '../OnboardingMePage.constants';
import {
  areFormInputsInvalid,
} from '../OnboardingMePage.functions';

const useOnboardingMePage = () => {
  const {
    isMobile,
    isAppLoading,
    t,
    handleFormSubmission,
    generateRoute,
  } = useContext(AppContext);
  const {
    authUser: {
      firstName: authUserFirstName,
      lastName: authUserLastName,
      hasCompletedProfileOnboarding,
      lang,
    } = {},
    signOut = () => {},
  } = useContext(AuthUserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useCapitalize(authUserFirstName);
  const [lastName, setLastName] = useUpper(authUserLastName);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const completeProfile = async () => (
    axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/me`, {
      firstName,
      lastName,
      lang,
    })
  );

  const successHandler = () => {
    navigate(generateRoute(ROUTES.createOrganization));
  };

  const {
    nbFormSubmissionCounter,
    hasAnError,
    handleFormAction: onCompleteProfile,
    firstName: firstNameErrorHelper,
    lastName: lastNameErrorHelper,
  } = useForm({
    isFormLoading,
    setIsFormLoading,
    handleFormSubmission,
    formAction: completeProfile,
    areFormInputsInvalid: areFormInputsInvalid,
    inputsErrorsTexts: INPUTS_ERRORS,
    showFormActionErrorToast: true,
    shouldSetAppInLoadingMode: true,
    successHandler,
    t,
    firstName,
    lastName,
    showSuccessToast: !hasCompletedProfileOnboarding,
    successMessageToDisplay: t('Profile configured successfully'),
  });

  return {
    isMobile,
    onCompleteProfile,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    firstNameErrorHelper,
    lastNameErrorHelper,
    hasAnError,
    nbFormSubmissionCounter,
    isAppLoading,
    logoLarge,
    VITE_APP_NAME,
    t,
    signOut,
  };
};

export default useOnboardingMePage; 