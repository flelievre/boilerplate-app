import {
  Container,
  CssBaseline,
  Grid,
  CircularProgress,
  Typography,
} from '@mui/material';

const LoadingPage = ({
  t = (s) => s,
  text = 'Loading',
}) => (
  <Container component="main" maxWidth="xs">
  <CssBaseline />
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
    <Grid
      size={{
        xs: 12,
      }}
    >
      <CircularProgress />
    </Grid>
    <Grid
      size={{
        xs: 12,
      }}
    >
      <Typography variant="h4" component="h1">
        {t(text)}
      </Typography>
    </Grid>
  </Grid>
</Container>
);

export default LoadingPage;
