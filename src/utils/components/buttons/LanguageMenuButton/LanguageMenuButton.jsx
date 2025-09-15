import React from 'react';
import {
  MenuItem,
  Menu,
  Tooltip,
  IconButton,
  Box,
} from '@mui/material';
import {
  flagFr,
  flagUs,
 } from './LanguageMenuButton.assets';
import {
  useLanguageMenuButton,
 } from './LanguageMenuButton.logic';

 const flagsByLanguage = {
   fr: flagFr,
   en: flagUs,
 };

const LanguageMenuButton = ({
  setLanguage = () => {},
  t = (s) => s,
  isMobile = false,
  lang = 'fr',
  APP_SUPPORTED_LANGUAGES = ['fr', 'en'],
} = {}) => {
  const {
    anchorEl,
    handleClick,
    handleClose,
  } = useLanguageMenuButton();

  return (
    <>
      <Tooltip
        title={t('Language')}
        aria-haspopup="true"
      >
        <IconButton
          onClick={handleClick}
          sx={{
            mr: isMobile
              ? 1.25
              : 1.5,
          }}
        >
          <Box
            sx={{
              height: 20,
            }}
          >
            <img
              src={flagsByLanguage[lang]}
              alt={`flag-${lang}`}
              style={{
                height: 15,
                marginBottom: 5,
                cursor: 'pointer',
              }}
              aria-controls="language-menu"
            />
          </Box>
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            py: 0, // <- supprime le padding vertical
          },
        }}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
            p: '0.5rem !important',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {APP_SUPPORTED_LANGUAGES.map((language, index) => (
          <MenuItem
            onClick={() => {
              setLanguage(language);
              handleClose();
            }}
            key={language}
            selected={language === lang}
            sx={{
              borderRadius: 1,
              mt: index > 0 ? 0.5 : 0,
            }}
          >
            {!!flagsByLanguage[language] && (
              <img src={flagsByLanguage[language]} alt={`flag-${language}`} style={{ height: 15, marginRight: 5 }} />
            )}
            {t(language)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenuButton;
