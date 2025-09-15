import { useState, useCallback } from 'react';

const useBreadcrumbsContextLogic = (initialBreadcrumbs = []) => {
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);

  const addBreadcrumb = useCallback((breadcrumb) => {
    setBreadcrumbs(prev => [...prev, breadcrumb]);
  }, []);

  const removeBreadcrumb = useCallback((index) => {
    setBreadcrumbs(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbs([]);
  }, []);

  const updateBreadcrumbs = useCallback((newBreadcrumbs) => {
    setBreadcrumbs(newBreadcrumbs);
  }, []);

  return {
    breadcrumbs,
    setBreadcrumbs: updateBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
  };
};

export default useBreadcrumbsContextLogic; 