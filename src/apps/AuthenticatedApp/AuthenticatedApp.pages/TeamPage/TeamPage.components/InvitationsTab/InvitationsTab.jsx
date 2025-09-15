import {
  useInvitationsTab,
 } from './InvitationsTab.logic';
import {
  ResponsiveTable,
  TabPanel,
} from '@/utils';
import ROUTES from '@/routes';

const InvitationsTab = ({
  handleInviteUserButtonClick,
  activeTabIndex,
  inviteUser,
  resendInvitation,
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
    reloadAllData,
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
    tableHeaders,
    nbDocuments,
    tabsInfosWithCount,
    activeStatus,
    userCanCreateOrganizationUsers,
    tableAddButtonLabel,
    showTableAddbutton,
    noRowsMessage,
  } = useInvitationsTab({
    activeTabIndex,
    inviteUser,
    resendInvitation,
  });

  return (
    <TabPanel value={activeTabIndex} index={1}>
      <ResponsiveTable
        showActionColumn={showActionColumn}
        generateOrganizationRoute={generateOrganizationRoute}
        isMobile={isMobile}
        isLoading={isLoading}
        filtersTabData={tabsInfosWithCount}
        activeFilterIndex={activeStatus}
        t={t}
        routePrefix={`${ROUTES.team}/${ROUTES.invitations}/`}
        hasSearchInputFocus={hasSearchInputFocus}
        setHasSearchInputFocus={setHasSearchInputFocus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hasSearched={hasSearched}
        count={nbDocuments}
        tableTitle="invitations-table"
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
        placeholder="Search by email or name"
        addItemIcon="material-symbols:person-add-rounded"
        formattedRowsData={formattedRowsData}
        addItemTooltip="Invite new member"
        tableAddButtonLabel={tableAddButtonLabel}
        showTableAddbutton={showTableAddbutton}
        noRowsMessage={noRowsMessage}
      />
    </TabPanel>
  );
};

export default InvitationsTab; 