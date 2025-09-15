import {
  useInformationTab,
} from './InformationTab.logic';
import {
  Typography,
  Paper,
  Box,
} from '@mui/material';

const InformationTab = () => {
  const {
    t,
    currentOrganization,
  } = useInformationTab();

  return (
    <Paper
      elevation={1}
      sx={{ p: 3 }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('Organization Information')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('Manage your organization\'s basic information and details.')}
        </Typography>
        {/* TODO: Add form components for organization information */}
      </Box>
    </Paper>
  );
};

export default InformationTab;
