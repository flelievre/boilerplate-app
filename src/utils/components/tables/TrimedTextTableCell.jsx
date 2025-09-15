import {
  TableCell,
  Tooltip,
  Typography,
} from '@mui/material';

const TrimedTextTableCell = ({
  component = 'td',
  id = undefined,
  scope = undefined,
  padding = 'normal',
  sx = {},
  onClick = null,
  typographyVariant = 'body2',
  noWrap = true,
  children = '',
  hasTooltip = true,
  hasCustomTooltipTitle = false,
  tooltipTitle = <></>,
  colSpan = 1,
}) => (
  <TableCell
    component={component}
    id={id}
    scope={scope}
    padding={padding}
    sx={{
      cursor: onClick ? 'pointer' : 'default',
      ...sx,
    }}
    colSpan={colSpan}
    onClick={onClick || (() => {})}
  >
    {hasTooltip
      ? (
        <Tooltip title={(
          hasCustomTooltipTitle
            ? tooltipTitle
            : children
          )}
        >
          <Typography
            noWrap={noWrap}
            variant={typographyVariant}
          >
            {children}
          </Typography>
        </Tooltip>
      ) : (
        <Typography
          noWrap={noWrap}
          variant={typographyVariant}
        >
          {children}
        </Typography>
      )}
  </TableCell>
);

export default TrimedTextTableCell;
