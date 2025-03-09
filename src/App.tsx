import * as React from 'react';

import { compute, Coordinate } from "../public/wasm/wasmos.js";

import './App.css';
import InputBar from './components/InputBar.js';
import { Box } from '@mui/material';

function App() {
  const [coords, setCoords] = React.useState<Coordinate[]>([]);

  function graph(expression: string) {
    console.log(`Asked to compute ${expression}`)
    let coords = compute(expression);
    setCoords(coords);

    for (let coord of coords) {
      console.log(`(${coord.x}, ${coord.y})`);
    }
  }

  return (
    <>
      <h1>Wasmos</h1>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <InputBar></InputBar>
      </Box>
    </>
  )
}

export default App
