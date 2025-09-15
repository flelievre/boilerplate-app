import {
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

const NoneNotification = ({
  t = (s) => s,
}) => (
  <ListItem
    alignItems="flex-start"
    sx={{
      p: 0,
    }}
  >
    <ListItemButton
      sx={{
        cursor: 'default',
      }}
    >
      <ListItemText
        primary={t('Good to know!')}
        primaryTypographyProps={{ fontWeight: 'bold' }}
        secondary={t('Your notifications will appear here.')}
        secondaryTypographyProps={{ fontSize: '0.85em' }}
      />
    </ListItemButton>
  </ListItem>
);

export default NoneNotification;
