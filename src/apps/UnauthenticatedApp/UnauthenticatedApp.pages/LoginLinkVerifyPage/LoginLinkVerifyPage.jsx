import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  PageWithImage,
  Copyright,
} from '@/utils';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  useLoginLinkVerifyPage,
 } from './LoginLinkVerifyPage.logic';

const LoginLinkVerifyPage = () => {
  const {
    isMobile,
    t,
    logoLarge,
    VITE_APP_NAME,
    onGoBack,
    isShowingAMessage,
    error,
    success,
  } = useLoginLinkVerifyPage();

  return (
    <PageWithImage
      isMobile={isMobile}
    >
      <Box>
        <img
          src={logoLarge}
          alt={`${VITE_APP_NAME}-logo-small`}
          style={{
            width: 200,
          }}
        />
      </Box>
      <Box
        sx={{
          width: '95%',
          mt: isMobile ? 2 : 5,
          maxWidth: 500,
        }}
      >
        <Divider
          flexItem
          sx={{
            px: 5,
            mb: isMobile
              ? 2
              : 5,
          }}
        />
        <Typography
          component="h1"
          variant="h"
          textAlign={isMobile ? 'center' : 'left'}
          sx={{ mb: 1 }}
        >
          {!isShowingAMessage && t('Verifying your login link')}
          {error && t('Authentication failed')}
          {success && t('Authentication successful')}
        </Typography>
        {(!isShowingAMessage && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            size={{
              xs: 12
            }}
          >
              <CircularProgress
                size={40}
                sx={{
                  mt: 2.5,
                  mb: 2.5,
                }}
              />
            </Grid>
          ))}
          {isShowingAMessage && (
            <Grid>
              <Alert
                sx={{
                  my: 2,
                }}
                icon={false}
                severity={(
                  error
                    ? 'error'
                    : 'success'
                )}
                slotProps={{
                  message: {
                    sx: {
                      textAlign: isMobile
                        ? 'center'
                        : 'left',
                      minWidth: isMobile
                      ? '100%'
                      : 0,
                    },
                  },
                }}
              >
                {t(success || error)}
              </Alert>
            </Grid>
          )}
          {error && (
        <Grid
          container
          spacing={0}
          sx={{ mt: 3 }}
        >
          <Grid
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          >
            <Button
              fullWidth
              startIcon={<IconifyIcon icon="mdi:arrow-left" />}
              variant="text"
              onClick={onGoBack}
            >
              {t('Try again')}
            </Button>
          </Grid>
        </Grid>
          )}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Box>
    </PageWithImage>
  );
};

export default LoginLinkVerifyPage; 