import {
  Link as ReactRouterLink,
} from 'react-router';
import {
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';

const TabsFilters = ({
  activeIndex = 0,
  ariaLabel = 'filters',
  generateOrganizationRoute = (route) => route,
  t = (s) => s,
  routePrefix = '',
  routeSuffix = '',
  tabsData = [],
  isMobile = false,
  isLoading = false,
}) => (
  <Tabs
    value={activeIndex}
    variant="scrollable"
    scrollButtons={false}
    aria-label={ariaLabel}
    allowScrollButtonsMobile
    sx={{
      width: isMobile ? 'calc(100vw - 100px)' : 'default',
      overflowX: 'auto',
      boxShadow: 'rgba(145, 158, 171, 0.08) 0px -2px 0px 0px inset',
      height: '60px',
      marginBottom: '20px',
    }}
  >
    {tabsData.map(({
      label = '',
      nb = 0,
      color = 'primary.main',
      value = '',
    }, index) => (
      <Tab
        key={value}
        label={t(label)}
        disableRipple
        component={ReactRouterLink}
        disabled={isLoading}
        icon={(
          <Avatar
            variant="rounded"
            sx={{
              width: 24,
              height: 24,
              bgcolor: color,
              fontSize: 14,
              opacity: (activeIndex === index) ? 1 : 0.6,
            }}
          >
            {(isLoading
              ? (
                <CircularProgress size={14} sx={{ color: 'white' }} />
              )
              : (
                nb
              )
            )}
          </Avatar>
        )}
        iconPosition="end"
        className="paper-filter-tab"
        sx={{
          padding: 0,
          marginRight: isMobile ? 1 : 3,
        }}
        to={generateOrganizationRoute(`${routePrefix}${value}${routeSuffix}`)}
      />
    ))}
  </Tabs>
);

export default TabsFilters;
