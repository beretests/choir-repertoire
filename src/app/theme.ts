import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginTop: '2rem',
        },
      },
    },
    // Add more component overrides here
  },
});

export default theme;
