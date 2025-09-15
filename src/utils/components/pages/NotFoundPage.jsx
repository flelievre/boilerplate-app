import React from 'react';
import {
  Grid,
  CssBaseline,
  Typography,
  Link,
} from '@mui/material';
import {
  Link as ReactRouterLink,
} from 'react-router';
// TO DO : Delete the page
const NotFoundPage = ({
  link = '',
  t = (s) => s,
}) => {
  return (
    <Grid
      container
      component="main"
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      sx={{
        height: '100dvh',
      }}
    >
      <CssBaseline />
      <Typography
        variant="h1"
        component="h1"
      >
        {t('Oops!')}
      </Typography>
      <Typography
        variant="h3"
        component="h2"
      >
        {t('We can\'t seem to find the page you\'re looking for.')}
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        color="text.secondary"
      >
        {t('Error code: 404')}
      </Typography>
      <Link
        component={ReactRouterLink}
        to={link}
        sx={{
          mt: 3,
        }}
      >
        {t('Get me back on track')}
      </Link>
    </Grid>
  );
};

export default NotFoundPage;
