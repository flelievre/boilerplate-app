/*
  Created by François LELIEVRE ©
*/

/* [+] Community imports */
import {
  createContext,
} from 'react';

const BreadcrumbsContext = createContext({
  breadcrumbs: [],
  setBreadcrumbs: () => {},
  addBreadcrumb: () => {},
  removeBreadcrumb: () => {},
  clearBreadcrumbs: () => {},
});

export default BreadcrumbsContext; 