import React, { useState } from 'react';
import { 
  Breadcrumbs, 
  Menu, 
  MenuItem, 
  IconButton,
  Typography,
  Link,
} from '@mui/material';
import {
  Link as ReactRouterLink,
} from 'react-router';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const BreadcrumbsMobile = ({
  breadcrumbs = [],
  showFirstSeparator = true,
  t = (s) => s,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (breadcrumbs.length <= 2) {
    return (
      <>
        {showFirstSeparator && (
          <Typography
            variant="body2"
            sx={{
              display: 'inline-block',
              fontSize: '1rem',
              lineHeight: 1.5,
              mr: 1,
            }}
          >
            ›
          </Typography>
        )}
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
      </>
    );
  }

  const firstBreadcrumb = breadcrumbs[0];
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
  const middleBreadcrumbs = breadcrumbs.slice(1, -1);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        aria-labelledby="mobile-breadcrumbs-menu"
      >
        {middleBreadcrumbs.map((breadcrumb, index) => (
          <MenuItem 
            key={index}
          >
            <Link
              component={ReactRouterLink}
              key={index}
              underline="hover"
              color="text.secondary"
              to={breadcrumb.to}
              onClick={handleMenuClose}
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
          </MenuItem>
        ))}
      </Menu>
      {showFirstSeparator && (
        <Typography
          variant="body2"
          sx={{
            display: 'inline-block',
            color: 'text.secondary',
            fontSize: '1rem',
            lineHeight: 1.5,
            mr: 1,
          }}
        >
          ›
        </Typography>
      )}
      <Breadcrumbs 
        aria-label="breadcrumb"
        separator="›"
        {...props}
      >
        <Link
          component={ReactRouterLink}
          underline="hover"
          color="inherit"
          to={firstBreadcrumb.to}
        >
          <IconifyIcon
            icon={firstBreadcrumb.icon}
            style={{
              verticalAlign: 'middle',
              marginRight: 2,
              marginBottom: 3,
            }}
          />
          {t(firstBreadcrumb.label)}
        </Link>
        <IconButton 
          size="small" 
          onClick={handleMenuClick}
          aria-label="Show more breadcrumbs"
        >
          <IconifyIcon
            icon="mdi:dots-horizontal"
            width={20}
            height={20}
          />
        </IconButton>
        <Link
          component={ReactRouterLink}
          underline="hover"
          color="inherit"
          to={lastBreadcrumb.to}
        >
          <IconifyIcon
            icon={lastBreadcrumb.icon}
            style={{
              verticalAlign: 'middle',
              marginRight: 2,
              marginBottom: 3,
            }}
          />
          {t(lastBreadcrumb.label)}
        </Link>
      </Breadcrumbs>
    </>
  );
};

export default BreadcrumbsMobile; 