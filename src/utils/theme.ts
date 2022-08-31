import { createMuiTheme } from '@material-ui/core/styles';
import { BORDER_RADIUS } from 'config';

export default createMuiTheme({
  typography: {
    fontFamily: ['nagomi', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    type: 'dark',
    background: {
      default: `background: 'radial-gradient( #5C6B37 60%, #3D6C3C 90%)'`,
      paper: 'rgb(159, 134, 95)',
    },
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: 'rgb(165, 144, 101)',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: 'radial-gradient( #957951 60%, #4a3d2a 90%)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
        MuiPaper: {
          background: 'radial-gradient( #5C6B37 60%, #3D6C3C 90%)',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: BORDER_RADIUS,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: BORDER_RADIUS,
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: BORDER_RADIUS,
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottomColor: '#313131',
        },
        '&:after': {
          borderBottomColor: '#313131',
        },
      },
    },
  },
});
