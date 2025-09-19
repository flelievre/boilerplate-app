import {
  usePaymentMethodsTab,
} from './PaymentMethodsTab.logic';
import {
  ResponsiveTable,
} from '@/utils';
import {
  Alert,
  Button,
  Typography,
} from '@mui/material';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {
  stripe,
} from '@/config';
import {
  CardModal,
} from './PaymentMethodsTab.components';

const PaymentMethodsTab = () => {
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
    selected,
    dense,
    handleSelectAllClick,
    createSortHandler,
    rows,
    isLoading,
    order,
    orderBy,
    page,
    rowsPerPage,
    searchTerm,
    setSearchTerm,
    hasSearched,
    hasSearchInputFocus,
    setHasSearchInputFocus,
    formattedRowsData,
    showActionColumn,
    isMobile,
    t,
    isTablet,
    ROWS_PER_PAGE_OPTIONS,
    PAYMENT_METHODS_TABLE_HEADERS,
    nbDocuments,
    reloadAllData,
    showCardExpiredAlert,
    showCardSoonExpiringAlert,
    isShowingCardModal,
    showCardModal,
    hideCardModal,
    elementOptions,
  } = usePaymentMethodsTab();

  return (
    <>
      {showCardExpiredAlert && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            color="inherit"
            sx={{
              mb: 1,
            }}
          >
            {t('Your payment method is')} <b>{t('expired')}</b>, {t('please update it.')}
          </Typography>
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={showCardModal}
          >
            {t('Update')}
          </Button>
        </Alert>
      )}

      {showCardSoonExpiringAlert && (
        <Alert
          severity="warning"
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            color="inherit"
            sx={{
              mb: 1,
            }}
          >
            {t('Your payment method')} <b>{t('expires soon')}</b>, {t('please update it.')}
          </Typography>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={showCardModal}
          >
            {t('Update')}
          </Button>
        </Alert>
      )}
      <ResponsiveTable
        showActionColumn={showActionColumn}
        isMobile={isMobile}
        isLoading={isLoading}
        t={t}
        hasSearchInputFocus={hasSearchInputFocus}
        setHasSearchInputFocus={setHasSearchInputFocus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hasSearched={hasSearched}
        count={nbDocuments}
        tableTitle="payment-methods-table"
        selected={selected}
        order={order}
        orderBy={orderBy}
        handleSelectAllClick={handleSelectAllClick}
        createSortHandler={createSortHandler}
        rows={rows}
        allowSearching={false}
        canSelect={false}
        canAddData
        tableHeaders={PAYMENT_METHODS_TABLE_HEADERS}
        emptyRows={emptyRows}
        dense={dense}
        rowsPerPage={rowsPerPage}
        reloadData={reloadAllData}
        page={page}
        isTablet={isTablet}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        placeholder="Search by card number or expiration"
        formattedRowsData={formattedRowsData}
        noRowsMessage="No payment methods found"
        showTotal={false}
      />
      <Elements
        stripe={stripe}
        options={elementOptions}
      >
        <CardModal
          isShowingCardModal={isShowingCardModal}
          hideCardModal={hideCardModal}
          reloadAllData={reloadAllData}
        />
      </Elements>
    </>
  );
};

export default PaymentMethodsTab;
  