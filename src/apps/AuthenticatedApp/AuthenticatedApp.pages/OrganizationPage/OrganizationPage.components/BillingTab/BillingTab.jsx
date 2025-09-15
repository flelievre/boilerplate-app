import {
  useBillingTab,
} from './BillingTab.logic';
import {
  Typography,
  Paper,
  Box,
} from '@mui/material';

const BillingTab = () => {
  const {
    t,
    currentOrganization,
  } = useBillingTab();

  return (
    <Paper
      elevation={1}
      sx={{ p: 3 }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('Billing Information')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('Manage billing information and payment methods for your organization.')}
        </Typography>
        {/* TODO: Add form components for billing information */}
      </Box>
    </Paper>
  );
};

export default BillingTab;
