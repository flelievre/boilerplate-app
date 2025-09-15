import {
  fromNow,
} from '@/utils';

const MY_INVITATIONS_TABLE_HEADERS = {
  pending: [
    {
      id: 'organizationName',
      orderByParam: 'organizationName',
      disablePadding: false,
      label: 'Organization',
      type: 'text',
      hiddenOnMobile: false,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 2,
      mobileColSpan: 2,
      formatValue: ({ value }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'status',
      orderByParam: 'status',
      disablePadding: false,
      label: 'Status',
      hasTooltip: false,
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      type: 'chip',
      formatValue: () => ({
        name: 'Pending',
        color: 'primary.main',
      }),
    },
    {
      id: 'createdAt',
      orderByParam: 'createdAt',
      disablePadding: false,
      label: 'Invited',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
        dateFnsLocale,
      }) => fromNow(value, dateFnsLocale),
    },
    {
      id: 'invitedByDisplayName',
      orderByParam: 'invitedByDisplayName',
      disablePadding: false,
      label: 'Invited by',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
      }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'invitedByEmail',
      orderByParam: 'invitedByEmail',
      disablePadding: false,
      label: 'Sender',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
      }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'expiresAt',
      orderByParam: 'expiresAt',
      disablePadding: false,
      label: 'Expires',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
        dateFnsLocale,
      }) => (
        value ? fromNow(value, dateFnsLocale) : 'Never'
      ),
    },
    {
      id: '',
      orderByParam: '',
      disablePadding: false,
      label: '',
      type: '',
      hiddenOnMobile: false,
      hiddenOnTablet: false,
      disallowSorting: true,
      colSpan: 1,
    },
  ],
  accepted: [
    {
      id: 'organizationName',
      orderByParam: 'organizationName',
      disablePadding: false,
      label: 'Organization',
      type: 'text',
      hiddenOnMobile: false,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 2,
      mobileColSpan: 2,
      formatValue: ({ value }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'status',
      orderByParam: 'status',
      disablePadding: false,
      label: 'Status',
      hasTooltip: false,
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      type: 'chip',
      formatValue: () => ({
        name: 'Accepted',
        color: 'success.main',
      }),
    },
    {
      id: 'createdAt',
      orderByParam: 'createdAt',
      disablePadding: false,
      label: 'Invited',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
        dateFnsLocale,
      }) => fromNow(value, dateFnsLocale),
    },
    {
      id: 'invitedByDisplayName',
      orderByParam: 'invitedByDisplayName',
      disablePadding: false,
      label: 'Invited by',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
      }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'invitedByEmail',
      orderByParam: 'invitedByEmail',
      disablePadding: false,
      label: 'Sender',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
      }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'answeredAt',
      orderByParam: 'answeredAt',
      disablePadding: false,
      label: 'Accepted',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
        dateFnsLocale,
      }) => (
        value ? fromNow(value, dateFnsLocale) : 'N/A'
      ),
    },
    {
      id: '',
      orderByParam: '',
      disablePadding: false,
      label: '',
      type: '',
      hiddenOnMobile: false,
      hiddenOnTablet: false,
      disallowSorting: true,
      colSpan: 1,
    },
  ],
  expired: [
    {
      id: 'organizationName',
      orderByParam: 'organizationName',
      disablePadding: false,
      label: 'Organization',
      type: 'text',
      hiddenOnMobile: false,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 2,
      mobileColSpan: 2,
      formatValue: ({ value }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'status',
      orderByParam: 'status',
      disablePadding: false,
      label: 'Status',
      hasTooltip: false,
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      type: 'chip',
      formatValue: () => ({
        name: 'Expired',
        color: 'warning.main',
      }),
    },
    {
      id: 'createdAt',
      orderByParam: 'createdAt',
      disablePadding: false,
      label: 'Invited',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
        dateFnsLocale,
      }) => fromNow(value, dateFnsLocale),
    },
    {
      id: 'invitedByDisplayName',
      orderByParam: 'invitedByDisplayName',
      disablePadding: false,
      label: 'Invited by',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
      }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'invitedByEmail',
      orderByParam: 'invitedByEmail',
      disablePadding: false,
      label: 'Sender',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
      }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'expiresAt',
      orderByParam: 'expiresAt',
      disablePadding: false,
      label: 'Expired',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
        dateFnsLocale,
      }) => (
        value ? fromNow(value, dateFnsLocale) : 'Never'
      ),
    },
    {
      id: '',
      orderByParam: '',
      disablePadding: false,
      label: '',
      type: '',
      hiddenOnMobile: false,
      hiddenOnTablet: false,
      disallowSorting: true,
      colSpan: 1,
    },
  ],
  declined: [
    {
      id: 'organizationName',
      orderByParam: 'organizationName',
      disablePadding: false,
      label: 'Organization',
      type: 'text',
      hiddenOnMobile: false,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 2,
      mobileColSpan: 2,
      formatValue: ({ value }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'status',
      orderByParam: 'status',
      disablePadding: false,
      label: 'Status',
      hasTooltip: false,
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      type: 'chip',
      formatValue: () => ({
        name: 'Declined',
        color: 'error.light',
      }),
    },
    {
      id: 'createdAt',
      orderByParam: 'createdAt',
      disablePadding: false,
      label: 'Invited',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
        dateFnsLocale,
      }) => fromNow(value, dateFnsLocale),
    },
    {
      id: 'invitedByDisplayName',
      orderByParam: 'invitedByDisplayName',
      disablePadding: false,
      label: 'Invited by',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
      }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'invitedByEmail',
      orderByParam: 'invitedByEmail',
      disablePadding: false,
      label: 'Sender',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
      }) => (
        value || 'N/A'
      ),
    },
    {
      id: 'answeredAt',
      orderByParam: 'answeredAt',
      disablePadding: false,
      label: 'Declined',
      type: 'text',
      hiddenOnMobile: true,
      hiddenOnTablet: false,
      disallowSorting: false,
      colSpan: 1,
      formatValue: ({
        value,
        dateFnsLocale,
      }) => (
        value ? fromNow(value, dateFnsLocale) : 'N/A'
      ),
    },
    {
      id: '',
      orderByParam: '',
      disablePadding: false,
      label: '',
      type: '',
      hiddenOnMobile: false,
      hiddenOnTablet: false,
      disallowSorting: true,
      colSpan: 1,
    },
  ],
};

export default MY_INVITATIONS_TABLE_HEADERS;