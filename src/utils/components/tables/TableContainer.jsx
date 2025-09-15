import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  Table,
  TableContainer as MaterialTableContainer,
  TablePagination,
  Box,
  Grid,
  LinearProgress,
  IconButton,
  Alert,
  Button,
  Tooltip,
} from '@mui/material';
import TableHead from './TableHead';
import TableBody from './TableBody';
import {
  SearchBar,
} from '../search';

const TableContainer = ({
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
  showTableAddbutton = true,
  isLoading = false,
  tableHeaders = [],
  t = (s) => s,
  emptyRows = 0,
  dense = false,
  children = <></>,
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
  isMobile = false,
  isTablet = false,
  tableLayout = 'fixed',
  tableSx = {},
  placeholder = 'Search by name',
  addItemIcon = 'material-symbols:add',
  stickyHeader = false,
  showActionColumn = false,
  canHaveActionColumn = true,
  errorHelper = '',
  addItemTooltip = 'Add item',
  tableAddButtonLabel = 'Create',
  showSublineColumnLabel = 'See more',
}) => {
  const colSpan = tableHeaders
    .filter(({ hiddenOnMobile = false }) => (
      !isMobile || (isMobile && !hiddenOnMobile)
    )).reduce((acc, { colSpan: tableHeaderColSpan = 0 }) => (
      acc + +tableHeaderColSpan
    ), 0) - +(!showActionColumn && canHaveActionColumn && !isMobile);
  return (
    <>
      {allowSearching && (
        <Grid
          container
          spacing={0}
        >
          <SearchBar
            hasSearched={hasSearched}
            hasSearchInputFocus={hasSearchInputFocus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setHasSearchInputFocus={setHasSearchInputFocus}
            placeholder={t(placeholder)}
            paddingLeft={canAddData ? '100px' : '50px'}
          />
          {canAddData && (
            <Tooltip title={t(addItemTooltip)}>
              <IconButton
                color="primary"
                onClick={handleAddButtonClick}
                sx={{
                  maxHeight: 40,
                  ml: 1,
                  mt: 0.3,
                }}
              >
                <IconifyIcon
                  icon={addItemIcon}
                  style={{
                    fontSize: '1.1em',
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={t('Refresh')}>
            <IconButton
              color="primary"
              onClick={reloadData}
              sx={{
                maxHeight: 40,
                mt: 0.3,
                ml: 1,
              }}
            >
              <IconifyIcon icon="ic:baseline-refresh" />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      <MaterialTableContainer
        sx={{
          maxHeight: stickyHeader
            ? 440
            : undefined,
          mt: isMobile
            ? 2
            : 0,
        }}
      >
        {(rows.length === 0) && !isLoading && (
          <Alert
            severity="info"
            color="primary"
            sx={{
              mt: 2.5,
              p: 5,
              maxWidth: '100%',
            }}
            action={(canAddData && showTableAddbutton && (
              <Button
                color="inherit"
                size="small"
                variant="outlined"
                onClick={handleAddButtonClick}
              >
                {t(tableAddButtonLabel)}
              </Button>
            ))}
          >
            {t(noRowsMessage)}
          </Alert>
        )}
        {(rows.length > 0) && (
          <Table
            sx={{ ...tableSx }}
            aria-labelledby={tableTitle}
            size={dense ? 'small' : 'medium'}
            style={{
              tableLayout,
            }}
            stickyHeader={stickyHeader}
          >
            <TableHead
              errorHelper={errorHelper}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={createSortHandler}
              rowCount={rows.length}
              canSelect={canSelect}
              tableHeaders={tableHeaders}
              isMobile={isMobile}
              isTablet={isTablet}
              t={t}
              colSpan={colSpan}
              showSublineColumnLabel={showSublineColumnLabel}
            />
            <TableBody
              emptyRows={emptyRows}
              dense={dense}
              colSpan={colSpan}
            >
              {children}
            </TableBody>
          </Table>
        )}
      </MaterialTableContainer>
      {allowPagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          labelRowsPerPage={(
            isMobile
              ? ''
              : t('Rows per page')
          )}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => (
            t('{from}–{to} of {count}', { from, to, count })
          )}
        />
      )}
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
};

export default TableContainer;
