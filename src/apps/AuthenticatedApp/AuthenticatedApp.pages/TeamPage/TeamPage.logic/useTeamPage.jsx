import {
  useContext,
} from 'react';
import {
  useOutletContext,
  useNavigate,
} from 'react-router';
import {
  VITE_BACKEND_URL,
  axios,
} from '@/config';
import ROUTES from '@/routes';
import {
  AuthUserContext,
} from '@/contexts';
import {
  ModalCreateContext,
  AppContext,
  isEmail,
  useTabs,
} from '@/utils';

const useTeamPage = () => {
  const {
    currentOrganization,
    generateOrganizationRoute,
    authUserHabilitations: {
      userCanUpdateOrganization = false,
      userCanDeleteOrganization = false,
      userCanCreateOrganizationUsers = false,
      userCanReadOrganizationUsers = false,
      userCanUpdateOrganizationUsers = false,
      userCanDeleteOrganizationUsers = false,
      userCanReadOrganizationUsersHabilitations = false,
      userCanUpdateOrganizationUsersHabilitations = false,
      userCanReadOrganizationBillingInformation = false,
      userCanUpdateOrganizationBillingInformation = false,
    } = {},
  } = useOutletContext();
  const {
    t,
    isMobileOrTablet,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const tabInfos = [
    {
      routeTo:  `${ROUTES.members}/${ROUTES.registered}`,
      label: t('Members'),
      key: 'members',
      icon: 'heroicons:users-solid',
      subLabel: t('Manage and invite members'),
    },
    {
      routeTo: `${ROUTES.invitations}/${ROUTES.pending}`,
      label: t('Invitations'),
      key: 'invitations',
      icon: 'heroicons:envelope-solid',
      subLabel: t('View and manage invitations'),
    },
  ];

  const {
    tabsUriBaseRoute,
    activeTabIndex,
  } = useTabs({
    tabInfos,
    nbParams: -2,
  });

  const h1Title = tabInfos[activeTabIndex].label;
  const h2Title = tabInfos[activeTabIndex].subLabel;

  const {
    setFormConfig,
  } = useContext(ModalCreateContext);

  const inviteUser = async ({ isNew = true, ...formInputs }) => (
    axios.requestWithAuth('post', `${VITE_BACKEND_URL}/invitations`, {
      ...formInputs,
      isNew,
      organizationId: currentOrganization._id,
    })
  );

  const resendInvitation = async ({ id }) => (
    axios.requestWithAuth('post', `${VITE_BACKEND_URL}/invitations/${id}/resend`)
  );

  const handleInviteUserButtonClick = ({
    reloadAllData = () => {},
  }) => {
    setFormConfig({
      steps: [
        {
          fields: [
            {
              inputType: 'TextField',
              name: 'email',
              type: 'email',
              initValue: '',
              label: 'Email',
              placeholder: 'Email',
              multiline: false,
              required: true,
              errorHelper: 'Email is invalid',
              valueFormatter: (value) => value.toLowerCase(),
            },
          ],
          areFormInputsInvalid: ({ email }) => ({
            email: !isEmail(email),
          }),
          title: 'Invite user',
          titleIcon: 'heroicons:user-plus',
        },
        {
          title: 'New user\'s permissions on the organization',
          titleIcon: 'fluent-mdl2:permissions',
          fields: [
            {
              inputType: 'Checkbox',
              name: 'organizationUpdate',
              initValue: false,
              disabled: !userCanUpdateOrganization,
              label: 'Update the organization\'s information',
            },
            {
              inputType: 'Checkbox',
              name: 'organizationDelete',
              initValue: false,
              disabled: !userCanDeleteOrganization,
              label: 'Delete the organization',
            },
          ],
        },
        {
          fields: [
            {
              inputType: 'Checkbox',
              name: 'organizationUsersCreate',
              initValue: false,
              disabled: !userCanCreateOrganizationUsers,
              label: 'Invite new users',
            },
            {
              inputType: 'Checkbox',
              name: 'organizationUsersRead',
              initValue: false,
              disabled: !userCanReadOrganizationUsers,
              label: 'List users',
            },
            {
              inputType: 'Checkbox',
              name: 'organizationUsersUpdate',
              initValue: false,
              disabled: !userCanUpdateOrganizationUsers,
              label: 'Update users\' profiles',
            },
            {
              inputType: 'Checkbox',
              name: 'organizationUsersDelete',
              initValue: false,
              disabled: !userCanDeleteOrganizationUsers,
              label: 'Remove users',
            },
          ],
          title: 'New user\'s permissions on users',
          titleIcon: 'fluent-mdl2:permissions',
        },
        {
          fields: [
            {
              inputType: 'Checkbox',
              name: 'organizationUsersHabilitationsRead',
              initValue: false,
              disabled: !userCanReadOrganizationUsersHabilitations,
              label: 'Read users\' permissions',
            },
            {
              inputType: 'Checkbox',
              name: 'organizationUsersHabilitationsUpdate',
              initValue: false,
              disabled: !userCanUpdateOrganizationUsersHabilitations,
              label: 'Update users\' permissions',
            },
          ],
          title: 'New user\'s permissions on users\' rights',
          titleIcon: 'fluent-mdl2:permissions',
        },
        {
          fields: [
            {
              inputType: 'Checkbox',
              name: 'organizationBillingInformationRead',
              initValue: false,
              disabled: !userCanReadOrganizationBillingInformation,
              label: 'Read billing information',
            },
            {
              inputType: 'Checkbox',
              name: 'organizationBillingInformationUpdate',
              initValue: false,
              disabled: !userCanUpdateOrganizationBillingInformation,
              label: 'Update billing information',
            },
          ],
          title: 'New user\'s permissions on billing information',
          titleIcon: 'fluent-mdl2:permissions',
        },
      ],
      submitButtonText: 'Invite',
      successMessageToDisplay: 'User invited',
      hideModalAfterAction: true,
      formAction: inviteUser,
      successHandler: () => {
        navigate(generateOrganizationRoute(`${ROUTES.team}/${ROUTES.invitations}/${ROUTES.pending}`));
        reloadAllData();
      },
    });
  };

  return {
    currentOrganization,
    handleInviteUserButtonClick,
    t,
    tabsUriBaseRoute,
    activeTabIndex,
    tabInfos,
    isMobileOrTablet,
    inviteUser,
    resendInvitation,
    h1Title,
    h2Title,
  };
};

export default useTeamPage;
