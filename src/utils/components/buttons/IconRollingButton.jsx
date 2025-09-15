import React, {
  useState,
} from 'react';
import {
  IconButton,
  Box,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const ButtonWithIconRolling = ({
  onClick = () => {},
  ref = null,
  children = <></>,
  icon = 'mdi:cog',
  arrowAddedMarginLeftInPx = 0,
  ...buttonProps
} = {}) => {
  const [isHovered, setIsHovered] = useState(false);

  const arrowLeft = `${14 + arrowAddedMarginLeftInPx}px`;
  const arrowHoveredLeft = `${17 + arrowAddedMarginLeftInPx}px`;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
      // eslint-disable-next-line
      {...buttonProps}
    >
      {children}
      <IconButton
        ref={ref}
        onClick={onClick}
        style={{
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
          height: 30,
          width: 30,
        }}
      >
        <div
          style={{
            position: 'absolute',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, margin-left 0.3s ease',
            bottom: 0,
            transform: `rotate(${isHovered ? '-10deg' : '0'})`,
            marginLeft: isHovered ? '-5px' : '0',
          }}
        >
          <IconifyIcon
            icon={icon}
            width={20}
            height={20}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            left: isHovered ? arrowHoveredLeft : arrowLeft,
            bottom: 0,
            opacity: isHovered ? 1 : 0,
            transition: 'left 0.1s ease-in, opacity 0.1s ease-in',
            overflow: 'hidden',
          }}
        >
          <IconifyIcon
            icon="material-symbols:chevron-right"
            width={20}
            height={20}
          />
        </div>
      </IconButton>
    </Box>
  );
};

export default ButtonWithIconRolling;
