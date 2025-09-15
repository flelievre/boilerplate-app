import {
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  AppContext,
} from '@/utils';

const useAddressTab = () => {
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

export default useAddressTab;
