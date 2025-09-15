import {
  useState,
  useEffect,
} from 'react';
import {
  useBoolean,
} from '../../hooks';
import {
  Typography,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Icon,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import TrimedTextTableCell from './TrimedTextTableCell';
import TableRowComponent from './TableRowComponent';

const ResponsiveTableRow = ({
  handleRowSelect = () => {},
  isItemSelected = false,
  isMobile = false,
  isTablet = false,
  mobileHeight = '53.033px',
  desktopHeight = '74.033px',
  canSelect = false,
  rowData = [],
  t = (s) => s,
  rowIndex = 0,
  viewIcon = 'majesticons:open',
  TABLE_HEADERS = [],
}) => {
  const propertiesToShow = TABLE_HEADERS
    .filter(({
      hiddenOnMobile = false,
      hiddenOnTablet = false,
      isSubline = false,
    }) => (
      ((!hiddenOnMobile && isMobile)
      || (!hiddenOnTablet && isTablet)
      || (!isMobile && !isTablet))
      && !isSubline
    ))
    .map(({
      id = '',
    }) => (
      id
    ));
  const hasSublines = TABLE_HEADERS
    .some(({
      isSubline = false,
    }) => (
      isSubline
    ));
  const labelId = `enhanced-table-checkbox-${rowIndex}`;
  const MOBILE_DATA_LABELS = TABLE_HEADERS
    .filter((_, i) => (i >= 1))
    .map(({ label }) => label);
  const SUBLINE_DATA_LABELS = TABLE_HEADERS
    .filter(({
      isSubline = false,
    }) => (
      isSubline
    ))
    .map(({ label }) => label);
  const {
    value: isAccordionOpen,
    toggleValue: toggleAccordion,
    setFalse: hideAccordion,
  } = useBoolean();
  const {
    value: isHovered,
    setTrue: setIsHover,
    setFalse: setIsNotHover,
  } = useBoolean();
  useEffect(() => {
    if (!isMobile) {
      hideAccordion();
    }
  }, [isMobile]);
  const [anchorEl, setAnchorEl] = useState(null);
  const isShowingMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const {
    id = '',
    authUserCanGet = false,
    authUserCanUpdate = false,
    authUserCanDelete = false,
    handleMenuEditClick = () => {},
    handleMenuDeleteClick = () => {},
    otherMenuActions = [],
  } = rowData[rowData.length - 1];

  const isLastColumnReservedForActions = (id === '');

  const padderForLastColumnActions = isLastColumnReservedForActions
    ? 1
    : 0;

  const otherAllowedMenuActions = otherMenuActions.filter(({
    hasHabilitation = false,
  }) => (
    hasHabilitation
  ));

  const authUserCanMakeAnyTableRowActions = authUserCanGet
    || authUserCanUpdate
    || authUserCanDelete
    || (otherAllowedMenuActions.length > 0);

  const mobileAccordionColSpan = rowData[0].colSpan
    + 1;

  const sublineColSpan = TABLE_HEADERS
    .filter(({
      isSubline = false,
    }) => (
      !isSubline
    ))
    .reduce((acc, {
    colSpan = 1,
  }) => (
    acc + colSpan
  ), 1);

  return (
    <>
      <TableRow
        hover
        onMouseEnter={setIsHover}
        onMouseLeave={setIsNotHover}
        role="checkbox"
        aria-checked={isItemSelected}
        style={{
          borderRadius: 10,
        }}
        sx={{
          height: isMobile
            ? mobileHeight
            : desktopHeight,
          ...(isAccordionOpen && {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }),
        }}
        selected={canSelect && isItemSelected}
      >
        {canSelect && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                'aria-labelledby': labelId,
              }}
              onClick={handleRowSelect}
            />
          </TableCell>
        )}
        {hasSublines && !isMobile && (
          <TableCell
            sx={{
              width: 40,
              padding: 2,
              whiteSpace: 'nowrap'
            }}
            onClick={() => {
              toggleAccordion();
            }}
          >
            <IconButton
              size="small"
              sx={{ mr: 1 }}
            >
              <IconifyIcon
                icon="ic:round-keyboard-arrow-right"
                height={20}
                style={{
                  transform: isAccordionOpen ? 'rotate(90deg)' : 'rotate(0)',
                  transition: '0.2s',
                }}
              />
            </IconButton>
          </TableCell>
        )}
        {rowData.filter((_, i) => (
          (!isMobile && (i < rowData.length - padderForLastColumnActions))
          || (i === 0)
        ))
          .filter(({
            oldId: headerId = '',
          }) => (
            propertiesToShow.includes(headerId)
          ))
          .map(({
            type = 'text',
            value = '',
            component = 'td',
            scope = 'row',
            padding = 'normal',
            isBold = false,
            oldId = '',
            sx = {},
            onClick = () => {},
            typographyVariant = 'body2',
            noWrap = true,
            hasTooltip = true,
            hasCustomTooltipTitle = false,
            tooltipTitle = <></>,
            colSpan = 1,
            mobileColSpan = 1,
            checked = false,
            disabled = false,
            handleCheckboxClick = () => {},
            iconName = undefined,
          }, rowDataIndex) => {
            const isFirstRow = (rowDataIndex === 0);

            return (
              <TrimedTextTableCell
                component={component}
                key={oldId}
                id={`TrimedTextTableCell-${rowIndex}-${rowDataIndex}`}
                hasTooltip={!isMobile && hasTooltip}
                scope={scope}
                padding={padding}
                onClick={() => {
                  if (
                    (isMobile && isFirstRow)
                    || hasSublines
                  ) {
                    toggleAccordion();
                  } else {
                    onClick();
                  }
                }}
                colSpan={(isMobile
                  ? mobileColSpan
                  : colSpan
                )}
                sx={sx}
                typographyVariant={typographyVariant}
                noWrap={noWrap}
                hasCustomTooltipTitle={hasCustomTooltipTitle}
                tooltipTitle={tooltipTitle}
              >
                {(isMobile && isFirstRow) && (
                  <IconButton
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <IconifyIcon
                      icon="ic:round-keyboard-arrow-right"
                      height={20}
                      style={{
                        transform: isAccordionOpen ? 'rotate(90deg)' : 'rotate(0)',
                        transition: '0.2s',
                      }}
                    />
                  </IconButton>
                )}
                <TableRowComponent
                  t={t}
                  type={type}
                  value={value}
                  checked={checked}
                  disabled={disabled}
                  iconName={iconName}
                  isBold={isBold}
                  handleCheckboxClick={handleCheckboxClick}
                />
              </TrimedTextTableCell>
            );
          })}
        {(
          <TableCell
            align="right"
            colSpan={1}
          >
            {((isHovered || isMobile || isTablet) && authUserCanMakeAnyTableRowActions
              ? (
                <>
                  {(isMobile || isTablet
                    ? (
                      <IconButton
                        onClick={handleOpenMenu}
                        size="small"
                        aria-controls={isShowingMenu ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isShowingMenu ? 'true' : undefined}
                      >
                        <IconifyIcon icon="ic:baseline-more-vert" />
                      </IconButton>
                    ) : (
                      <Tooltip title={t('View options')}>
                        <IconButton
                          onClick={handleOpenMenu}
                          size="small"
                          aria-controls={isShowingMenu ? 'account-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={isShowingMenu ? 'true' : undefined}
                        >
                          <IconifyIcon icon="ic:baseline-more-vert" />
                        </IconButton>
                      </Tooltip>
                    )
                  )}
                  <Menu
                    id={`user-${rowIndex}-option-menu`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={isShowingMenu}
                    onClose={handleCloseMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                  >
                    {(authUserCanGet
                      || authUserCanUpdate
                    ) && (
                      <MenuItem
                        onClick={async () => {
                          handleCloseMenu();
                          await handleMenuEditClick();
                        }}
                      >
                        {(authUserCanUpdate
                          ? <IconifyIcon icon="ic:baseline-mode-edit" />
                          : (
                            <IconifyIcon
                              icon={viewIcon}
                              style={{
                                fontSize: '1.2rem',
                              }}
                            />
                          )
                        )}
                        <Typography
                          sx={{
                            ml: 1,
                          }}
                        >
                          {(authUserCanUpdate
                            ? t('Edit')
                            : t('View')
                          )}
                        </Typography>
                      </MenuItem>
                    )}
                    {(otherAllowedMenuActions.map(({
                      actionKey = '',
                      actionButtonText = '',
                      actionButtonOnClick = () => {},
                      actionIcon = '',
                      actionIconColor = 'default',
                    }) => (
                      <MenuItem
                        key={actionKey}
                        onClick={async () => {
                          handleCloseMenu();
                          await actionButtonOnClick();
                        }}
                        sx={{
                          color: actionIconColor,
                        }}
                      >
                        <IconifyIcon
                          icon={actionIcon}
                          height={20}
                        />
                        <Typography
                          sx={{
                            ml: 1,
                          }}
                        >
                          {t(actionButtonText)}
                        </Typography>
                      </MenuItem>
                    )))}
                    {(authUserCanDelete
                      && (
                        <MenuItem
                          onClick={async () => {
                            handleCloseMenu();
                            await handleMenuDeleteClick();
                          }}
                          sx={{
                            color: 'error.main',
                          }}
                        >
                          <IconifyIcon
                            icon="material-symbols-light:delete-forever-rounded"
                            height={20}
                            style={{
                              color: 'error.main',
                            }}
                          />
                          <Typography
                            sx={{
                              ml: 0.5,
                            }}
                          >
                            {t('Delete')}
                          </Typography>
                        </MenuItem>
                      )
                    )}
                  </Menu>
                </>
              )
              : (
                <IconButton
                  disabled
                >
                  <Icon />
                </IconButton>
              )
            )}
          </TableCell>
        )}
      </TableRow>
      {(rowData
        .filter(({ isSubline = false }, i) => (
          (i >= 1) && (i < rowData.length - padderForLastColumnActions)
          && (
            (!isMobile && isSubline)
            || isMobile
          )
        ))
        .map(({
          type = 'text',
          key = '',
          value = '',
          // checked = false,
          disabled = false,
          isBold = false,
          isHeaderBold = false,
          iconName = '',
          handleCheckboxClick = () => {},
        }, labelIndex) => (
          <TableRow
            key={key}
            id={`TableRow-${rowIndex}-${labelIndex}`}
          >
            <TableCell
              colSpan={(
                isMobile
                  ? mobileAccordionColSpan
                  : sublineColSpan
              )}
              sx={{
                paddingBottom: 0,
                paddingTop: 0,
                ...(!isAccordionOpen && {
                  borderBottom: 'none',
                }),
              }}
            >
              <Collapse
                in={isAccordionOpen}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component="div"
                  disablePadding
                >
                  <ListItem
                    key="1"
                    sx={{ pt: 1, pb: 1, maxWidth: 400 }}
                    secondaryAction={(
                      <TableRowComponent
                        t={t}
                        type={type}
                        value={value}
                        // checked={checked}
                        disabled={disabled}
                        iconName={iconName}
                        isBold={isBold}
                        handleCheckboxClick={handleCheckboxClick}
                      />
                    )}
                    disablePadding
                  >
                    <ListItemText
                      id={labelId}
                      primary={(
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: isHeaderBold
                              ? 800
                              : 400,
                          }}
                        >
                          {(
                            (hasSublines && !isMobile)
                              ? t(SUBLINE_DATA_LABELS[labelIndex] || '')
                              : t(MOBILE_DATA_LABELS[labelIndex] || '')
                          )}
                        </Typography>
                      )}
                      sx={{
                        pl: isMobile
                          ? 2
                          : 6,
                      }}
                    />
                  </ListItem>
                </List>
              </Collapse>
            </TableCell>
          </TableRow>
        ))
      )}
    </>
  );
};

export default ResponsiveTableRow;
