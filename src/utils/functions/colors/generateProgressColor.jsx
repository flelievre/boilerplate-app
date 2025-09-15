const generateProgressColor = (n) => {
  if (n >= 50) {
    return 'success';
  }
  if (n >= 25) {
    return 'warning';
  }
  return 'error';
};

export default generateProgressColor;
