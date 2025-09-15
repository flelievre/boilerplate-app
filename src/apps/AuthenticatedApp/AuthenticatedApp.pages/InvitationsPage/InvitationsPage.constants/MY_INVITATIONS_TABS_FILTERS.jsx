const MY_INVITATIONS_TABS_FILTERS = [
  {
    value: 'pending',
    label: 'Pending',
    color: 'primary.main',
    filters: [
      {
        property: 'status',
        operator: '$eq',
        value: 'pending',
      },
      {
        property: 'expiresAt',
        operator: '$gt',
        value: 'now',
      },
    ],
  },
  {
    value: 'accepted',
    label: 'Accepted',
    color: 'success.main',
    filters: [
      {
        property: 'status',
        operator: '$eq',
        value: 'accepted',
      },
    ],
  },
  {
    value: 'expired',
    label: 'Expired',
    color: 'warning.main',
    filters: [
      {
        property: 'status',
        operator: '$eq',
        value: 'pending',
      },
      {
        property: 'expiresAt',
        operator: '$lte',
        value: 'now',
      },
    ],
  },
  {
    value: 'declined',
    label: 'Declined',
    color: 'error.light',
    filters: [
      {
        property: 'status',
        operator: '$eq',
        value: 'declined',
      },
    ],
  },
];

export default MY_INVITATIONS_TABS_FILTERS;