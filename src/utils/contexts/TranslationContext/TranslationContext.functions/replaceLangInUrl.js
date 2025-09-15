const replaceLangInUrl = (newLanguage) => {
  const {
    pathname,
  } = window.location;
  const [, ...route] = pathname.split('/');
  console.log('route', route, pathname.split('/'));
  return (route.length > 0)
    ? ([newLanguage, ...route].join('/'))
    : `${newLanguage}/`;
};

export default replaceLangInUrl;
