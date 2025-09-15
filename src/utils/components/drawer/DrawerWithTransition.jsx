/* eslint-disable */
import {
  Drawer as MuiDrawer,
} from '@mui/material';
import {
  styled,
} from '@mui/material/styles';

const Drawer = styled(
  MuiDrawer,
  {
    shouldForwardProp: (prop) => (
      prop !== 'drawerWidth'
      && prop !== 'isMobile'
    ),
  },
)(
  ({
    theme, open, drawerWidth, isMobile,
  }) => ({
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      ...(!isMobile && {
        // position: 'relative',
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: 0,
          // [theme.breakpoints.up('sm')]: {
          //   width: theme.spacing(11),
          // },
        }),
      })
    },
  }),
);

export default Drawer;
