import {
  Box,
  Stack,
  Typography,
} from '@mui/material';
import {
  Icon,
} from '@iconify/react';
import {
  useBoolean,
} from '../../hooks';
import AvatarApiProtectedSrc from './AvatarApiProtectedSrc';

const AvatarInput = ({
  isMobile = false,
  t = (s) => s,
  disabled = false,
  avatarHoveredText = 'Update',
  avatarUrl = '',
  avatarAlt = '',
  onClick = () => {},
  mobileSize = 80,
  desktopSize = 120,
  sx = {},
}) => {
  const {
    value: isProfilePicHovered,
    setTrue: setProfilePicHovered,
    setFalse: unsetProfilePicHovered,
  } = useBoolean();
  return (
    <Box
      onMouseEnter={setProfilePicHovered}
      onMouseLeave={unsetProfilePicHovered}
      sx={{
        position: 'relative',
        width: isMobile ? mobileSize : desktopSize,
        height: isMobile ? mobileSize : desktopSize,
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        display: 'flex',
        ...sx,
      }}
      onClick={() => {
        if (isProfilePicHovered && !disabled) {
          onClick();
        }
      }}
    >
      <AvatarApiProtectedSrc
        alt={avatarAlt}
        src={avatarUrl}
        sx={{
          width: isMobile ? mobileSize : desktopSize,
          height: isMobile ? mobileSize : desktopSize,
          border: '2px solid rgb(255, 255, 255)',
          opacity: 1,
          position: 'absolute',
        }}
      />
      <Box
        sx={{
          background: 'black',
          width: isMobile ? mobileSize : desktopSize,
          height: isMobile ? mobileSize : desktopSize,
          position: 'absolute',
          borderRadius: isMobile ? mobileSize : desktopSize,
          opacity: (isProfilePicHovered && !disabled) ? 0.5 : 0,
          marginLeft: isMobile ? 0.25 : 0,
          cursor: (isProfilePicHovered && !disabled) ? 'pointer' : 'default',
        }}
      />
      {isProfilePicHovered && !disabled && (
        <Stack
          direction="column"
          spacing={isMobile ? 0 : 1}
          sx={{
            position: 'absolute',
            alignItems: 'center',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <Icon icon="ic:baseline-camera-alt" />
          <Typography
            variant={isMobile ? 'caption' : 'button'}
            component="span"
          >
            {t(avatarHoveredText)}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default AvatarInput;
