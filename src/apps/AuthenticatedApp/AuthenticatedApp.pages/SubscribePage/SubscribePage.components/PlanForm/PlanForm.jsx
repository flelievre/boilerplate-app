import {
  usePlanForm,
} from './PlanForm.logic';
import {
  Typography,
  Box,
  Container,
  Divider,
  Switch,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const PlanForm = ({
  isLoading = false,
  selectPlan = () => {},
  productsWithMonthlyOrYearlyPrice = [],
  isShowingMonthlyPrice = false,
  toggleYearlyOrMonthlyPrice = () => {},
}) => {
  const {
    t,
  } = usePlanForm();
  return (
    <Container
      id="pricing"
      sx={{
        pt: {
          xs: 8,
          sm: 12,
        },
        pb: {
          xs: 8,
          sm: 16,
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: {
          xs: 1,
        },
      }}
    >
      <Typography
        component="h1"
        variant=""
      >
        {t('Choose the perfect security plan for you')}
      </Typography>
      <Typography
        component="h2"
        variant="body1"
        color="primary.dark"
      >
        {t('You can upgrade it at any time')}
      </Typography>
      <Divider flexItem />
      <Typography variant="caption" sx={{ color: 'text.secondary', py: 2 }}>
        <b>{`“${t('With SaveDevTime, boosting significatively our security was as simple as a few lines of code')}.“`}</b>
        <br />
        {t('F. Smith, CTO, BERN')}
        .
      </Typography>
      <Divider flexItem />
      <Box
        sx={{
          width: {
            sm: '100%',
          },
          textAlign: 'center',
          py: 2,
        }}
      >
        <Typography
          variant="caption"
          color={(
            isShowingMonthlyPrice
              ? 'inherit'
              : 'primary.main'
          )}
          sx={{
            fontSize: '1em',
          }}
        >
          <b>{t('Annualy')}</b>
          {' - '}
          {t('Save more than 15%')}
        </Typography>
        <Switch
          checked={isShowingMonthlyPrice}
          onChange={toggleYearlyOrMonthlyPrice}
          sx={{
            '& .MuiSwitch-switchBase': {
              color: 'primary.main', // Thumb color when unchecked
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)', // Slight hover effect for better UX
              },
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: 'primary.main', // Thumb color when checked
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)', // Hover effect
              },
            },
            '& .MuiSwitch-track': {
              backgroundColor: 'primary.dark', // Track color (always secondary)
              opacity: 1, // Make it solid
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'primary.dark', // Track color when checked
              opacity: 1,
            },
          }}
        />
        <Typography
          variant="caption"
          color={(
            isShowingMonthlyPrice
              ? 'primary.main'
              : 'neutral.main'
          )}
          sx={{
            fontSize: '1em',
          }}
        >
          <b>{t('Monthly')}</b>
        </Typography>
      </Box>
      {/* {isLoading && !selectedPriceId && (
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minHeight: 250,
              width: '100%',
              pt: 5,
            }}
          >
            <CircularProgress />
          </Box>
        </Grid>
      )} */}
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {productsWithMonthlyOrYearlyPrice.map(({
          name = '',
          price: {
            unitAmount = 0,
            interval = 'month',
            // currency = 'eur',
            id: priceId = '',
          } = {},
          description = '',
        }, index) => (
          <Grid
            item
            key={name}
            size={{
              xs: 12,
              sm: 4,
              md: 4,
            }}
          >
            <Card
              sx={[
                {
                  p: 0.25,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                },
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    },
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {name}
                  </Typography>
                  {/* {(index === 1) && (
                    <Chip
                      icon={(
                        <IconifyIcon
                          icon="mdi:auto-awesome"
                        />
                      )}
                      label={t('Recommended')}
                    />
                  )} */}
                </Box>
                <Box
                  sx={[
                    {
                      display: 'flex',
                      alignItems: 'baseline',
                    },
                  ]}
                >
                  <Typography component="h3" variant="h4">
                    {`${unitAmount / 100}€`}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      ml: 1,
                      color: 'text.secondary',
                    }}
                  >
                    {t('tax excluded')}
                  </Typography>
                </Box>
                <Typography variant="caption" textAlign="left">
                  {`${t('per month')} ${interval === 'year' ? t('billed annualy') : ''}`}
                </Typography>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'center',
                    }}
                  >
                    <IconifyIcon
                      icon="material-symbols:check-circle-rounded"
                      style={{
                        width: 20,
                      }}
                    />
                    <Typography
                      variant="subname2"
                      component="span"
                      sx={[
                        name === 'Professional'
                          ? { color: 'grey.50' }
                          : { color: null },
                      ]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => selectPlan(priceId)}
                  loading={isLoading}
                  fullWidth
                  variant={(
                    (index === 1)
                      ? 'contained'
                      : 'outlined'
                  )}
                  color={(
                    (index === 1)
                      ? 'secondary'
                      : 'primary'
                  )}
                >
                  {t('Select')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlanForm;
