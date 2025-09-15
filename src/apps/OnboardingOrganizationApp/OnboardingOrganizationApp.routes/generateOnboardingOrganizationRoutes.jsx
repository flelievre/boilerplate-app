import {
  Route,
  Navigate,
} from 'react-router';
import {
  UnauthenticatedLayout,
 } from '@/layout';
import {
  OnboardingOrganizationPage,
} from '../OnboardingOrganizationApp.pages';
import ROUTES from '@/routes';

const generateOnboardingOrganizationRoutes = ({
  generateRoute,
  hasCompletedOrganizationOnboarding,
}) => {
  return [
    <Route
      path="/:lang"
      element={(
        <UnauthenticatedLayout />
      )}
    >
      <Route
        path={ROUTES.createOrganization}
        element={(
          <OnboardingOrganizationPage
            hasCompletedOrganizationOnboarding={hasCompletedOrganizationOnboarding}
          />
        )}
      />
      <Route
        path=""
        element={(
          <Navigate
            to={(
              generateRoute(ROUTES.createOrganization)
            )}
          />
        )}
      />
      <Route
        path="*"
        element={(
          <Navigate
            to={(
              generateRoute(ROUTES.createOrganization)
            )}
          />
        )}
      />
    </Route>
  ];
};

export default generateOnboardingOrganizationRoutes; 