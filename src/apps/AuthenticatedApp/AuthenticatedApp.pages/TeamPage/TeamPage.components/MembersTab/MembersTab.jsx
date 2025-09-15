import {
  useMembersTab,
 } from './MembersTab.logic';
import {
  ResponsiveTable,
  TabPanel,
} from '@/utils';
import ROUTES from '@/routes';

const MembersTab = ({
  handleInviteUserButtonClick,
  activeTabIndex,
}) => {
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
    generateOrganizationRoute,
    t,
    isTablet,
    ROWS_PER_PAGE_OPTIONS,
    USERS_TABLE_HEADERS,
    nbDocuments,
    reloadAllData,
    userCanCreateOrganizationUsers,
  } = useMembersTab({
    activeTabIndex,
  });

  return (
    <TabPanel value={activeTabIndex} index={0}>
      <ResponsiveTable
        showActionColumn={showActionColumn}
        generateOrganizationRoute={generateOrganizationRoute}
        isMobile={isMobile}
        isLoading={isLoading}
        t={t}
        routePrefix={`${ROUTES.team}/`}
        hasSearchInputFocus={hasSearchInputFocus}
        setHasSearchInputFocus={setHasSearchInputFocus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hasSearched={hasSearched}
        count={nbDocuments}
        tableTitle="users-table"
        selected={selected}
        order={order}
        orderBy={orderBy}
        handleSelectAllClick={handleSelectAllClick}
        createSortHandler={createSortHandler}
        rows={rows}
        canSelect={false}
        canAddData={userCanCreateOrganizationUsers}
        handleAddButtonClick={() => handleInviteUserButtonClick({
          reloadAllData,
        })}
        tableHeaders={USERS_TABLE_HEADERS}
        emptyRows={emptyRows}
        dense={dense}
        rowsPerPage={rowsPerPage}
        reloadData={reloadAllData}
        page={page}
        isTablet={isTablet}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        placeholder="Search by email, first name or last name"
        addItemIcon="material-symbols:person-add-rounded"
        formattedRowsData={formattedRowsData}
        addItemTooltip="Invite new member"
        noRowsMessage="No members found"
        tableAddButtonLabel="Invite"
      />
    </TabPanel>
  );
};

export default MembersTab; 