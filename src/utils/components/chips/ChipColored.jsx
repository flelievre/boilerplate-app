import {
  Chip,
} from '@mui/material';
import {
  InlineIcon,
} from '@iconify/react';
import {
  isLightColor,
} from '../../functions/colors';

const ChipColored = ({
  color = '',
  label = '',
  t = (s) => s,
  sx = {},
  canEdit = false,
  iconColor = undefined,
  icon = '',
  size = 'medium',
  onEdit = () => {},
  editIcon = 'mdi:pencil',
  ...props
}) => {
  const defaultIconColor = isLightColor(color)
    ? undefined
    : 'rgba(255, 255, 255, 0.7)';
  // eslint-disable-next-line
  const finalIconColor = !!iconColor
    ? iconColor
    : defaultIconColor;
  return (
    <Chip
      label={t(label)}
      size={size}
      sx={{
        backgroundColor: color,
        color: isLightColor(color)
          ? 'black'
          : 'white',
        '&:hover': {
          bgcolor: color, // Keeps the background color the same as the default
        },
        ...sx,
      }}
      onDelete={(
        canEdit
          ? onEdit
          : undefined
      )}
      onClick={(
        canEdit
          ? onEdit
          : undefined
      )}
      icon={(
        icon
          ? (
            <InlineIcon
              icon={icon}
              style={{
                color: finalIconColor,
              }}
            />
          )
          : undefined
      )}
      deleteIcon={(
        canEdit
          ? (
            <InlineIcon
              icon={editIcon}
              style={{
                color: finalIconColor,
              }}
            />
          )
          : undefined
      )}
      // eslint-disable-next-line
      {...props}
    />
  );
};

export default ChipColored;
