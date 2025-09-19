import {
  fromNow,
} from '@/utils';

const PAYMENT_METHODS_TABLE_HEADERS = [
  {
    id: 'cardLast4',
    orderByParam: 'cardLast4',
    disablePadding: false,
    label: 'Card Number',
    type: 'text',
    hiddenOnMobile: false,
    hiddenOnTablet: false,
    disallowSorting: false,
    colSpan: 2,
    mobileColSpan: 2,
    formatValue: ({ value }) => (
      value ? `**** **** **** ${value}` : 'N/A'
    ),
  },
  {
    id: 'cardExp',
    orderByParam: 'cardExp',
    disablePadding: false,
    label: 'Expiration',
    type: 'text',
    hiddenOnMobile: false,
    hiddenOnTablet: false,
    disallowSorting: false,
    colSpan: 1,
    formatValue: ({ value }) => (
      value || 'N/A'
    ),
  },
  {
    id: 'created',
    orderByParam: 'created',
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

export default PAYMENT_METHODS_TABLE_HEADERS;
