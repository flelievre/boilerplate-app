import {
  useAnchor,
} from '@/utils';

const useLanguageMenuButton = () => {
  const { 
    anchorEl,
    handleClick,
    handleClose,
  } = useAnchor();

  return {
    anchorEl,
    handleClick,
    handleClose,
  };
};

export default useLanguageMenuButton;
