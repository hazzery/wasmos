import Paper from '@mui/material/Paper';
import { LinePlot } from '@mui/x-charts';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { LineSeriesType } from '@mui/x-charts/models/seriesType/line';
import * as React from 'react';

import { compute } from "../../public/wasm/wasmos.js";
import InputBar from '../components/InputBar.js';

function Graph() {
  const [series, setSeries] = React.useState<LineSeriesType[]>([]);

  function range(start: number, end: number) {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start);
  }

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
        <ChartContainer
          series={series}
          width={1649}
          height={900}
          xAxis={[{ label: "x", min: -50, max: 50, data: range(-50, 50) }]}
          yAxis={[{ label: "y", min: -50, max: 50 }]}
        >
          <ChartsXAxis />
          <ChartsYAxis />
          <ChartsReferenceLine x={0} lineStyle={{ strokeDasharray: '10 5' }} />
          <ChartsReferenceLine y={0} lineStyle={{ strokeDasharray: '10 5' }} />
          <LinePlot />
        </ChartContainer>
      </Paper >
    </>
  );
}

export default Graph;
