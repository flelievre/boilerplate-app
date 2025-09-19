import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

const AlertLoading = ({
  t = (s) => s,
  title = '',
  message = '',
  circularProgressSize = 20,
  severity = 'info',
  icon = true,
}) => (
  <Alert
    severity={severity}
    icon={icon}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
      }}
    >
      <CircularProgress
        size={circularProgressSize}
        sx={{ mb: 2 }}
      />
      <Box>
        {title && (
          <AlertTitle>
            <b>{t(title)}</b>
          </AlertTitle>
        )}
        {message && (
          <Typography variant="body2">
            {t(message)}
          </Typography>
        )}
      </Box>
    </Box>
  </Alert>
);

export default AlertLoading;
