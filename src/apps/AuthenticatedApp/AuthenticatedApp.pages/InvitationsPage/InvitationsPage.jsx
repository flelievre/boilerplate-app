import {
  Typography,
} from '@mui/material';
import {
  ResponsiveTable,
} from '@/utils';
import ROUTES from '@/routes';
import {
  useInvitationsPage,
} from './InvitationsPage.logic';

const InvitationsPage = () => {

  const {
    t,
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
    tableHeaders,
    nbDocuments,
    tabsInfosWithCount,
    activeStatus,
    noRowsMessage,
    generateOrganizationRoute,
  } = useInvitationsPage(); 

  return (
    <>
      <Typography
        component="h1"
        variant="h"
      >
        {t('My Invitations')}
      </Typography>
      <Typography
        component="h2"
        variant="body1"
        color="primary.dark"
        sx={{ mb: 3 }}
      >
        {t('View and manage your invitations')}
      </Typography>
      
      <ResponsiveTable
        showActionColumn={showActionColumn}
        generateOrganizationRoute={generateOrganizationRoute}
        isMobile={isMobile}
        isLoading={isLoading}
        filtersTabData={tabsInfosWithCount}
        activeFilterIndex={activeStatus}
        t={t}
        routePrefix={`${ROUTES.invitations}/`}
        hasSearchInputFocus={hasSearchInputFocus}
        setHasSearchInputFocus={setHasSearchInputFocus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hasSearched={hasSearched}
        count={nbDocuments}
        tableTitle="my-invitations-table"
        selected={selected}
        order={order}
        orderBy={orderBy}
        handleSelectAllClick={handleSelectAllClick}
        createSortHandler={createSortHandler}
        rows={rows}
        canSelect={false}
        canAddData={false}
        tableHeaders={tableHeaders}
        emptyRows={emptyRows}
        dense={dense}
        rowsPerPage={rowsPerPage}
        reloadData={reloadAllData}
        page={page}
        isTablet={isTablet}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        placeholder={t('Search by organization name or contact')}
        formattedRowsData={formattedRowsData}
        showTableAddbutton={false}
        noRowsMessage={noRowsMessage}
      />
    </>
  );
};

export default InvitationsPage;