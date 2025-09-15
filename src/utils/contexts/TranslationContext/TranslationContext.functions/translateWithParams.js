const translateWithParams = (translatedString, params) => {
  let translatedStringWithParam = translatedString;
  Object.keys(params).forEach((param) => {
    translatedStringWithParam = translatedStringWithParam.replace(
      `{${param}}`,
      params[param] ?? ''
    );
  });
  return translatedStringWithParam;
};

export default translateWithParams;
