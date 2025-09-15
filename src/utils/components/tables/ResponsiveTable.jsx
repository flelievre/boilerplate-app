import {
  Paper,
} from '@mui/material';
import {
  TabsFilters,
} from '../tabs';
import TableContainer from './TableContainer';
import ResponsiveTableRow from './ResponsiveTableRow';

const ResponsiveTable = ({
  activeFilterIndex = 0,
  ariaLabel = 'filters',
  generateOrganizationRoute = (route) => route,
  t = (s) => s,
  routePrefix = '',
  routeSuffix = '',
  filtersTabData = [],
  isMobile = false,
  isLoading = false,
  tableTitle = '',
  selected = [],
  order = '',
  orderBy = 'desc',
  noRowsMessage = 'No data to show',
  handleSelectAllClick = () => {},
  createSortHandler = () => {},
  rows = [],
  count = rows.length,
  canSelect = false,
  canAddData = false,
  tableHeaders = [],
  emptyRows = 0,
  dense = false,
  rowsPerPageOptions = [50, 100, 250],
  rowsPerPage = 50,
  page = 0,
  handleChangePage = () => {},
  handleAddButtonClick = () => {},
  handleChangeRowsPerPage = () => {},
  reloadData = () => {},
  allowSearching = true,
  allowPagination = true,
  hasSearchInputFocus = false,
  searchTerm = '',
  setSearchTerm = () => {},
  setHasSearchInputFocus = () => {},
  hasSearched = false,
  isTablet = false,
  tableLayout = 'fixed',
  tableSx = {},
  placeholder = 'Search by name',
  addItemIcon = 'material-symbols:add',
  stickyHeader = false,
  formattedRowsData = [],
  showActionColumn = false,
  canHaveActionColumn = true,
  errorHelper = '',
  addItemTooltip = 'Add item',
  tableAddButtonLabel = 'Create',
  showTableAddbutton = true,
  showSublineColumnLabel = '',
}) => {
  const hasFilters = (filtersTabData.length > 0);
  return (
    <Paper
      sx={{
        px: 3,
        pb: 3,
        pt: hasFilters
          ? 1
          : 4,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {hasFilters && (
        <TabsFilters
          activeIndex={activeFilterIndex}
          tabsData={filtersTabData}
          t={t}
          ariaLabel={ariaLabel}
          generateOrganizationRoute={generateOrganizationRoute}
          routePrefix={routePrefix}
          routeSuffix={routeSuffix}
          isMobile={isMobile}
          isLoading={isLoading}
        />
      )}
      <TableContainer
        addItemTooltip={addItemTooltip}
        tableAddButtonLabel={tableAddButtonLabel}
        showTableAddbutton={showTableAddbutton}
        errorHelper={errorHelper}
        tableTitle={tableTitle}
        selected={selected}
        order={order}
        orderBy={orderBy}
        canHaveActionColumn={canHaveActionColumn}
        noRowsMessage={noRowsMessage}
        handleSelectAllClick={handleSelectAllClick}
        createSortHandler={createSortHandler}
        rows={rows}
        count={count}
        canSelect={canSelect}
        canAddData={canAddData}
        isLoading={isLoading}
        tableHeaders={tableHeaders}
        t={t}
        emptyRows={emptyRows}
        dense={dense}
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleAddButtonClick={handleAddButtonClick}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        reloadData={reloadData}
        allowSearching={allowSearching}
        allowPagination={allowPagination}
        hasSearchInputFocus={hasSearchInputFocus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setHasSearchInputFocus={setHasSearchInputFocus}
        hasSearched={hasSearched}
        isMobile={isMobile}
        isTablet={isTablet}
        tableLayout={tableLayout}
        tableSx={tableSx}
        placeholder={placeholder}
        addItemIcon={addItemIcon}
        stickyHeader={stickyHeader}
        showActionColumn={showActionColumn}
        showSublineColumnLabel={showSublineColumnLabel}
      >
        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
           rows.sort(getComparator(order, orderBy)).slice() */}
        {(formattedRowsData
          .map((rowData, index) => (
            <ResponsiveTableRow
              // eslint-disable-next-line
              key={`row-data-${index}`}
              isMobile={isMobile}
              isTablet={isTablet}
              rowData={rowData}
              t={t}
              rowIndex={index}
              TABLE_HEADERS={tableHeaders}
            />
          ))
        )}
      </TableContainer>
    </Paper>
  );
};

export default ResponsiveTable;
