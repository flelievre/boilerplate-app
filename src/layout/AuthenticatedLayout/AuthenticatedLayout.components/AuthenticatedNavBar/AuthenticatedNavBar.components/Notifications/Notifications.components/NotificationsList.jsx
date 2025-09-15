import {
  uniqBy,
} from 'lodash';
import {
  List,
  ListSubheader,
  Grid,
  Typography,
} from '@mui/material';
import {
  ScrollAwareComponent,
} from '@/utils';

import Notification from './Notification';
import NoneNotification from './NoneNotification';
import LoadingNotification from './LoadingNotification';
import ManageNotificationsButton from './ManageNotificationsButton';
import ManageNotificationsMenu from './ManageNotificationsMenu';

const NotificationsList = ({
  notifications = [],
  onNotificationClick = () => {},
  dateFnsLocale = 'en-US',
  t = (s) => s,
  anchorManageNotificationsEl = null,
  isManageNotificationsMenuOpen = false,
  handleManageNotificationsButtonClick = () => {},
  handleManageNotificationsButtonClose = () => {},
  closeAllNotificationsMenus = () => {},
  handleNotificationsButtonClose = () => {},
  generateOrganizationRoute = () => {},
  seeAllNotifications = () => {},
  themeName = '',
  isAppLoading = false,
  loadMoreNotifications = () => {},
  canLoadMoreNotifications = false,
  areLoadingAllNotifications = false,
  setNotifMenuSkeletonWidth = () => {},
  notifBodySkeletonWidth = 0,
  notifTitleSkeletonWidth = 0,
  notifDateSkeletonWidth = 0,
}) => (
  <ScrollAwareComponent
    onScrollAtBottom={loadMoreNotifications}
    onWidthSet={setNotifMenuSkeletonWidth}
  >
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        py: 0,
        px: 1,
      }}
    >
      <ListSubheader sx={{ py: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              fontSize: '1.4em',
            }}
            color="primary.dark"
          >
            {t('Notifications')}
          </Typography>
          <ManageNotificationsButton
            t={t}
            isManageNotificationsMenuOpen={isManageNotificationsMenuOpen}
            handleManageNotificationsButtonClick={handleManageNotificationsButtonClick}
          />
          <ManageNotificationsMenu
            t={t}
            handleManageNotificationsButtonClose={handleManageNotificationsButtonClose}
            anchorManageNotificationsEl={anchorManageNotificationsEl}
            isManageNotificationsMenuOpen={isManageNotificationsMenuOpen}
            closeAllNotificationsMenus={closeAllNotificationsMenus}
            handleNotificationsButtonClose={handleNotificationsButtonClose}
            seeAllNotifications={seeAllNotifications}
            themeName={themeName}
            generateOrganizationRoute={generateOrganizationRoute}
            isAppLoading={isAppLoading}
          />
        </Grid>
      </ListSubheader>
      {areLoadingAllNotifications && (
        uniqBy(notifications, '_id').map(({ _id }) => (
          <LoadingNotification
            key={`loading-notification-${_id}`}
            notifBodySkeletonWidth={notifBodySkeletonWidth}
            notifTitleSkeletonWidth={notifTitleSkeletonWidth}
            notifDateSkeletonWidth={notifDateSkeletonWidth}
          />
        ))
      )}
      {(!areLoadingAllNotifications
      && (
        uniqBy(notifications, '_id').map((
          {
            _id = '',
            title = '',
            body = '',
            link = '',
            seen = false,
            linkType = 'external',
            params = {},
            createdAt = new Date(),
          },
          index,
        ) => (
          <Notification
            key={`shown-notification-${_id}`}
            id={_id}
            title={title}
            body={body}
            params={params}
            seen={seen}
            link={link}
            linkType={linkType}
            t={t}
            createdAt={createdAt}
            onNotificationClick={onNotificationClick}
            dateFnsLocale={dateFnsLocale}
            shouldShowDivider={(
              (notifications.length > 1)
              && (index !== uniqBy(notifications, '_id').length - 1)
            )}
          />
        )))
      )}
      {(notifications.length === 0) && (
        <NoneNotification
          t={t}
        />
      )}
      {(canLoadMoreNotifications && ([0, 1].map((i) => (
        <LoadingNotification
          key={`loading-notification-${i}`}
          notifBodySkeletonWidth={notifBodySkeletonWidth}
          notifTitleSkeletonWidth={notifTitleSkeletonWidth}
          notifDateSkeletonWidth={notifDateSkeletonWidth}
        />
      ))))}
    </List>
  </ScrollAwareComponent>
);

export default NotificationsList;
