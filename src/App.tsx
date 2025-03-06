import * as React from 'react';
import { TextField } from '@mui/material'
import { compute, Coordinate } from "../public/wasm/wasmos.js";

import './App.css'

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
      <TextField
        id="text-field"
        label="Input expression"
        variant="outlined"
        onChange={(event) => graph(event.target.value)}
      />
    </>
  )
}

export default App
