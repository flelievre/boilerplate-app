import React from 'react';
import {
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Icon,
} from '@iconify/react';

const ThemeSwitcherButton = ({
  t = (s) => s,
  themeName = 'light',
  toggleTheme = () => {},
}) => (
    <Tooltip title={t('Switch theme')}>
      <IconButton
        color="inherit"
        onClick={toggleTheme}
      >
        {(
          (themeName === 'light')
            ? (
              <Icon
                icon="material-symbols-light:light-mode"
                style={{
                  color: '#E68537',
                }}
              />
            )
            : (
              <Icon
                icon="material-symbols-light:dark-mode"
                style={{
                  color: '#F1FD88',
                }}
              />
            )
        )}
      </IconButton>
    </Tooltip>
  );

export default ThemeSwitcherButton;
