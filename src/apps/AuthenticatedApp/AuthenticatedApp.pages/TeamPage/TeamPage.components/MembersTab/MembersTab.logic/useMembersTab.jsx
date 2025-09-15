import {
  useEffect,
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  ROWS_PER_PAGE_OPTIONS,
  VITE_BACKEND_URL,
  axios,
} from '@/config';
import ROUTES from '@/routes';
import {
  BreadcrumbsContext,
  AppContext,
  useTable,
  ModalConfirmationContext,
  generateHabilitations,
  ModalCreateContext,
  getValueOrNestedValue,
} from '@/utils';
import {
  AuthUserContext,
} from '@/contexts';
import {
  getOrganizationUsers,
} from '../MembersTab.functions';
import {
  USERS_TABLE_HEADERS as USERS_TABLE_HEADERS_WITHOUT_HABILITATIONS,
} from '../MembersTab.constants';

const useMembersTab = ({
  activeTabIndex,
}) => {
  const {
    currentOrganization,
    setActiveDrawerLinkKey,
    generateOrganizationRoute,
    authUserHabilitations: {
      userCanCreateOrganizationUsers,
      userCanReadOrganizationUsers,
      userCanUpdateOrganizationUsers,
      userCanDeleteOrganizationUsers,
      userCanReadOrganizationUsersHabilitations,
      organizationHabilitationsCheckboxesData,
    },
  } = useOutletContext();
  const {
    setBreadcrumbs,
  } = useContext(BreadcrumbsContext);
  const {
    authUser: {
      _id: authUserId,
    },
  } = useContext(AuthUserContext);
  const {
    isMobile,
    t,
    isTablet,
    dateFnsLocale,
    isMobileOrTablet,
  } = useContext(AppContext);
  const {
    setModalConfirmationConfig,
  } = useContext(ModalConfirmationContext);
  const {
    setFormConfig,
  } = useContext(ModalCreateContext);

  const USERS_TABLE_HEADERS = USERS_TABLE_HEADERS_WITHOUT_HABILITATIONS.filter(({
    isSubline,
  }) => (
    !isSubline
    || (isSubline && userCanReadOrganizationUsersHabilitations)
  ));

  const handlePermissionCheckboxClick = ({
    checkboxId,
    id,
    value,
    email,
  }) => {
    setFormConfig({
      steps: [
        {
          fields: [
            {
              inputType: 'Switch',
              name: 'value',
              initValue: value,
              labelIfAuthorized: getValueOrNestedValue(organizationHabilitationsCheckboxesData, checkboxId).labelIfAuthorized,
              labelIfUnauthorized: getValueOrNestedValue(organizationHabilitationsCheckboxesData, checkboxId).labelIfUnauthorized,
            },
          ],
          title: `Update ${email}\'s permission`,
        },
      ],
      submitButtonText: 'Update',
      successMessageToDisplay: 'User\'s permissions updated',
      hideModalAfterAction: true,
      formAction: ({ value: newCheckboxValue }) => axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/organizations/${currentOrganization._id}/habilitations`, {
        habilitation: checkboxId,
        value: newCheckboxValue,
        userId: id,
      }),
      successHandler: () => {
        reloadCurrentPageData();
      },
    });
  };

  useEffect(() => {
    if (activeTabIndex === 0) {
      setActiveDrawerLinkKey(ROUTES.team);
      setBreadcrumbs([
        {
          label: 'Team',
          to: generateOrganizationRoute(`${ROUTES.team}/${ROUTES.members}/${ROUTES.registered}`),
          sx: {
            color: 'primary.main',
          },
          icon: 'heroicons:users-solid',
        },
        {
          label: 'Members',
          to: generateOrganizationRoute(`${ROUTES.team}/${ROUTES.members}/${ROUTES.registered}`),
          sx: {
            color: 'primary.main',
          },
        },
      ]);
    }
  }, [activeTabIndex]);

  const {
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    emptyRows,
    selected,
    dense,
    handleSelectAllClick,
    handleClick,
    createSortHandler,
    rows,
    isLoading,
    order,
    orderBy,
    page,
    rowsPerPage,
    reloadCurrentPageData,
    reloadAllData,
    searchTerm,
    setSearchTerm,
    hasSearched,
    hasSearchInputFocus,
    setHasSearchInputFocus,
    formattedRowsData,
    showActionColumn,
    nbDocuments,
  } = useTable({
    rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
    defaultOrderBy: 'createdAt',
    fetchFunction: ({
      ...fetchParams
    }) => getOrganizationUsers({
      organizationId: currentOrganization._id,
      ...fetchParams,
    }),
    tableHeaders: USERS_TABLE_HEADERS,
    countActiveFilter: 'members',
    isMobile,
    mock: {},
    filters: [],
    rowDataFormatValueProps: {
      t,
      isMobile,
      dateFnsLocale,
    },
    // authUserCanGet: () => userCanReadOrganizationUsers,
    authUserCanGet: () => false,
    authUserCanList: userCanReadOrganizationUsers,
    authUserCanUpdate: () => false,
    // authUserCanUpdate: () => userCanUpdateOrganizationUsers,
    authUserCanDelete: ({ id }) => (userCanDeleteOrganizationUsers && id !== authUserId),
    handleMenuEditClick: () => {},
    handleMenuDeleteClick: ({ id, email }) => setModalConfirmationConfig({
      submitButtonText: 'Remove',
      confirmationLabel: 'Confirm the removal of the user from the organization by typing',
      title: t('Remove user from organization?'),
      type: 'deletion',
      confirmationText: email,
      formAction: () => axios.requestWithAuth('delete', `${VITE_BACKEND_URL}/organizations/${currentOrganization._id}/users/${id}`),
      successMessageToDisplay: 'User removed from organization',
      successHandler: reloadCurrentPageData,
    }),
    populateRowsWithAdditionalInfos: (row) => (
      userCanReadOrganizationUsersHabilitations
        ? (
          row.map((user) => {
            const {
              userId,
              organizationHabilitationsCheckboxesData,
            } = generateHabilitations({
              user,
              organization: currentOrganization,
            });
            return ({
              ...user,
              ...organizationHabilitationsCheckboxesData,
              id: userId,
            });
          })
        )
        : row
    ),
    handleCheckboxClick:handlePermissionCheckboxClick,
  });

  return {
    t,
    currentOrganization,
    generateOrganizationRoute,
    // → Table
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    emptyRows,
    selected,
    dense,
    handleSelectAllClick,
    handleClick,
    createSortHandler,
    rows,
    isLoading,
    order,
    orderBy,
    page,
    rowsPerPage,
    reloadCurrentPageData,
    reloadAllData,
    searchTerm,
    setSearchTerm,
    hasSearched,
    hasSearchInputFocus,
    setHasSearchInputFocus,
    formattedRowsData,
    showActionColumn,
    isMobile,
    isTablet,
    ROWS_PER_PAGE_OPTIONS,
    USERS_TABLE_HEADERS,
    nbDocuments,
    isMobileOrTablet,
    userCanCreateOrganizationUsers,
  };
};

export default useMembersTab;
