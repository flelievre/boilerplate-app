import React, {
  useState,
  useEffect,
} from 'react';
import {
  Button,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const SubmitButton = ({
  loading = false,
  shouldShowSuccessState = false,
  shouldShowErrorState = false,
  disabledOnSuccess = false,
  disabledOnError = false,
  disabledOnDefault = false,
  sx = {},
  nbClick = 0,
  onClick = () => {},
  defaultContent = <></>,
  errorContent = <></>,
  successContent = <></>,
  defaultColor = 'primary',
  successColor = 'success',
  errorColor = 'error',
  defaultIcon = 'material-symbols-light:check',
  successIcon = 'material-symbols-light:check',
  errorIcon = 'mdi:highlight-off',
  type = 'submit',
  fullWidth = true,
  variant = 'contained',
  size = 'large',
}) => {
  const [showErrorState, setShowErrorState] = useState(false);
  const [lastNbClick, setLastNbClick] = useState(0);

  useEffect(() => {
    setLastNbClick(nbClick);
  }, [nbClick]);

  useEffect(() => {
    const timer = null;
    if (shouldShowErrorState && (nbClick > lastNbClick)) {
      setShowErrorState(true);
      setTimeout(() => {
        setShowErrorState(false);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [shouldShowErrorState, nbClick, lastNbClick]);

  const checkedErrorColor = showErrorState
    ? errorColor
    : defaultColor;

  const checkedSuccessColor = shouldShowSuccessState
    ? successColor
    : defaultColor;

  const color = showErrorState
    ? checkedErrorColor
    : checkedSuccessColor;

  const checkedErrorIcon = showErrorState
    ? errorIcon
    : defaultIcon;

  const checkedSuccessIcon = shouldShowSuccessState
    ? successIcon
    : defaultIcon;

  const icon = showErrorState
    ? checkedErrorIcon
    : checkedSuccessIcon;

  const checkedErrorIsDisabled = showErrorState
    ? disabledOnError
    : disabledOnDefault;

  const checkedSuccessIsDisabled = shouldShowSuccessState
    ? disabledOnSuccess
    : disabledOnDefault;

  const isDisabled = showErrorState
    ? checkedErrorIsDisabled
    : checkedSuccessIsDisabled;

  const checkedErrorContent = showErrorState
    ? errorContent
    : defaultContent;

  const checkedSuccessContent = shouldShowSuccessState
    ? successContent
    : defaultContent;

  const content = showErrorState
    ? checkedErrorContent
    : checkedSuccessContent;

  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      size={size}
      onClick={(shouldShowSuccessState
        ? () => {}
        : () => onClick()
      )}
      endIcon={(
        <IconifyIcon icon={icon} />
      )}
      disabled={isDisabled}
      sx={{ ...sx }}
      loading={loading}
    >
      {content}
    </Button>
  );
};

export default SubmitButton;
