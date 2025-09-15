const isEmptyString = (variable) => (
  (typeof variable === 'string')
  && (variable.trim() === '')
);

export default isEmptyString;
