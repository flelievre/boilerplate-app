import React, {
  useMemo,
} from 'react';
import BreadcrumbsContext from './BreadcrumbsContext';
import useBreadcrumbsContextLogic from './BreadcrumbsContext.logic/useBreadcrumbsContextLogic';

const BreadcrumbsProvider = ({
  children = <></>,
  initialBreadcrumbs = [],
}) => {
  const {
    ...valuesToProvide
  } = useBreadcrumbsContextLogic(initialBreadcrumbs);

  return useMemo(() => (
    <BreadcrumbsContext.Provider
      value={{ ...valuesToProvide }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  ), [JSON.stringify({ ...valuesToProvide })]);
};

export default BreadcrumbsProvider; 