import {
  useSecurityTab,
} from './SecurityTab.logic';
import {
  Typography,
  Paper,
  Box,
} from '@mui/material';

const SecurityTab = () => {
  const {
    t,
    currentOrganization,
  } = useSecurityTab();

  return (
    <Paper
      elevation={1}
      sx={{ p: 3 }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('Security Settings')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('Manage security settings and permissions for your organization.')}
        </Typography>
        {/* TODO: Add security settings components */}
      </Box>
    </Paper>
  );
};

export default SecurityTab;
