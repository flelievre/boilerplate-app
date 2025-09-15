import {
  ListItem,
  ListItemText,
  ListItemButton,
  Skeleton,
} from '@mui/material';

const LoadingNotification = ({
  notifBodySkeletonWidth = 0,
  notifTitleSkeletonWidth = 0,
  notifDateSkeletonWidth = 0,
}) => (
  <ListItem
    alignItems="flex-start"
    sx={{
      p: 0,
      maxWidth: 360,
    }}
  >
    <ListItemButton
      sx={{
        cursor: 'default',
      }}
    >
      <ListItemText
        primary={(
          <Skeleton width={notifTitleSkeletonWidth} />
        )}
        secondary={(
          <>
            <Skeleton width={notifBodySkeletonWidth} />
            <Skeleton width={notifDateSkeletonWidth} />
          </>
        )}
      />
    </ListItemButton>
  </ListItem>
);

export default LoadingNotification;
