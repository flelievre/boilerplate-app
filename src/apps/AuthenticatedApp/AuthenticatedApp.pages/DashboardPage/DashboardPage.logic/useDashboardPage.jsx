import {
  useEffect,
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  BreadcrumbsContext,
  AppContext,
} from '@/utils';
import ROUTES from '@/routes';

const useDashboardPage = () => {
  const {
    t,
  } = useContext(AppContext);
  const {
    setActiveDrawerLinkKey,
    generateOrganizationRoute,
  } = useOutletContext();
  const {
    setBreadcrumbs,
  } = useContext(BreadcrumbsContext);

  useEffect(() => {
    setActiveDrawerLinkKey(ROUTES.dashboard);
    setBreadcrumbs([
      {
        label: 'Dashboard',
        to: generateOrganizationRoute(ROUTES.dashboard),
        sx: {
          color: 'primary.main',
        },
        icon: 'material-symbols:dashboard',
      },
    ]);
  }, []);

  return {
    t,
  };
};

export default useDashboardPage;
