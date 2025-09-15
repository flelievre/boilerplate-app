import React from 'react';
import { BreadcrumbsDesktop, BreadcrumbsMobile } from './BreadcrumbsResponsive.components';

const BreadcrumbsResponsive = ({
  isMobile = false,
  showFirstSeparator = false,
  breadcrumbs = [],
  t = (s) => s,
  ...props
}) => {
  if (isMobile) {
    return (
      <BreadcrumbsMobile 
        breadcrumbs={breadcrumbs} 
        showFirstSeparator={showFirstSeparator}
        t={t}
        {...props} 
      />
    );
  }

  return (
    <BreadcrumbsDesktop 
      breadcrumbs={breadcrumbs}
      showFirstSeparator={showFirstSeparator}
      t={t}
      {...props} 
    />
  );
};

export default BreadcrumbsResponsive; 