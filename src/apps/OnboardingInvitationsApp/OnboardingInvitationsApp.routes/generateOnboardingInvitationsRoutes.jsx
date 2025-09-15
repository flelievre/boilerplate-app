import {
  Route,
  Navigate,
} from 'react-router';
import {
  UnauthenticatedLayout,
 } from '@/layout';
import {
  OnboardingInvitationsPage,
} from '../OnboardingInvitationsApp.pages';
import ROUTES from '@/routes';

const generateOnboardingInvitationsRoutes = ({
  generateRoute,
}) => {
  return [
    <Route
      path="/:lang"
      element={(
        <UnauthenticatedLayout />
      )}
    >
      <Route
        path={ROUTES.acceptInvitations}
        element={(
          <OnboardingInvitationsPage />
        )}
      />
      <Route
        path=""
        element={(
          <Navigate
            to={(
              generateRoute(ROUTES.acceptInvitations)
            )}
          />
        )}
      />
      <Route
        path="*"
        element={(
          <Navigate
            to={(
              generateRoute(ROUTES.acceptInvitations)
            )}
          />
        )}
      />
    </Route>
  ];
};

export default generateOnboardingInvitationsRoutes; 