import useScreenType from 'react-screentype-hook';
import DEFAULT_SCREEN_BREAKPOINTS from '../ScreenContext.constants/DEFAULT_SCREEN_BREAKPOINTS';

const useScreenContextLogic = ({
  customBreakpoints = { ...DEFAULT_SCREEN_BREAKPOINTS },

} = {}) => {
  const {
    isMobile,
    isTablet,
    ...rest
  } = useScreenType({ ...customBreakpoints });
  
  const isMobileOrTablet = isMobile || isTablet;

  return {
    isMobileOrTablet,
    isMobile,
    isTablet,
    ...rest,
  };
};

export default useScreenContextLogic;
