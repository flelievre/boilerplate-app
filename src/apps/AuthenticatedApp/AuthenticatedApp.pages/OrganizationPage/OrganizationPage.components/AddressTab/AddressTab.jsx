import {
  useAddressTab,
} from './AddressTab.logic';
import {
  Typography,
  Paper,
  Box,
} from '@mui/material';

const AddressTab = () => {
  const {
    t,
    currentOrganization,
  } = useAddressTab();

  return (
    <Paper
      elevation={1}
      sx={{ p: 3 }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('Organization Address')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('Manage your organization\'s address and location information.')}
        </Typography>
        {/* TODO: Add form components for organization address */}
      </Box>
    </Paper>
  );
};

export default AddressTab;
