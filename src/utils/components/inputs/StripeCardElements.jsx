import {
  useState,
} from 'react';
import {
  CardElement,
} from '@stripe/react-stripe-js';
import {
  useTheme,
} from '@mui/material/styles';
import {
  FormHelperText,
  FormControl,
  InputLabel,
} from '@mui/material';

const StripeCardElements = ({ label, error, ...props }) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [empty, setEmpty] = useState(true);

  const handleChange = (e) => {
    setEmpty(e.empty);
    if (props.onChange) props.onChange(e);
  };

  const stripeStyle = {
    base: {
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      fontSize: '16px',
      '::placeholder': { color: theme.palette.text.disabled },
      iconColor: theme.palette.text.secondary,
    },
    invalid: {
      color: theme.palette.error.main,
      iconColor: theme.palette.error.main,
    },
  };

  const borderColor = error
    ? theme.palette.error.main
    : focused
    ? theme.palette.primary.main
    : theme.palette.mode === 'dark'
    ? theme.palette.grey[600]
    : theme.palette.divider;

  const labelShrink = focused || !empty;

  return (
    <FormControl fullWidth error={!!error} variant="outlined">
      {label && (
        <InputLabel
          shrink={labelShrink}
          style={{
            position: 'absolute',
            left: 12,
            top: labelShrink ? -6 : 16,
            fontSize: labelShrink ? 12 : 16,
            color: error ? theme.palette.error.main : theme.palette.text.secondary,
            background: theme.palette.background.paper,
            padding: '0 4px',
            transition: 'all 0.2s ease-out',
            pointerEvents: 'none',
          }}
        >
          {label}
        </InputLabel>
      )}
      <div
        style={{
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          padding: '16.5px 14px',
          transition: 'border-color 0.2s',
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
        }}
        onMouseEnter={(e) => !focused && !error && (e.currentTarget.style.borderColor = theme.palette.text.primary)}
        onMouseLeave={(e) => !focused && !error && (e.currentTarget.style.borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.divider)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <CardElement options={{ style: stripeStyle }} onChange={handleChange} {...props} />
      </div>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default StripeCardElements;
