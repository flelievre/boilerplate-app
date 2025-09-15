import {
  useContext,
} from 'react';
import {
  AppContext,
} from '@/utils';

const usePlanForm = () => {
  const {
    t,
  } = useContext(AppContext);

  return {
    t,
  };
};

export default usePlanForm;
