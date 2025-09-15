import {
  Route,
  Navigate,
} from 'react-router';
import {
  AuthenticatedLayout,
 } from '@/layout';
import {
  DashboardPage,
  TeamPage, 
  UserProfilePage,
  InvitationsPage,
  OrganizationPage,
  SubscribePage,
} from '../AuthenticatedApp.pages';
import ROUTES from '@/routes';

const generateAuthenticatedRoutes = ({
  generateRoute,
  organizations: [
    {
      _id = '',
    } = {},
  ] = [],
}) => {
  return [
    <Route
      path="/:lang"
      element={(
        <AuthenticatedLayout />
      )}
    >
      <Route
        path={`${ROUTES.organizations}/:organizationId`}
      >
        <Route
          path={ROUTES.userPage}
          element={(
            <UserProfilePage />
          )}
        />
        <Route
          path={ROUTES.dashboard}
          element={(
            <DashboardPage />
          )}
        />
        <Route
          path={ROUTES.teamPage}
          element={(
            <TeamPage />
          )}
        />
        <Route
          path={ROUTES.invitationsPage}
          element={(
            <InvitationsPage />
          )}
        />
        <Route
          path={ROUTES.settingsPage}
          element={(
            <OrganizationPage />
          )}
        />
        <Route
          path={`${ROUTES.subscriptionFunnels}/:subscriptionFunnelId`}
          element={(
            <SubscribePage />
          )}
        />
        <Route
          index
          element={(
            <Navigate to={generateRoute(`${ROUTES.organizations}/${_id}/${ROUTES.dashboard}`)} />
          )}
        />
        <Route
          path="*"
          element={(
            <Navigate to={generateRoute(`${ROUTES.organizations}/${_id}/${ROUTES.dashboard}`)} />
          )}
        />
      </Route>
      <Route
        index
        element={(
          <Navigate to={generateRoute(`${ROUTES.organizations}/${_id}/${ROUTES.dashboard}`)} />
        )}
      />
      <Route
        path="*"
        element={(
          <Navigate to={generateRoute(`${ROUTES.organizations}/${_id}/${ROUTES.dashboard}`)} />
        )}
      />
    </Route>
  ];
};

export default generateAuthenticatedRoutes; 