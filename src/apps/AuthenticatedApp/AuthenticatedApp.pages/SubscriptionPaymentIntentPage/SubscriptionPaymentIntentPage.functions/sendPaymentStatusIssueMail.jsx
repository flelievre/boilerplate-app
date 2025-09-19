import { VITE_SUPPORT_EMAIL } from '@/config';

const sendPaymentStatusIssueMail = ({
  t,
  link,
  authUserEmail,
  authUserId,
  authUserFirstName,
  authUserLastName,
}) => {
  const subject = encodeURIComponent(t('ERROR | Payment information not found'));
  const body = encodeURIComponent(t('Hello,\n\nThe application encounters an error when retrieving the status of my payment.\nCan you please investigate the issue and come back to me as soon as possible?\n\nHere is the link where the error occurred and my account information:\n\n- Link: {link}\n- Email: {authUserEmail}\n- ID: {authUserId}\n\nBest regards,\n{authUserFirstName} {authUserLastName}', { link, authUserEmail, authUserId, authUserFirstName, authUserLastName }));
  const email = VITE_SUPPORT_EMAIL;
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};

export default sendPaymentStatusIssueMail;
