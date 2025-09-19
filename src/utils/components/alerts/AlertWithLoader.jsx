import {
  Alert,
  AlertTitle,
  Typography,
  Button,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import AlertLoading from './AlertLoading';

const AlertWithLoader = ({
  t = (s) => s,
  title = '',
  message = '',
  circularProgressSize = 20,
  severity = 'info',
  icon = null,
  loading = false,
  button = null,
}) => (
  loading
    ? (
      <AlertLoading
        t={t}
        title={title}
        message={message}
        circularProgressSize={circularProgressSize}
        severity={severity}
        icon={icon}
      />
    ) : (
      <Alert
        severity={severity}
        icon={icon}
      >
        <AlertTitle>
          <b>{t(title)}</b>
        </AlertTitle>
        <Typography variant="body2">
          {t(message)}
        </Typography>
        {button && (
          <Button
            variant={button.variant}
            color={button.color}
            size={button.size}
            startIcon={(
              button.icon && (
                <IconifyIcon icon={button.icon} />
              )
            )}
            sx={{
              mt: 2,
            }}
            onClick={button.onClick}
          >
            {t(button.label)}
          </Button>
        )}
      </Alert>
    )
);

export default AlertWithLoader;
