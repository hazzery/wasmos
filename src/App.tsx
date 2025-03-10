import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { ScatterSeriesType } from '@mui/x-charts/models/seriesType/scatter';
import * as React from 'react';

import { compute } from "../public/wasm/wasmos.js";

import { Box } from '@mui/material';
import './App.css';
import InputBar from './components/InputBar.js';

function App() {
  const [series, setSeries] = React.useState<Omit<ScatterSeriesType, "type">[]>([]);

  function graph(expression: string, index: number) {
    let coordinates = expression !== "" ? compute(expression) : [];

    setSeries(previousSeries => {
      let newSeries = [...previousSeries];
      newSeries[index] = {
        label: `Series ${series.length}`,
        data: coordinates.map((coordinate, index) => ({ x: coordinate.x, y: coordinate.y, id: index })),
      };

      return newSeries;
    });
  }


  return (
    <>
      <h1>Wasmos</h1>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <InputBar
          onChangeCallback={(event, index) => graph(event.target.value, index)}
        ></InputBar>
        <ScatterChart
          series={series}
          xAxis={[{ label: "x" }]}
          yAxis={[{ label: "y" }]}
          grid={{ vertical: true, horizontal: true }}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translate(-10px, 0)',
            },
          }}
          width={900}
          height={600}
        />
      </Box >
    </>
  )
}

export default App
