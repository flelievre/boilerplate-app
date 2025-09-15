const isNegativeOrNullInteger = (n) => (
  Number.isInteger(n)
  && n <= 0
);

export default isNegativeOrNullInteger;
