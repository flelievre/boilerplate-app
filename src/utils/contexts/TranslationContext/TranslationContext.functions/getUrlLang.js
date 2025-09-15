const getUrlLang = (appSupportedLanguages) => {
  const pathLang = window.location.pathname.split('/')[1];
  return appSupportedLanguages.includes(pathLang) ? pathLang : null;
};

export default getUrlLang;
