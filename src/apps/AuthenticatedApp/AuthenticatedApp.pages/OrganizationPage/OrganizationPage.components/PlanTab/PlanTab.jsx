import {
  usePlanTab,
} from './PlanTab.logic';
import {
  Typography,
  Paper,
  Stack,
  Button,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  EditableText,
  generateProgressColor,
} from '@/utils';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const PlanTab = () => {
  const {
    t,
    planName,
    planMaxCredits,
    hasSubscription,
    formatDate,
    currentPeriodEnd,
    isMobile,
    periodicity,
    creditsProgressBarValue,
    credits,
    progressBarWidth,
    startFunnelOrManageSubscription,
  } = usePlanTab();

  return (
    <>
      <Typography
        component="h2"
        color="primary.main"
      >
        {t('Current plan')}
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row">
            <EditableText
              isLoading={false}
              canEdit={false}
              label={t('Plan')}
              value={planName}
              aria-label="Edit plan"
              skeletonWidth={140}
              isMobile={isMobile}
              t={t}
              labelSx={{
                minWidth: 110,
              }}
            />
            <Box sx={{
              pt: isMobile ? 4 : 0,
            }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  verticalAlign: 'top',
                  maxHeight: '30px',
                }}
                size="small"
                onClick={startFunnelOrManageSubscription}
              >
                {t('Upgrade')}
              </Button>
            </Box>
          </Stack>
          <Box
            sx={{
              maxWidth: progressBarWidth,
            }}
          >
          <Typography
              variant="caption"
              display="block"
            >
              {`${credits}/${planMaxCredits} ${t('credits left')}`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={creditsProgressBarValue}
              sx={{
                borderRadius: 2.5,
              }}
              color={generateProgressColor(creditsProgressBarValue)}
            />
          </Box>
          {hasSubscription && (
            <>
              <EditableText
                isLoading={false}
                canEdit={false}
                label={t('Periodicity')}
                value={periodicity}
                aria-label="Edit periodicity"
                skeletonWidth={140}
                isMobile={isMobile}
                labelSx={{
                  minWidth: 110,
                }}
                t={t}
              />
              <EditableText
                isLoading={false}
                canEdit={false}
                label={t('Next renewal')}
                value={formatDate(currentPeriodEnd)}
                aria-label="Edit next renewal"
                skeletonWidth={140}
                isMobile={isMobile}
                labelSx={{
                  minWidth: 110,
                }}
                t={t}
              />
              <EditableText
                isLoading={false}
                canEdit={false}
                label={t('Monthly credits')}
                value={planMaxCredits}
                aria-label="Edit max credits"
                skeletonWidth={140}
                isMobile={isMobile}
                t={t}
              />
            </>
        )}
        </Stack>
      </Paper>
      <Typography
        component="h2"
        color="primary.main"
        sx={{
          mt: 2,
        }}
      >
        {t('Cancellation')}
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.secondary',
            }}
          >
            <IconifyIcon icon="akar-icons:info" />
            <Typography variant="body2" color="text.secondary">
              {`${t('Subscriptions can be cancelled at any time')}.`}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: isMobile ? 2.75 : 0,
            }}
          >
              <Button
                color="error"
                variant="outlined"
                sx={{
                  verticalAlign: 'top',
                  maxHeight: '30px',
                }}
                size="small"
                disabled={!hasSubscription}
              >
                {t('Cancel subscription')}
              </Button>
            </Box>
          </Stack>
      </Paper>
    </>
  );
};

export default PlanTab;
