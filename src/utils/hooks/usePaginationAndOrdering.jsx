import {
  useState,
} from 'react';

const usePaginationAndOrdering = ({
  defaultOrder = 'desc',
  defaultOrderBy = 'createdAt',
  rowsPerPageOptions = [5],
} = {}) => {
  const [order, setOrder] = useState(defaultOrder);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [isMovingBackward, setIsMovingBackward] = useState(false);
  const [isMovingForward, setIsMovingForward] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage((prevPage) => {
      if (prevPage < newPage) {
        setIsMovingForward(true);
      } else {
        setIsMovingBackward(true);
      }
      return newPage;
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    order,
    orderBy,
    page,
    createSortHandler,
    rowsPerPage,
    setPage,
    isMovingBackward,
    isMovingForward,
    setIsMovingForward,
    setIsMovingBackward,
  };
};

export default usePaginationAndOrdering;
