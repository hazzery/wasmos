import Paper from "@mui/material/Paper";
import { LineSeriesType } from "@mui/x-charts/models/seriesType/line";
import { ScatterSeriesType } from "@mui/x-charts/models/seriesType/scatter.js";
import * as React from 'react';

import { Coordinate, parse_and_evaluate } from "../../public/wasm/wasmos.js";
import InputBar from "../components/InputBar.tsx";
import Axes from "./Axes.tsx";

interface GraphProps {
  graphHeight: number,
  graphWidth: number,
}

function Graph({ graphWidth, graphHeight }: GraphProps) {
  const [lineSeries, setLineSeries] = React.useState<Coordinate[][]>([]);

  // function range(start: number, end: number) {
  //   return Array.from(Array(end - start + 1).keys()).map(x => x + start);
  // }

  function graph(expression: string, index: number) {
    let coordinates = expression !== "" ? parse_and_evaluate(expression) : [];

    setLineSeries(previousLineSeries => {
      let newSeries = [...previousLineSeries];
      newSeries[index] = coordinates;

      return newSeries;
    });
  }

  // function spawnBall(xValue: number) {
  //   setBallSeries(previousBallSeries => {
  //     let data = previousBallSeries.data || [];
  //     data.push({ x: xValue, y: 40, id: data.length });
  //     previousBallSeries.data = data;
  //     return previousBallSeries
  //   });
  //   console.log(ballSeries);
  // }



  // const [points, setPoints] = React.useState<Coordinate[]>([]);
  // const requestRef = React.useRef(null);
  // const gravity = 9.8;
  // const dt = 0.016; // Approximately 60 FPS
  //
  // React.useEffect(() => {
  //   function animate() {
  //     const newPoints = points.map(point => {
  //       const newPoint = new Coordinate(point.x, point.y);
  //       newPoint.update(dt, gravity);
  //       return newPoint;
  //     });
  //
  //     setPoints(newPoints);
  //     requestRef.current = requestAnimationFrame(animate);
  //   }
  //
  //   requestRef.current = requestAnimationFrame(animate);
  //
  //   return function() {
  //     if (requestRef.current) {
  //       cancelAnimationFrame(requestRef.current);
  //     }
  //   };
  // }, [points]);


  return (
    <>
      <InputBar
        onChangeCallback={(event, index) => graph(event.target.value, index)}
      />
      <Paper>
        <Axes
          data={lineSeries.length > 0 ? lineSeries[0] : []}
        />
      </Paper >
    </>
  );
}

export default Graph;
