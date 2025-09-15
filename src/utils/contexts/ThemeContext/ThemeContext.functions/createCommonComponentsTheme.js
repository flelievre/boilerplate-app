// https://mui.com/material-ui/customization/default-theme/

const createCommonComponentsTheme = (theme) => ({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          '.MuiTabs-indicator': {
            borderRadius: '10px',
          },
          '.MuiTabScrollButton-root': {
            color: theme.palette.primary.main,
          },
          '.MuiButtonBase-root:hover': {
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
          },
        },
      },
    },
    // MuiTable: {
    //   styleOverrides: {
    //     root: {
    //       '.MuiTableRow-root': {
    //         height: '220px',
    //         borderRadius: '5px !important',
    //       },
    //     },
    //   },
    // },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          '.MuiButtonBase-root': {
            borderRadius: '5px !important',
            border: 'none !important',
            height: '36px',
            paddingLeft: '20px',
            paddingRight: '20px',
            marginRight: '5px',
          },
          '.MuiToggleButton-root': {
            borderRadius: '5px !important',
            border: 'none !important',
            paddingLeft: '20px',
            paddingRight: '20px',
            marginRight: '5px',
            textDecoration: 'none',
          },
          '.MuiToggleButton-root:not(.Mui-selected):hover': {
            backgroundColor: 'transparent !important',
          },
          '.MuiButtonBase-root:not(.Mui-selected):hover': {
            backgroundColor: 'transparent !important',
          },
        },
      },
    },
  },
});

export default createCommonComponentsTheme;
