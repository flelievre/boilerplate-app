import {
  Divider,
  ListItem,
  ListItemText,
  ListItemButton,
  Icon,
  Grid,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  formatDistanceToNow,
} from 'date-fns';
import {
  capitalize,
} from 'lodash';

const Notification = ({
  id = '',
  link = '',
  title = '',
  linkType = 'external',
  body = '',
  seen = false,
  createdAt = new Date,
  onNotificationClick = () => {},
  shouldShowDivider = false,
  params = {},
  dateFnsLocale = 'en-US',
  t = (s) => s,
}) => (
  <>
    <ListItem
      alignItems="flex-start"
      sx={{
        p: 0,
        cursor: 'pointer',
      }}
      onClick={() => onNotificationClick({
        notificationId: id,
        isNotificationSeen: seen,
        link,
        linkType,
      })}
    >
      <ListItemButton
        sx={{
          opacity: seen
            ? 0.5
            : 1,
          borderRadius: '0.5em',
        }}
      >
        <Grid
          direction="column"
          container
        >
          <ListItemText
            primary={(
              <>
                {!seen && (
                  <IconifyIcon
                    icon="material-symbols:fiber-manual-record"
                    style={{
                      marginRight: '5px',
                    }}
                  />
                )}
                  {t(title, params)}
                </>
            )}
            primaryTypographyProps={{
              fontWeight: 'bold',
              fontSize: '0.9em',
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
            }}
          />
          <ListItemText
            primary={t(body, params)}
            secondary={capitalize(formatDistanceToNow(createdAt, { addSuffix: true, locale: dateFnsLocale }))}
            primaryTypographyProps={{ fontSize: '0.85em' }}
            secondaryTypographyProps={{ fontSize: '0.7em', fontStyle: 'italic' }}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
    {shouldShowDivider && (
      <Divider component="li" sx={{
        width: '95%',
        mx: 'auto',
      }} />
    )}
  </>
);

export default Notification;
