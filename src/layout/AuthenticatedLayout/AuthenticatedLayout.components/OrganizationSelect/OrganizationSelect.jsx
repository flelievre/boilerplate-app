import {
  Select,
  MenuItem,
  Typography,
  Button,
  Divider,
  Box,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  useOrganizationSelect,
} from './OrganizationSelect.logic';

const OrganizationSelect = ({
  currentOrganization = {},
  organizations = [],
  onChange = () => {},
  isMobile = false,
  sx = {},
  t = (s) => s,
  generateOrganizationRoute = () => {},
}) => {
  const {
    addOrganizationButtonClick,
  } = useOrganizationSelect({
    generateOrganizationRoute,
  });

  return (
    <Select
      value={currentOrganization._id}
      renderValue={() => (
        <Typography
          noWrap
          sx={{
            fontSize: 14,
          }}
          title={currentOrganization.name}
        >
          {currentOrganization.name}
        </Typography>
      )}
      sx={{
        fontSize: 14,
        width: isMobile ? 'auto' : 177.5,
        maxWidth: 177.5,
        ml: isMobile ? 0 : 1,
        height: 50,
        '.MuiOutlinedInput-notchedOutline': {
          border: isMobile
            ? 'none'
            : '0.1px solid',
          borderColor: 'divider',
        },
        fontWeight: 'bold',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        sx={{
          maxHeight: 200,
          overflowX: 'scroll',
          overflowY: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
      {organizations.map(({ _id }) => (
        <MenuItem
          key={_id}
          value={_id}
          sx={{
            fontSize: 13,
            minHeight: 0,
          }}
          onClick={() => onChange(_id)}
        >
          {organizations.find((organization) => organization._id === _id).name}
          </MenuItem>
        ))}
      </Box>
      <Divider
        sx={{
          my: 1,
        }}
      />
      <Button
        as={MenuItem}
        variant="text"
        color="text.primary"
        fullWidth
        sx={{
          fontSize: 13,
          minHeight: 0,
        }}
        onClick={addOrganizationButtonClick}
      >
        <IconifyIcon
          icon="material-symbols:add"
          style={{
            marginLeft: 2.5,
            marginRight: 5,
          }}
        />
        {t('Add organization')}
      </Button>
    </Select>
  );
};

export default OrganizationSelect;
