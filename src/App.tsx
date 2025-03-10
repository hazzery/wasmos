import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ScatterChart, ScatterChartProps } from '@mui/x-charts/ScatterChart';
import * as React from 'react';

import { compute, Coordinate } from "../public/wasm/wasmos.js";

import './App.css';
import InputBar from './components/InputBar.js';
import { Box } from '@mui/material';

function App() {
  const [coords, setCoords] = React.useState<Coordinate[]>([]);

  function graph(expression: string) {
    console.log(`Asked to compute ${expression}`);
    let coords = compute(expression);
    setCoords(coords);

    for (let coord of coords) {
      console.log(`(${coord.x}, ${coord.y})`);
    }
  }

  const chartSetting: Omit<ScatterChartProps, "series"> = {
    xAxis: [{ label: "x" }],
    yAxis: [{ label: "y" }],
    grid: { vertical: true, horizontal: true },
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
    width: 900,
    height: 600,
  };

  return (
    <>
      <h1>Wasmos</h1>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <InputBar
          onChangeCallback={(event) => graph(event.target.value)}
        ></InputBar>
        <ScatterChart
          series={[
            {
              label: 'Series A',
              data: coords.map((coord, index) => ({ x: coord.x, y: coord.y, id: index })),
            },
          ]}
          {...chartSetting}
        />
      </Box >
    </>
  )
}

export default App
