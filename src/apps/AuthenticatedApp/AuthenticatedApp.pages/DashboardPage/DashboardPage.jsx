import {
  Typography,
} from '@mui/material';
import {
  useDashboardPage,
 } from './DashboardPage.logic';

const DashboardPage = () => {
  const {
    t,
  } = useDashboardPage();

  return (
    <>
      <Typography
        component="h1"
        variant=""
      >
        {t('Dashboard')}
      </Typography>
      <Typography
        component="h2"
        variant="body1"
        color="primary.dark"
      >
        {t('All your projects in one place')}
      </Typography>
    </>
  );
};

export default DashboardPage;
