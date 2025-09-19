const isCardSoonExpiringOrExpired = (expMonth, expYear, monthsUntilExpire = 0) => {
  const now = new Date();

  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  console.log({
    expMonth,
    expYear,
    currentMonth,
    currentYear,
    monthsUntilExpire,
  })

  if (expYear < currentYear) {
    return {
      isExpired: true,
      isSoonExpiring: false,
    };
  }

  if (expYear === currentYear && expMonth < currentMonth) {
    return {
      isExpired: true,
      isSoonExpiring: false,
    };
  }

  if (
    (expYear === currentYear)
    && (
      (expMonth - currentMonth) <= monthsUntilExpire
    )
   ) {
    return {
      isExpired: false,
      isSoonExpiring: true,
    };
  }

  return {
    isExpired: false,
    isSoonExpiring: false,
  };
};

export default isCardSoonExpiringOrExpired;
