import {
  useContext,
  useEffect,
} from 'react';
import {
  useOutletContext,
  useNavigate,
} from 'react-router';
import {
  ROWS_PER_PAGE_OPTIONS,
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import ROUTES from '@/routes';
import {
  AppContext,
  useTable,
  useControlledParam,
  ModalConfirmationContext,
  BreadcrumbsContext,
} from '@/utils';
import {
  getUserInvitations,
} from '../InvitationsPage.functions';
import {
  MY_INVITATIONS_TABLE_HEADERS,
  MY_INVITATIONS_TABS_FILTERS,
  MY_INVITATIONS_TABLE_CONFIG,
} from '../InvitationsPage.constants';

const useInvitationsPage = () => {
  const {
    setActiveDrawerLinkKey,
    generateOrganizationRoute,
  } = useOutletContext();
  const {
    isMobile,
    t,
    isTablet,
    dateFnsLocale,
    generateRoute,
  } = useContext(AppContext);
  const {
    setModalConfirmationConfig,
  } = useContext(ModalConfirmationContext);
  const {
    setBreadcrumbs,
  } = useContext(BreadcrumbsContext);

  useEffect(() => {
    setActiveDrawerLinkKey(ROUTES.invitations);
    setBreadcrumbs([
      {
        label: 'My Invitations',
        to: generateOrganizationRoute(`${ROUTES.invitations}/${ROUTES.pending}`),
        sx: {
          color: 'primary.main',
        },
        icon: 'material-symbols:mail',
      },
    ]);
  }, []);

  const {
    validParamValue,
    activeIndex: activeStatus,
  } = useControlledParam({
    authorizedValues: [
      ...MY_INVITATIONS_TABS_FILTERS.map(({ value }) => value),
    ],
    paramName: 'status',
  });

  const filters = MY_INVITATIONS_TABS_FILTERS.find(({ value }) => value === validParamValue)?.filters;

  const showAcceptButton = (
    validParamValue === 'pending'
  );

  const showDeclineButton = (
    validParamValue === 'pending'
  );

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
    }) => getUserInvitations({
      ...fetchParams,
    }),
    tableHeaders: MY_INVITATIONS_TABLE_HEADERS[validParamValue],
    countActiveFilter: validParamValue,
    isMobile,
    mock: {},
    filters,
    rowDataFormatValueProps: {
      t,
      isMobile,
      dateFnsLocale,
      generateRoute,
      generateOrganizationRoute,
    },
    authUserCanGet: () => false,
    authUserCanList: () => true,
    authUserCanUpdate: () => false,
    authUserCanDelete: () => false,
    handleMenuEditClick: () => {},
    generateOtherMenuActions: ({
      id,
      organizationName,
      invitedByDisplayName,
      invitedByEmail,
    }) => (showAcceptButton || showDeclineButton)
    ? [
      showAcceptButton && {
        actionKey: 'accept-invitation',
        actionButtonText: 'Accept',
        actionIcon: 'mdi:check',
        actionButtonOnClick: () => {
          setModalConfirmationConfig({
            type: 'confirmation',
            title: t('Accept invitation?'),
            contentText: t('Are you sure you want to accept the invitation to join {organizationName} from {invitedByDisplayName} ({invitedByEmail})?', { invitedByDisplayName, invitedByEmail, organizationName }),
            formAction: () => axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/invitations/${id}`, {
              status: 'accepted',
            }),
            submitButtonText: t('Accept'),
            successMessageToDisplay: 'Invitation accepted',
            successHandler: () => {
              reloadCurrentPageData();
            },
          });
        },
        hasHabilitation: true,
      },
      showDeclineButton && {
        actionKey: 'decline-invitation',
        actionButtonText: 'Decline',
        actionIcon: 'mdi:close',
        actionIconColor: '#C62828',
        actionButtonOnClick: () => {
          setModalConfirmationConfig({
            type: 'deletion',
            confirmationText: invitedByEmail,
            title: t('Decline invitation?'),
            confirmationLabel: t('Confirm the decline of the invitation by typing'),
            contentText: t('Are you sure you want to decline the invitation to join {organizationName} from {invitedByDisplayName} ({invitedByEmail})?', { invitedByDisplayName, invitedByEmail, organizationName }),
            formAction: () => axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/invitations/${id}`, {
              status: 'declined',
            }),
            successMessageToDisplay: 'Invitation declined',
            successHandler: reloadCurrentPageData,
          });
        },
        hasHabilitation: true,
      },
    ].filter(Boolean)
    : [],
  });

  const tabsInfosWithCount = MY_INVITATIONS_TABS_FILTERS.map((tabInfo) => ({
    ...tabInfo,
    nb: counts[tabInfo.value],
  }));

  const {
    noRowsMessage,
  } = MY_INVITATIONS_TABLE_CONFIG[validParamValue];

  return {
    t,
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
    tableHeaders: MY_INVITATIONS_TABLE_HEADERS[validParamValue],
    nbDocuments,
    activeStatus,
    tabsInfosWithCount,
    noRowsMessage,
  };
};

export default useInvitationsPage;