import React from 'react';
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
} from '@mui/material';
import {
  Link as ReactRouterLink,
} from 'react-router';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const BreadcrumbsDesktop = ({
  breadcrumbs = [],
  showFirstSeparator = true,
  t = (s) => s,
  ...props
}) => (
  <Box sx={(theme) => ({
    display: 'inline-block',
    ml: showFirstSeparator
      ? 2
      : 4,
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  })}>
    <Typography
      variant="body2"
      sx={{
        display: 'inline-block',
        justifyContent: 'center',
        fontSize: '1rem',
        lineHeight: 1.5,
        mr: 1,
      }}
    >
      › 
    </Typography>
    <Breadcrumbs 
      separator="›" 
      aria-label="breadcrumb"
      sx={{ display: 'inline-block' }}
      {...props}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <Link
          component={ReactRouterLink}
          key={index}
          underline="hover"
          color="inherit"
          to={breadcrumb.to}
        >
          <IconifyIcon
            icon={breadcrumb.icon}
            style={{
              verticalAlign: 'middle',
              marginRight: 2,
              marginBottom: 3,
            }}
          />
          {t(breadcrumb.label)}
        </Link>
      ))}
    </Breadcrumbs>
  </Box>
);

export default BreadcrumbsDesktop; 