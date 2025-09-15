import {
  useState,
} from 'react';

const useAnchor = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  

  return {
    anchorEl,
    isOpen,
    handleClick,
    handleClose,
  };
};

export default useAnchor;
