import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  Chip,
} from '@mui/material';

const ChipError = ({
  label = '',
  t = (s) => s,
  sx = {},
  canEdit = false,
  size = 'medium',
  onEdit = () => {},
  ...props
}) => (
  <Chip
    label={t(label)}
    variant="error"
    size={size}
    icon={(
      <IconifyIcon
        icon="mdi:alert-circle"
      />
    )}
    onDelete={(
      canEdit
        ? onEdit
        : undefined
    )}
    deleteIcon={(
      canEdit
        ? (
          <IconifyIcon
            icon="ic:baseline-edit"
          />
        )
        : undefined
    )}
    sx={{
      ...sx,
    }}
    // eslint-disable-next-line
    {...props}
  />
);

export default ChipError;
