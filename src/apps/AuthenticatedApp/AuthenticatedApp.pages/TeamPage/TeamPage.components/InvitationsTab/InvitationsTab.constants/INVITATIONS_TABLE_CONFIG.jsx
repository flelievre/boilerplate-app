const INVITATIONS_TABLE_CONFIG = {
  pending: {
    tableAddButtonLabel: 'Invite',
    showTableAddbutton: true,
    noRowsMessage: 'No pending invitations found',
  },
  accepted: {
    tableAddButtonLabel: 'Invite',
    showTableAddbutton: false,
    noRowsMessage: 'No accepted invitations found',
  },
  expired: {
    tableAddButtonLabel: 'Invite',
    showTableAddbutton: false,
    noRowsMessage: 'No expired invitations found',
  },
  declined: {
    tableAddButtonLabel: 'Invite',
    showTableAddbutton: false,
    noRowsMessage: 'No declined invitations found',
  },
  cancelled: {
    tableAddButtonLabel: 'Invite',
    showTableAddbutton: false,
    noRowsMessage: 'No cancelled invitations found',
  },
};

export default INVITATIONS_TABLE_CONFIG;