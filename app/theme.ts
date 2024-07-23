'use client';
import { createTheme } from '@mui/material/styles';
  
const primaryColor = {
  main: '#19A96C',
  contrastText:'#ffffff'
}
const secondaryColor = {
  main:'#2C6A45',
  contrastText:'#ffffff'
}

const tertiaryColor = {
  main:'#616118',
  contrastText:'#ffffff'
}

const theme = createTheme({
    breakpoints: {
        values: {
          xs: 320,
          sm: 425,
          md: 768,
          lg: 1024,
          xl: 1440,
        },
      },
      palette: {
        primary:primaryColor,
        secondary:secondaryColor,
        mode:'light',
      },

  });

  export default theme;