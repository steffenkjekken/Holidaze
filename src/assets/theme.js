import { createTheme } from '@mui/material/styles';

export const theme = createTheme ({
  palette: {
    mode: 'light',
    primary: {
      main: '#F64A4A',
    },
    secondary: {
      main: '#fce4ec',
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
    h1: {
      fontFamily: 'Fugaz One',
    },
    
  },
  props: {
    MuiLink: {
      underline: "none"
    }
  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          "&.Mui-disabled": {
            "backgroundColor": "#cecece",
            '&:hover': {
              background: "#f00",
           },
            ":not(.Mui-selected)": {
              "color": "black",
            }
          },
        },
      },
    },
  },
});