import {
  useInvoicesTab,
} from './InvoicesTab.logic';
import {
  Typography,
  Paper,
  Box,
} from '@mui/material';

const InvoicesTab = () => {
  const {
    t,
    currentOrganization,
  } = useInvoicesTab();

  return (
    <Paper
      elevation={1}
      sx={{ p: 3 }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('Invoices')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('View and manage your organization\'s invoices and billing history.')}
        </Typography>
        {/* TODO: Add invoice list and management components */}
      </Box>
    </Paper>
  );
};

export default InvoicesTab;
