import Paper from '@mui/material/Paper';
import { LinePlot, ScatterPlot } from '@mui/x-charts';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { ChartsOnAxisClickHandler } from '@mui/x-charts/ChartsOnAxisClickHandler';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { LineSeriesType } from '@mui/x-charts/models/seriesType/line';
import { ScatterSeriesType } from '@mui/x-charts/models/seriesType/scatter.js';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import * as React from 'react';

import { compute, Coordinate } from "../../public/wasm/wasmos.js";
import InputBar from '../components/InputBar.js';

function Graph() {
  const [lineSeries, setLineSeries] = React.useState<LineSeriesType[]>([]);
  const [ballSeries, setBallSeries] = React.useState<ScatterSeriesType>({ type: "scatter" });

  function range(start: number, end: number) {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start);
  }

  function graph(expression: string, index: number) {
    let coordinates = expression !== "" ? compute(expression) : [];

    setLineSeries(previousLineSeries => {
      let newSeries = [...previousLineSeries];
      newSeries[index] = {
        type: 'line',
        label: `Series ${lineSeries.length}`,
        data: coordinates.map((coordinate) => coordinate.y),
        showMark: false,
      };

      return newSeries;
    });
  }

  function spawnBall(xValue: number) {
    setBallSeries(previousBallSeries => {
      let data = previousBallSeries.data || [];
      data.push({ x: xValue, y: 40, id: data.length });
      previousBallSeries.data = data;
      return previousBallSeries
    });
    console.log(ballSeries);
  }

  return (
    <>
      <InputBar
        onChangeCallback={(event, index) => graph(event.target.value, index)}
      />
      <Paper>
        <ResponsiveChartContainer
          series={[...lineSeries, ballSeries]}
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
          <ScatterPlot />
          <ChartsLegend />
          <ChartsOnAxisClickHandler onAxisClick={(_event, data) => spawnBall(data?.axisValue as number)} />
        </ResponsiveChartContainer>
      </Paper >
    </>
  );
}

export default Graph;
