import {
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  useNavigate,
} from 'react-router';
import {
  AppContext,
} from '@/utils';
import {
  AuthUserContext,
} from '@/contexts';
import {
  VITE_APP_NAME,
  VITE_BACKEND_URL,
  axios,
} from '@/config';
import ROUTES from '@/routes';
import logoLarge from '/logo-large.jpg';

const useOnboardingInvitationsPage = () => {
  const {
    isMobile,
    isAppLoading,
    t,
    generateRoute,
  } = useContext(AppContext);
  
  const {
    invitations = [],
    authUser: {
      hasCompletedOrganizationOnboarding = false,
    } = {},
  } = useContext(AuthUserContext);
  
  const navigate = useNavigate();

  const [isRequestLoading, setIsRequestLoading] = useState(false);

  // Filter only pending invitations
  const pendingInvitations = invitations.filter(invitation => invitation.status === 'pending');
  const currentInvitation = pendingInvitations[0] || null;

  // If no more pending invitations, navigate to create organization
  useEffect(() => {
    if (pendingInvitations.length === 0) {
      navigate(generateRoute(ROUTES.createOrganization));
    }
  }, [pendingInvitations.length]);

  const handleInvitationResponse = async (status) => {
    if (!currentInvitation || isRequestLoading) return;

    setIsRequestLoading(true);
    try {
      await axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/invitations/${currentInvitation._id}`, {
        status,
      });
    } catch (error) {
      console.error('Error responding to invitation:', error);
    } finally {
      setIsRequestLoading(false);
    }
  };

  const onAcceptInvitation = () => handleInvitationResponse('accepted');
  const onDeclineInvitation = () => handleInvitationResponse('declined');

  return {
    isMobile,
    isAppLoading,
    t,
    logoLarge,
    VITE_APP_NAME,
    currentInvitation,
    pendingInvitations,
    isRequestLoading,
    onAcceptInvitation,
    onDeclineInvitation,
    hasCompletedOrganizationOnboarding,
  };
};

export default useOnboardingInvitationsPage; 