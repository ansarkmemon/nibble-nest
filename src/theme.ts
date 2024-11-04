'use client';
import { createTheme, PaletteOptions } from '@mui/material/styles';

let theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

theme = createTheme(theme, {
  palette: {
    black: theme.palette.augmentColor({ color: { main: '#000' } }),
  },
});

export default theme;
