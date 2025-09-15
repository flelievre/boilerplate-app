import {
  Route,
  Navigate,
} from 'react-router';
import {
  UnauthenticatedLayout,
 } from '@/layout';
import {
  OnboardingMePage,
} from '../OnboardingProfileApp.pages';
import ROUTES from '@/routes';

const generateOnboardingProfileRoutes = ({
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
        path={(ROUTES.configureMe)}
        element={(
          <OnboardingMePage />
        )}
      />
      <Route
        path=""
        element={(
          <Navigate
            to={(
              generateRoute(ROUTES.configureMe)
            )}
          />
        )}
      />
      <Route
        path="*"
        element={(
          <Navigate
            to={(
              generateRoute(ROUTES.configureMe)
            )}
          />
        )}
      />
    </Route>
  ];
};

export default generateOnboardingProfileRoutes; 