import {
  Checkbox,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  ChipColored,
  ChipError,
} from '../chips';

const TableRowComponent = ({
  t = (s) => s,
  type = 'text',
  value = '',
  // checked = false,
  disabled = false,
  iconName = undefined,
  isBold = false,
  handleCheckboxClick = () => {},
}) => {
  // deconstruction for chips type
  const {
    name: chipName = '',
    color: chipColor = '',
    canEdit: chipCanEdit = false,
    onEdit: chipOnEdit = () => {},
    sx: chipSx = {
      maxWidth: 125,
    },
    icon: chipIcon = undefined,
    iconColor: chipIconColor = undefined,
  } = value;

  switch (type) {
    case 'text':
      return isBold
        ? <b>{t(`${value}`)}</b>
        : `${t(`${value}`)}`;
    case 'text-not-translated':
      return isBold
        ? <b>{value}</b>
        : value;
    case 'string':
      return isBold
        ? <b>{t(`${value}`)}</b>
        : `${t(`${value}`)}`;
    case 'checkbox':
      return (
        <Checkbox
          color="primary"
          checked={value}
          size="small"
          disabled={disabled}
          onClick={handleCheckboxClick}
        />
      );
    case 'icon':
      return (
        <IconifyIcon
          icon={iconName}
          height={25}
        />
      );
    case 'chip':
      return (
        chipName
          ? (
            <ChipColored
              label={t(chipName)}
              color={chipColor}
              canEdit={chipCanEdit}
              component="span"
              sx={{ ...chipSx }}
              onEdit={chipOnEdit}
              icon={chipIcon}
              iconColor={chipIconColor}
              t={t}
            />
          )
          : (
            <ChipError
              label={t('Undefined')}
              canEdit={chipCanEdit}
              component="span"
              onEdit={chipOnEdit}
              t={t}
            />
          )
      );
    default:
      return (
        JSON.stringify(value)
      );
  }
};

export default TableRowComponent;
