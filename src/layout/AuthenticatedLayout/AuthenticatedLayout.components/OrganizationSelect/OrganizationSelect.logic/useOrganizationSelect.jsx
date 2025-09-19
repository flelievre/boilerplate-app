import {
  useContext,
} from 'react';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import {
  AppContext,
  ModalCreateContext,
  sleep,
} from '@/utils';
import {
  EMPLOYEE_COUNT_OPTIONS,
} from '@/constants';
import ROUTES from '@/routes';
import {
  useNavigate,
} from 'react-router';

const useOrganizationSelect = ({
  generateOrganizationRoute = () => {},
}) => {
  const {
    t,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    setFormConfig,
  } = useContext(ModalCreateContext);
  const addOrganizationButtonClick = () => {
    setFormConfig({
      steps: [
        {
          fields: [
            {
              inputType: 'TextField',
              name: 'name',
              initValue: '',
              label: t('Organization name'),
              required: true,
              errorHelper: t('Organization name is required'),
            },
            {
              inputType: 'Select',
              name: 'employeeCount',
              label: t('Employee count'),
              options: EMPLOYEE_COUNT_OPTIONS,
              required: true,
              errorHelper: t('Employee count is required'),
            },
          ],
          title: t('Add organization'),
          areFormInputsInvalid: ({ name, employeeCount }) => ({
            name: (!name || name.trim() === ''),
            employeeCount: !EMPLOYEE_COUNT_OPTIONS.some((option) => option.value === employeeCount),
          }),
        },
      ],
      submitButtonText: t('Add'),
      successMessageToDisplay: t('Organization added'),
      hideModalAfterAction: true,
      formAction: async ({ name, employeeCount }) => {
        const res = await axios.requestWithAuth('post', `${VITE_BACKEND_URL}/organizations`, {
          name,
          employeeCount,
        });
        await sleep(1000);
        return res;
      },
      successHandler: (data) => {
        navigate(generateOrganizationRoute(ROUTES.dashboard, data.data.organizationId));
      },
    });
  };

  return {
    addOrganizationButtonClick,
  };
};

export default useOrganizationSelect;
