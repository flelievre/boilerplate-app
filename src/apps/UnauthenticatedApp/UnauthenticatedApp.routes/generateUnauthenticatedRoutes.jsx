import {
  Route,
  Navigate,
} from 'react-router';
import {
  UnauthenticatedLayout,
 } from '@/layout';
import {
  LoginLinkRequestPage,
  LoginLinkSentPage,
  LoginLinkVerifyPage,
  InvitationUnauthenticatedManagementPage,
} from '../UnauthenticatedApp.pages';
import ROUTES from '@/routes';

const generateUnauthenticatedRoutes = ({
  generateRoute,
}) => {
  const storedEmail = localStorage.getItem('emailForLoginLink');
  return [
    <Route
      path="/:lang"
      element={(
        <UnauthenticatedLayout />
      )}
    >
      <Route
        path={ROUTES.invitationUnauthenticatedManagement}
        element={(
          <InvitationUnauthenticatedManagementPage />
        )}
      />
      <Route
        path={ROUTES.loginLinkRequest}
        element={(
          <LoginLinkRequestPage />
        )}
      />
      <Route
        path={ROUTES.loginLinkSent}
        element={(
          storedEmail
          ? <LoginLinkSentPage />
          : <Navigate to={`${generateRoute(ROUTES.loginLinkRequest)}?next=${encodeURIComponent(location.pathname + location.search)}`} />
        )}
      />
      <Route
        path={ROUTES.loginLinkVerify}
        element={(
          <LoginLinkVerifyPage />
        )}
      />
      <Route
        path=""
        element={(
          <Navigate to={`${generateRoute(ROUTES.loginLinkRequest)}?next=${encodeURIComponent(location.pathname + location.search)}`} />
        )}
      />
      <Route
        path="*"
        element={(
          <Navigate to={`${generateRoute(ROUTES.loginLinkRequest)}?next=${encodeURIComponent(location.pathname + location.search)}`} />
        )}
      />
    </Route>
  ];
};

export default generateUnauthenticatedRoutes;