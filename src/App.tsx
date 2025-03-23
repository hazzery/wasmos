import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';


import './App.css';
import Graph from './components/Graph';
import useWindowDimensions from './hooks/useWindowDimensions';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { height, width } = useWindowDimensions();

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
      <Box
        position="absolute"
        top={0}
        left={0}
        height="3vh"
        width="100vw"
        sx={{
          display: "flex",
          textAlign: "left",
          flexDirection: "column",
          rowGap: "1vh",
        }}
      >
        <AppBar
          position="static"
          sx={{
            fontSize: "x-large",
            paddingLeft: "1vh",
            height: "100%",
          }}
        >
          Wasmos
        </AppBar>
        <Box
          position="relative"
          top={0}
          left={0}
          width="100%"
          height="95vh"
          marginX="1vh"
          sx={{
            display: "flex",
            columnGap: "1vh",
          }}
        >
          <Graph
            graphWidth={width * 0.89}
            graphHeight={height * 0.95}
          ></Graph>
        </Box >
      </Box>
    </ThemeProvider>
  )
}

export default App;
