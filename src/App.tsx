import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';


import './App.css';
import Graph from './components/Graph';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <h1>Wasmos</h1>
      </AppBar>
      <Box
        position="absolute"
        top={0}
        left={0}
        height="98vh"
        margin="1vh"
        sx={{
          display: "flex",
        }}
      >
        <Graph></Graph>
      </Box >
    </ThemeProvider>
  )
}

export default App;
