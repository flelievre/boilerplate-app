import {
  flatten,
} from 'lodash';

import {
  extractObjValuesFromCollectionOfAttributes,
  formatRowsData,
} from '../functions';

import usePaginationAndOrdering from './usePaginationAndOrdering';
import usePaginatedSearchableData from './usePaginatedSearchableData';
import useTableUtils from './useTableUtils';

const useTable = ({
  rowsPerPageOptions = [5, 10, 20],
  defaultOrder = 'desc',
  defaultOrderBy = 'createdAt',
  fetchFunction = () => [],
  populateRowsWithAdditionalInfos = (rows) => rows,
  tableHeaders = [],
  countActiveFilter = '',
  isMobile = false,
  isInitializing = false,
  mock = {},
  filters = [],
  rowDataFormatValueProps = {},
  authUserCanGet = () => {},
  authUserCanList = false,
  authUserCanUpdate = () => {},
  authUserCanDelete = () => {},
  authUserCanUpdateCheckbox = () => {},
  handleCheckboxClick = () => {},
  handleMenuEditClick = () => {},
  handleMenuDeleteClick = () => {},
  generateOtherMenuActions = () => {},
  t = (s) => s,
} = {}) => {
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    order,
    orderBy,
    page,
    setPage,
    rowsPerPage,
    createSortHandler,
    isMovingForward,
    isMovingBackward,
    setIsMovingForward,
    setIsMovingBackward,
  } = usePaginationAndOrdering({
    defaultOrder,
    defaultOrderBy,
    rowsPerPageOptions,
  });

  const {
    isLoading: isFetching,
    showingDocuments: fetchedDocuments,
    searchTerm,
    setSearchTerm,
    hasSearchInputFocus,
    setHasSearchInputFocus,
    reloadCurrentPageData,
    reloadAllData,
    counts,
    nbDocuments,
    hasSearched,
  } = usePaginatedSearchableData({
    fetchFunction,
    rowsPerPage,
    orderBy,
    order,
    filters,
    countActiveFilter,
    isAuthorizedFetching: authUserCanList,
    page,
    setPage,
    isMovingForward,
    isMovingBackward,
    setIsMovingForward,
    setIsMovingBackward,
  });

  const isLoading = isInitializing
    || isFetching;

  const mockedDocuments = fetchedDocuments.map((doc) => ({
    ...mock,
    ...doc,
  }));

  const populatedRows = populateRowsWithAdditionalInfos(mockedDocuments);

  const rows = populatedRows.map(({ id: rowId, _id: _rowId, ...otherRowProps }) => ({
    ...otherRowProps,
    ...extractObjValuesFromCollectionOfAttributes({
      obj: {
        id: _rowId || rowId,
        ...otherRowProps,
      },
      attributesArray: [
        ...tableHeaders.map(({ id }) => id),
      ],
    }),
    id: _rowId || rowId,
  }));

  const {
    isSelected,
    emptyRows,
    selected,
    dense,
    handleSelectAllClick,
    handleClick,
  } = useTableUtils({
    isMovingBackward,
    isLoading,
    isMobile,
    rowsPerPage,
    rows,
    rowsCount: nbDocuments,
    page,
  });

  const formattedRowsData = formatRowsData({
    rows,
    tableHeaders,
    rowDataFormatValueProps,
    authUserCanGet,
    authUserCanList,
    authUserCanUpdate,
    authUserCanDelete,
    handleMenuEditClick,
    handleCheckboxClick,
    handleMenuDeleteClick,
    authUserCanUpdateCheckbox,
    generateOtherMenuActions,
    t,
  });

  const showActionColumn = flatten(formattedRowsData).reduce((acc, rowData) => {
    const {
      authUserCanGet: rowDataAuthUserCanGet = false,
      authUserCanList: rowDataAuthUserCanList = false,
      authUserCanUpdate: rowDataAuthUserCanUpdate = false,
      authUserCanDelete: rowDataAuthUserCanDelete = false,
      otherMenuActions = [],
    } = rowData;
    const otherAllowedMenuActions = otherMenuActions.filter(({
      hasHabilitation = false,
    }) => (
      hasHabilitation
    ));

    return acc || (
      rowDataAuthUserCanGet
      || rowDataAuthUserCanList
      || rowDataAuthUserCanUpdate
      || rowDataAuthUserCanDelete
      || (otherAllowedMenuActions.length > 0)
    );
  }, false);

  return {
    showActionColumn,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    emptyRows,
    selected,
    dense,
    handleSelectAllClick,
    handleClick,
    createSortHandler,
    rows: populatedRows,
    formattedRowsData,
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
    counts,
    nbDocuments,
  };
};

export default useTable;
