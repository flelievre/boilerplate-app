const calculateProgressBarWidth = ({
  isMobile,
  planName,
}) => {
  if (isMobile) {
    return '185px';
  } else {
    return `${240 + ((planName.length - 3) * 4.5)}px`;
  }
};

export default calculateProgressBarWidth;


