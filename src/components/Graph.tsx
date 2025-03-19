import Paper from '@mui/material/Paper';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { LineSeriesType } from '@mui/x-charts/models/seriesType/line';
import * as React from 'react';

import { compute } from "../../public/wasm/wasmos.js";
import InputBar from '../components/InputBar.js';

function Graph() {
  const [series, setSeries] = React.useState<LineSeriesType[]>([]);

  function graph(expression: string, index: number) {
    let coordinates = expression !== "" ? compute(expression) : [];

    setSeries(previousSeries => {
      let newSeries = [...previousSeries];
      newSeries[index] = {
        type: 'line',
        label: `Series ${series.length}`,
        data: coordinates.map((coordinate) => coordinate.y),
        showMark: false,
      };

      return newSeries;
    });
  }
  return (
    <>
      <InputBar
        onChangeCallback={(event, index) => graph(event.target.value, index)}
      ></InputBar>
      <Paper>
        <LineChart
          series={series}
          // xAxis={[{ label: "x", min: -50, max: 50, data: Array(100) }]}
          // yAxis={[{ label: "y", min: 0, max: 100 }]}
          grid={{ vertical: true, horizontal: true }}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translate(-10px, 0)',
            },
          }}
          width={900}
          height={600}
        />
        <ChartContainer
          series={series}
          width={900}
          height={600}
          // xAxis={[{ label: "x", min: -50, max: 50, data: Array(100) }]}
          // yAxis={[{ label: "y", min: 0, max: 100 }]}
          // grid={{ vertical: true, horizontal: true }}
        // sx={{
        //   [`.${axisClasses.left} .${axisClasses.label}`]: {
        //     transform: 'translate(-10px, 0)',
        //   },
        // }}
        />
      </Paper>
    </>
  );
}

export default Graph;
