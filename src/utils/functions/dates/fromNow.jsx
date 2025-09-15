import {
  formatDistanceToNow,
} from 'date-fns';
import {
  capitalize,
} from 'lodash';

const fromNow = (date, locale = 'en-US') => (
  capitalize(formatDistanceToNow(date, { addSuffix: true, locale }))
);

export default fromNow;
