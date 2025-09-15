import {
  InputBase,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  blue,
} from '@mui/material/colors';
import {
  styled,
  alpha,
} from '@mui/material/styles';

const SearchBarContainer = styled(
  Grid,
  {
    shouldForwardProp: (prop) => (
      prop !== 'hasSearched'
      && prop !== 'hasSearchInputFocus'
      && prop !== 'paddingLeft'
    ),
  },
)(({
  theme,
  hasSearched,
  hasSearchInputFocus,
  paddingLeft,
}) => {
  const backgroundColorNotFocused = hasSearched
    ? alpha(blue[100], 0.4)
    : alpha(blue[500], 0.075);
  const backgroundColor = hasSearchInputFocus
    ? theme.palette.background.default
    : backgroundColorNotFocused;
  return ({
    width: `calc(100% - ${paddingLeft})`,
    borderRadius: theme.shape.borderRadius,
    border: `solid 2px ${hasSearchInputFocus ? theme.palette.primary.main : 'transparent'}`,
    backgroundColor,
    '&:hover': {
      backgroundColor,
    },
  });
});

const SearchInput = styled(
  InputBase,
  {
    shouldForwardProp: (prop) => (
      prop !== 'hasSearched'
    ),
  },
)(({
  theme,
  hasSearched,
}) => ({
  fontWeight: hasSearched ? 900 : 500,
  color: hasSearched ? theme.palette.primary.main : 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    border: '2px solid transparent',
    borderRadius: '5px',
  },
}));

const SearchBar = ({
  hasSearched = false,
  hasSearchInputFocus = false,
  searchTerm = '',
  paddingLeft = '50px',
  setSearchTerm = () => '',
  setHasSearchInputFocus = () => false,
  placeholder = 'Search...',
} = {}) => (
  <SearchBarContainer
    container
    spacing={0}
    paddingLeft={paddingLeft}
    hasSearchInputFocus={hasSearchInputFocus}
    hasSearched={hasSearched}
  >
    <div>
      <IconButton
        color={(
          hasSearched
            ? 'primary'
            : 'default'
        )}
        sx={{
          mt: '2px',
          ml: '2px',
        }}
      >
        <IconifyIcon icon="ic:baseline-search" />
      </IconButton>
    </div>
    <Grid sx={{ width: 'calc(100% - 84px)' }}>
      <div>
        <SearchInput
          hasSearched={hasSearched}
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          onFocus={() => setHasSearchInputFocus(true)}
          onBlur={() => setHasSearchInputFocus(false)}
          sx={{ width: '100%' }}
          placeholder={placeholder}
        />
      </div>
    </Grid>
    {hasSearched && (
      <div>
        <IconButton
          color="primary"
          onClick={() => setSearchTerm('')}
          sx={{ mt: '2px', mr: '2px', zIndex: 2 }}
        >
          <IconifyIcon icon="ic:baseline-cancel" />
        </IconButton>
      </div>
    )}
  </SearchBarContainer>
);

export default SearchBar;
