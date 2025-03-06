import * as React from 'react';
import { TextField } from '@mui/material'
import { compute, Coordinate } from "../public/wasm/wasmos.js";

import { Mafs, Coordinates, Point } from "mafs";

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

  function points() {
    return coords.map(
      (coord: Coordinate, index: number) => <Point
        key={index}
        x={coord.x}
        y={coord.y}
      />
    );
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

      <Mafs
        zoom={{ min: 0.000001, max: Infinity }}
        width={1920}
        height={1080}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, subdivisions: false }} />
        {coords.length > 0 ? points() : "No points"}
      </Mafs>
    </>
  )
}

export default App
