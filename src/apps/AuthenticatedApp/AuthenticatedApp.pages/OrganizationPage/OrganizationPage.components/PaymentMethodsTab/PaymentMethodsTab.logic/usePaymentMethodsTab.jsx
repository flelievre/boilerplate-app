import {
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  ROWS_PER_PAGE_OPTIONS,
} from '@/config';
import {
  AppContext,
  useTable,
  isCardSoonExpiringOrExpired,
  useBoolean,
} from '@/utils';
import {
  getOrganizationPaymentMethods,
} from '../PaymentMethodsTab.functions';
import {
  PAYMENT_METHODS_TABLE_HEADERS,
} from '../PaymentMethodsTab.constants';

const usePaymentMethodsTab = () => {
  const {
    currentOrganization,
    authUserHabilitations: {
      userCanReadOrganizationBillingInformation = false,
      userCanUpdateOrganizationBillingInformation = false,
    } = {},
  } = useOutletContext();
  const {
    t,
    isMobile,
    isTablet,
    dateFnsLocale,
    lang,
    isThemeDark,
    theme,
  } = useContext(AppContext);
  const {
    value: isShowingCardModal,
    setTrue: showCardModal,
    setFalse: hideCardModal,
  } = useBoolean();

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
    defaultOrderBy: 'created',
    countActiveFilter: 'paymentMethods',
    fetchFunction: ({
      ...fetchParams
    }) => getOrganizationPaymentMethods({
      organizationId: currentOrganization._id,
      ...fetchParams,
    }),
    tableHeaders: PAYMENT_METHODS_TABLE_HEADERS,
    isMobile,
    mock: {},
    filters: [],
    rowDataFormatValueProps: {
      t,
      isMobile,
      dateFnsLocale,
    },
    authUserCanGet: () => false,
    authUserCanList: userCanReadOrganizationBillingInformation,
    authUserCanUpdate: () => userCanUpdateOrganizationBillingInformation,
    authUserCanDelete: () => false,
    handleMenuEditClick: () => {
      showCardModal();
    },
    handleMenuDeleteClick: () => {},
  });

  const {
    isExpired: showCardExpiredAlert = false,
    isSoonExpiring: showCardSoonExpiringAlert = false,
  } = (rows.length > 0)
    ? isCardSoonExpiringOrExpired(rows[0].cardExpMonth, rows[0].cardExpYear)
    : {};

  const elementOptions = {
    locale: lang,
    appearance: {
      theme: isThemeDark ? 'night' : 'stripe',
      variables: {
        colorPrimary: theme.palette.primary.main,
        colorBackground: theme.palette.background.default,
        colorText: theme.palette.text.primary,
        colorDanger: theme.palette.error.main,
        fontFamily: theme.typography.fontFamily,
      }
    },
  }

  return {
    t,
    currentOrganization,
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
    PAYMENT_METHODS_TABLE_HEADERS,
    nbDocuments,
    showCardExpiredAlert,
    showCardSoonExpiringAlert,
    isShowingCardModal,
    showCardModal,
    hideCardModal,
    lang,
    elementOptions,
  };
};

export default usePaymentMethodsTab;
