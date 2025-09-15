const displayPrice = ({
  amount = 0,
  currency = 'eur',
}) => {
  return `${(amount / 100).toFixed(2)}${currency}`;
};

export default displayPrice;
