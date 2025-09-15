import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  Link,
} from 'react-router';
import {
  Paper,
  Tabs,
  Tab,
} from '@mui/material';

const TabsMenu = ({
  activeTabIndex = 0,
  disableRipple = false,
  disableFocusRipple = false,
  tabInfos = [],
  tabsUriBaseRoute = '',
  t = (s) => s,
  sxTabs = {},
  sxBox = {},
  variant = 'scrollable',
  scrollButtons = false,
  onClick = () => {},
}) => (
  <Paper
    sx={{
      borderBottom: 1,
      borderColor: 'divider',
      ...sxBox,
    }}
  >
    <Tabs
      value={activeTabIndex}
      variant={variant}
      scrollButtons={scrollButtons}
      allowScrollButtonsMobile
      sx={{
        height: '60px',
        ...sxTabs,
      }}
    >
      {(
        tabInfos
          .filter(({
            isAuthorized = true,
          }) => (
            isAuthorized
          ))
          .map(({
            routeTo = '',
            label = '',
            icon = '',
            iconPosition = 'start',
            iconColor = 'inherit',
          }) => (
            <Tab
              key={label}
              iconPosition={iconPosition}
              icon={(
                (icon !== '')
                  ? (
                    <IconifyIcon
                      icon={icon}
                      style={{
                        color: iconColor,
                      }}
                    />
                  )
                  : undefined
              )}
              disableFocusRipple={disableFocusRipple}
              disableRipple={disableRipple}
              label={t(label)}
              component={Link}
              onClick={() => onClick(routeTo)}
              to={`${tabsUriBaseRoute}/${routeTo}`}
            />
          ))
      )}
    </Tabs>
  </Paper>
);

export default TabsMenu;
