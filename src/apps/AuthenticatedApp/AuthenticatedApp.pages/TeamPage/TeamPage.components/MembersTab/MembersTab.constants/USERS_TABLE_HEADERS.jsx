import {
  fromNow,
} from '@/utils';

const USERS_TABLE_HEADERS = [
  {
    id: 'email',
    orderByParam: 'email',
    disablePadding: false,
    label: 'Email',
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
    id: 'firstName',
    orderByParam: 'firstName',
    disablePadding: false,
    label: 'First name',
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
    id: 'lastName',
    orderByParam: 'lastName',
    disablePadding: false,
    label: 'Last name',
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
    id: 'createdAt',
    orderByParam: 'createdAt',
    disablePadding: false,
    label: 'Created',
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
    id: 'updatedAt',
    orderByParam: 'updatedAt',
    disablePadding: false,
    label: 'Activity',
    type: 'text',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    colSpan: 1,
    formatValue: ({
      value,
      dateFnsLocale,
    }) => (
      (value === -1)
        ? 'Never'
        : fromNow(value, dateFnsLocale)
    ),
  },
  {
    id: 'organization.label',
    isHeaderBold: true,
    orderByParam: 'organization.label',
    disablePadding: false,
    label: 'Organization',
    type: 'text',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
  },
  {
    id: 'organization.update',
    orderByParam: 'organization.update',
    disablePadding: false,
    label: 'Update information',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organization.delete',
    orderByParam: 'organization.delete',
    disablePadding: false,
    label: 'Delete the organization',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organizationUsers.label',
    isHeaderBold: true,
    orderByParam: 'organizationUsers.label',
    disablePadding: false,
    label: 'Organization users',
    type: 'text',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
  },
  {
    id: 'organizationUsers.create',
    orderByParam: 'organizationUsers.create',
    disablePadding: false,
    label: 'Invite users',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organizationUsers.read',
    orderByParam: 'organizationUsers.read',
    disablePadding: false,
    label: 'List users',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organizationUsers.update',
    orderByParam: 'organizationUsers.update',
    disablePadding: false,
    label: 'Update user profile',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organizationUsers.delete',
    orderByParam: 'organizationUsers.delete',
    disablePadding: false,
    label: 'Remove users',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organizationUsersHabilitations.label',
    isHeaderBold: true,
    orderByParam: 'organizationUsersHabilitations.label',
    disablePadding: false,
    label: 'Organization users habilitations',
    type: 'text',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
  },
  {
    id: 'organizationUsersHabilitations.read',
    orderByParam: 'organizationUsersHabilitations.read',
    disablePadding: false,
    label: 'List users habilitations',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organizationUsersHabilitations.update',
    orderByParam: 'organizationUsersHabilitations.update',
    disablePadding: false,
    label: 'Update users habilitations',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organizationBillingInformation.label',
    isHeaderBold: true,
    orderByParam: 'organizationBillingInformation.label',
    disablePadding: false,
    label: 'Organization billing information',
    type: 'text',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
  },
  {
    id: 'organizationBillingInformation.read',
    orderByParam: 'organizationBillingInformation.read',
    disablePadding: false,
    label: 'Read billing information',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'organizationBillingInformation.update',
    orderByParam: 'organizationBillingInformation.update',
    disablePadding: false,
    label: 'Update billing information',
    type: 'checkbox',
    hiddenOnMobile: true,
    hiddenOnTablet: false,
    disallowSorting: false,
    isSubline: true,
    colSpan: 1,
    formatValue: ({
      value,
    }) => (
      value || 'N/A'
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
];

export default USERS_TABLE_HEADERS;
