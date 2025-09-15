import {
  useState,
  useEffect,
} from 'react';

import useBoolean from './useBoolean';

const useTableUtils = ({
  isMobile = false,
  isLoading = false,
  isMovingBackward = false,
  rowsPerPage = 5,
  rows = [],
  rowsCount = 0,
  page = 0,
} = {}) => {
  const [selected, setSelected] = useState([]);
  const {
    value: dense,
    setValue: setDense,
  } = useBoolean({ defaultValue: !isMobile });

  useEffect(() => {
    if (isMobile) {
      setDense(true);
    } else {
      setDense(false);
    }
  }, [isMobile, setDense]);

  const handleSelectAllClick = (event, uniqueIdentifierKey) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n[uniqueIdentifierKey]);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, uniqueIdentifier) => {
    const selectedIndex = selected.indexOf(uniqueIdentifier);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uniqueIdentifier);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (uniqueIdentifier) => selected.indexOf(uniqueIdentifier) !== -1;

  const emptyRows = ((page > 0) && (!isLoading || isMovingBackward))
    ? Math.max(0, (1 + page) * rowsPerPage - rowsCount)
    : 0;

  return {
    isSelected,
    emptyRows,
    selected,
    dense,
    handleSelectAllClick,
    handleClick,
    isLoading,
  };
};

export default useTableUtils;
