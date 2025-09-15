import {
  useEffect,
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  ROWS_PER_PAGE_OPTIONS,
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import ROUTES from '@/routes';
import {
  BreadcrumbsContext,
  AppContext,
  useTable,
  useControlledParam,
  ModalConfirmationContext,
} from '@/utils';
import {
  getOrganizationInvitations,
} from '../InvitationsTab.functions';
import {
  INVITATIONS_TABLE_HEADERS,
  INVITATIONS_TABS_FILTERS,
  INVITATIONS_TABLE_CONFIG,
} from '../InvitationsTab.constants';

const useInvitationsTab = ({
  activeTabIndex,
  resendInvitation,
}) => {
  const {
    currentOrganization,
    setActiveDrawerLinkKey,
    generateOrganizationRoute,
    authUserHabilitations: {
      userCanCreateOrganizationUsers,
      userCanReadOrganizationUsers,
      userCanDeleteOrganizationUsers,
    },
  } = useOutletContext();
  const {
    setBreadcrumbs,
  } = useContext(BreadcrumbsContext);
  const {
    isMobile,
    t,
    isTablet,
    dateFnsLocale,
    isMobileOrTablet,
  } = useContext(AppContext);
  const {
    setModalConfirmationConfig,
    hideModal,
  } = useContext(ModalConfirmationContext);

  const {
    validParamValue,
    activeIndex: activeStatus,
  } = useControlledParam({
    authorizedValues: [
      ...INVITATIONS_TABS_FILTERS.map(({ value }) => value),
    ],
    paramName: 'status',
  });

  const filters = INVITATIONS_TABS_FILTERS.find(({ value }) => value === validParamValue)?.filters;

  const showResendInvitationButton = (
    validParamValue === 'pending'
    || validParamValue === 'expired'
    || validParamValue === 'cancelled'
    || validParamValue === 'declined'
  );

  const showCancelInvitationButton = (
    validParamValue === 'pending'
  );

  useEffect(() => {
    if (activeTabIndex === 1) {
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
          label: 'Invitations',
          to: generateOrganizationRoute(`${ROUTES.team}/${ROUTES.invitations}/${ROUTES.pending}`),
          sx: {
            color: 'primary.main',
          },
          icon: 'heroicons:envelope-solid',
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
    counts,
  } = useTable({
    rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
    defaultOrder: 'desc',
    defaultOrderBy: 'createdAt',
    fetchFunction: ({
      ...fetchParams
    }) => getOrganizationInvitations({
      organizationId: currentOrganization._id,
      ...fetchParams,
    }),
    tableHeaders: INVITATIONS_TABLE_HEADERS[validParamValue],
    countActiveFilter: validParamValue,
    isMobile,
    mock: {},
    filters,
    rowDataFormatValueProps: {
      t,
      isMobile,
      dateFnsLocale,
    },
    authUserCanGet: () => false,
    authUserCanList: userCanReadOrganizationUsers,
    authUserCanUpdate: () => false,
    authUserCanDelete: () => false,
    handleMenuEditClick: () => {},
    generateOtherMenuActions: ({
      id,
      email,
    }) => (showResendInvitationButton || showCancelInvitationButton)
    ? [
      showResendInvitationButton && {
        actionKey: 'resend-email',
        actionButtonText: 'Resend invitation',
        actionIcon: 'heroicons:envelope-solid',
        actionButtonOnClick: () => {
          setModalConfirmationConfig({
            title: 'Resend invitation',
            contentText: t('Are you sure you want to resend the invitation sent to {email}?', { email }),
            type: 'confirmation',
            formAction: () => resendInvitation({ id }),
            successMessageToDisplay: 'Invitation resent',
            successHandler: reloadCurrentPageData,
            errorHandler: () => {
              hideModal();
              reloadCurrentPageData();
            },
          });
        },
        hasHabilitation: userCanCreateOrganizationUsers,
      },
      showCancelInvitationButton && {
        actionKey: 'cancel',
        actionButtonText: 'Cancel invitation',
        actionIcon: 'material-symbols-light:cancel-outline-rounded',
        actionIconColor: '#C62828',
        actionButtonOnClick: () => {
          setModalConfirmationConfig({
            submitButtonText: 'Confirm',
            confirmationLabel: 'Confirm the cancellation of the invitation by typing',
            title: t('Cancel the invitation?'),
            type: 'deletion',
            confirmationText: email,
            formAction: () =>  axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/invitations/${id}`, {
              status: 'cancelled',
            }),
            successMessageToDisplay: 'Invitation cancelled',
            successHandler: reloadCurrentPageData,
            errorHandler: () => {
              hideModal();
              reloadCurrentPageData();
            },
          });
        },
        hasHabilitation: userCanDeleteOrganizationUsers,
      },
    ].filter(Boolean)
    : [],
  });

  const tabsInfosWithCount = INVITATIONS_TABS_FILTERS.map((tabInfo) => ({
    ...tabInfo,
    nb: counts[tabInfo.value],
  }));

  const {
    tableAddButtonLabel,
    showTableAddbutton,
    noRowsMessage,
  } = INVITATIONS_TABLE_CONFIG[validParamValue];

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
    tableHeaders: INVITATIONS_TABLE_HEADERS[validParamValue],
    nbDocuments,
    isMobileOrTablet,
    activeStatus,
    tabsInfosWithCount,
    userCanCreateOrganizationUsers,
    tableAddButtonLabel,
    showTableAddbutton,
    noRowsMessage,
  };
};

export default useInvitationsTab; 