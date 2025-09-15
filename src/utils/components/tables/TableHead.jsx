import {
  Box,
  TableHead as MaterialTableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import {
  InlineIcon,
} from '@iconify/react';
import {
  grey,
} from '@mui/material/colors';
import {
  visuallyHidden,
} from '@mui/utils';

const TableHead = ({
  canSelect = false,
  onSelectAllClick = () => {},
  order = 'desc',
  orderBy = 'createdAt',
  numSelected = 0,
  colSpan = 0,
  rowCount = 50,
  onRequestSort = () => {},
  t = (s) => s,
  tableHeaders = [],
  isMobile = false,
  isTablet = false,
  errorHelper = '',
  showSublineColumnLabel = 'See more',
}) => {
  return (
    <MaterialTableHead>
      <TableRow>
        {canSelect && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': t('Select all'),
              }}
            />
          </TableCell>
        )}
        {!isMobile && tableHeaders.some(({
          isSubline = false,
        }) => (
          isSubline
        )) && (
          <TableCell
            sx={{
              width: 50,
              px: 2,
              color: grey[700],
              fontWeight: 800,
              fontSize: '0.85rem',
              lineHeight: '0.85rem',
            }}
          >
            {t(showSublineColumnLabel)}
          </TableCell>
        )}
        {tableHeaders
          .filter(({
            hiddenOnMobile = false,
            hiddenOnTablet = false,
            isSubline = false,
          }) => (
            (((!hiddenOnMobile && isMobile)
            || (!hiddenOnTablet && isTablet)
            || (!isMobile && !isTablet))
            && (!isMobile && !isSubline)
            )
          ))
          .reduce((acc, obj) => (
            acc.counter + obj.colSpan <= colSpan
              ? {
                counter: acc.counter + obj.colSpan,
                res: [...acc.res, obj],
              }
              : acc
          ), {
            counter: 0,
            res: [],
          })
          .res
          .map(({
            id = '',
            numeric = false,
            disablePadding = false,
            orderByParam = '',
            label = '',
            disallowSorting = false,
            colSpan: tableCellColSpan = 1,
          }) => (
            <TableCell
              key={id}
              colSpan={tableCellColSpan}
              align={numeric ? 'right' : 'left'}
              padding={disablePadding ? 'none' : 'normal'}
              sortDirection={(orderBy === orderByParam) ? order : false}
              sx={{
                color: (orderBy === orderByParam) ? grey[800] : grey[700],
                fontWeight: 800,
                textAlign: t(label).length > 15
                  ? 'center'
                  : 'left',
                fontSize: t(label).length > 15
                  ? '0.7rem'
                  : '0.85rem',
                lineHeight: t(label).length > 15
                  ? '0.7rem'
                  : '0.85rem',
              }}
            >
              <TableSortLabel
                active={orderBy === orderByParam}
                direction={orderBy === orderByParam ? order : 'asc'}
                hideSortIcon={disallowSorting}
                onClick={(
                  disallowSorting
                    ? () => {}
                    : onRequestSort(orderByParam)
                )}
                sx={{
                  cursor: disallowSorting
                    ? 'default'
                    : 'pointer',
                }}
              >
                {t(label)}
                {((orderBy === orderByParam)
                  ? (
                    <Box component="span" sx={visuallyHidden}>
                      {((order === 'desc')
                        ? 'sorted descending'
                        : 'sorted ascending'
                      )}
                    </Box>
                  )
                  : null
                )}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
      {errorHelper && (
        <TableRow>
          <TableCell
            colSpan={colSpan}
            padding="normal"
            sx={{
              color: 'error.main',
              fontWeight: 800,
              top: 81,
              textAlign: 'center',
            }}
          >
            <InlineIcon
              icon="material-symbols:error"
              width={25}
              height={25}
              style={{
                verticalAlign: 'bottom',
              }}
            />
            {t(errorHelper)}
          </TableCell>
        </TableRow>
      )}
    </MaterialTableHead>
  );
};

export default TableHead;
