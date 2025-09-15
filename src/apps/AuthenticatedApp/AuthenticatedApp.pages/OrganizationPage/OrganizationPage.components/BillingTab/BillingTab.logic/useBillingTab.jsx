import {
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  AppContext,
} from '@/utils';

const useBillingTab = () => {
  const {
    currentOrganization,
  } = useOutletContext();
  const {
    t,
  } = useContext(AppContext);

  return {
    t,
    currentOrganization,
  };
};

export default useBillingTab;
