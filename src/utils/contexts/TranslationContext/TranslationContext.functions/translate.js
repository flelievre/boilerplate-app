import translateWithParams from './translateWithParams';

const translate = (
  s = '',
  params = {},
  lang = 'en',
  translations = {},
) => {
  const dict = translations[lang] || {};

  if (typeof dict !== 'object' || dict === null) {
    console.warn(`[t] Invalid dictionary provided for language "${lang}"`);
    return s;
  }

  if (!Object.prototype.hasOwnProperty.call(dict, s)) {
    return s;
  }

  const rawTranslation = dict[s];

  if (typeof rawTranslation !== 'string') {
    console.warn(`[t] Translation for key "${s}" is not a string.`);
    return s;
  }

  return translateWithParams(rawTranslation, params);
};

export default translate;
