import {
  useContext,
  useState,
} from 'react';
import {
  useNavigate,
} from 'react-router';
import {
  AppContext,
  useForm,
} from '@/utils';
import {
  VITE_APP_NAME,
  VITE_BACKEND_URL,
  axios,
} from '@/config';
import {
  EMPLOYEE_COUNT_OPTIONS,
} from '@/constants';
import ROUTES from '@/routes';
import logoLarge from '/logo-large.jpg';
import {
  INPUTS_ERRORS,
} from '../OnboardingOrganizationPage.constants';
import {
  areFormInputsInvalid,
} from '../OnboardingOrganizationPage.functions';

const useOnboardingOrganizationPage = () => {
  const {
    isMobile,
    isAppLoading,
    t,
    handleFormSubmission,
    generateRoute,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const onGoBack = async () => {
    await axios.requestWithAuth('post', `${VITE_BACKEND_URL}/me/onboarding/profile/reset`, {});
    navigate(generateRoute(ROUTES.configureMe));
  };

  const [organizationName, setOrganizationName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [isFormLoading, setIsFormLoading] = useState(false);

  const createOrganization = async () => (
    axios.requestWithAuth('post', `${VITE_BACKEND_URL}/organizations`, {
      name: organizationName,
      employeeCount,
    })
  );

  const {
    nbFormSubmissionCounter,
    hasAnError,
    handleFormAction: onCreateOrganization,
    organizationName: organizationNameErrorHelper,
    employeeCount: employeeCountErrorHelper,
  } = useForm({
    isFormLoading,
    setIsFormLoading,
    handleFormSubmission,
    formAction: createOrganization,
    areFormInputsInvalid: areFormInputsInvalid,
    inputsErrorsTexts: INPUTS_ERRORS,
    showFormActionErrorToast: true,
    shouldSetAppInLoadingMode: true,
    successMessageToDisplay: t('Organization configured successfully'),
    t,
    organizationName,
    employeeCount,
  });

  return {
    isMobile,
    onCreateOrganization,
    organizationName,
    setOrganizationName,
    employeeCount,
    setEmployeeCount,
    organizationNameErrorHelper,
    employeeCountErrorHelper,
    hasAnError,
    nbFormSubmissionCounter,
    isAppLoading,
    logoLarge,
    VITE_APP_NAME,
    t,
    EMPLOYEE_COUNT_OPTIONS,
    onGoBack,
  };
};

export default useOnboardingOrganizationPage; 