import {
  Typography,
  Box,
  IconButton,
  Skeleton,
  Icon as MaterialIcon,
  Stack,
} from '@mui/material';
import {
  Icon,
} from '@iconify/react';
import {
  generateRandomNumber,
} from '../../functions';

const EditableText = ({
  isLoading = false,
  isMobile = false,
  canEdit = false,
  skeletonWidth = 0,
  value = '',
  label = '',
  type = '',
  t = (s) => s,
  labelComponent = 'div',
  labelVariant = 'body2',
  labelSx = {},
  labelStyle = {
    display: 'inline-block',
  },
  valueComponent = 'div',
  valueVariant = 'body2',
  valueSx = {},
  valueStyle = {
    display: 'inline-block',
  },
  editIconOnClick = () => {},
  editIconColor = 'primary',
  editIcon = <Icon icon="ic:baseline-edit" />,
  editIconAreaLabel = 'edit',
  editIconComponent = 'label',
  editIconSx = {
    ml: 1,
  },
}) => {
  const randomSkeleton = generateRandomNumber({
    min: 140,
    max: 180,
  });
  const marginRight = (t(label).length > 12)
    ? 1
    : 0;
  return isMobile
    ? (
      <Stack
        direction="column"
        sx={{
          mt: 1,
        }}
      >
        <Typography
          component={labelComponent}
          variant={labelVariant}
          sx={{
            color: 'text.secondary',
            minWidth: 100,
            ...labelSx,
          }}
          style={{
            ...labelStyle,
          }}
        >
          {t(label)}
        </Typography>
        <Box>
          <Typography
            component={valueComponent}
            variant={valueVariant}
            type={type}
            sx={{
              maxWidth: 'none',
              verticalAlign: 'middle',
              ...valueSx,
            }}
            style={{
              ...valueStyle,
            }}
            noWrap
          >
            {(isLoading
              ? (
                <Skeleton width={skeletonWidth || randomSkeleton} />
              )
              : value
            )}
          </Typography>
          <IconButton
            onClick={editIconOnClick}
            color={editIconColor}
            disabled={(isLoading || !canEdit)}
            aria-label={editIconAreaLabel}
            component={editIconComponent}
            sx={{
              ...editIconSx,
            }}
          >
            {((isLoading || !canEdit)
              ? <MaterialIcon />
              : editIcon
            )}
          </IconButton>
        </Box>
      </Stack>
    ) : (
      <Box>
        <Typography
          component={labelComponent}
          variant={labelVariant}
          sx={{
            color: 'text.secondary',
            minWidth: 100,
            ...labelSx,
            mr: marginRight,

          }}
          style={{
            ...labelStyle,
          }}
        >
          {t(label)}
        </Typography>
        <Typography
          component={valueComponent}
          variant={valueVariant}
          type={type}
          sx={{
            maxWidth: 'none',
            verticalAlign: 'middle',
            ...valueSx,
          }}
          style={{
            ...valueStyle,
          }}
          noWrap
        >
          {(isLoading
            ? (
              <Skeleton width={skeletonWidth || randomSkeleton} />
            )
            : value
          )}
        </Typography>
        <IconButton
          onClick={editIconOnClick}
          color={editIconColor}
          disabled={(isLoading || !canEdit)}
          aria-label={editIconAreaLabel}
          component={editIconComponent}
          sx={{
            ...editIconSx,
          }}
        >
          {((isLoading || !canEdit)
            ? <Icon />
            : editIcon
          )}
        </IconButton>
      </Box>
    );
};

export default EditableText;
