const isLightColor = (hex, revert = false) => {
  // Convert hex to RGB
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Calculate the luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // A common threshold for determining light/dark color is 128
  // (out of 255 for RGB). Adjust if needed.
  return revert
    ? luminance <= 128
    : luminance > 128;
};

export default isLightColor;
