import Paper from '@mui/material/Paper';
import { Mafs, Coordinates, Point } from "mafs";
import * as React from 'react';

import { compute, Coordinate } from "../../public/wasm/wasmos.js";
import InputBar from '../components/InputBar.js';

function Graph() {
  let [coords, setCoords] = React.useState<Coordinate[][]>([]);

  function graph(expression: string, index: number) {
    let coordinates = expression !== "" ? compute(expression) : [];

    setCoords(previousCoords => {
      let newCoords = [...previousCoords];
      newCoords[index] = coordinates;
      return newCoords;
    });
  }

  function points(coordinates: Coordinate[]) {
    return coordinates.map((coord: Coordinate, index: number) =>
      <Point
        key={index}
        x={coord.x}
        y={coord.y}
      />
    );
  }

  function graphs() {
    return coords.map((coordinates: Coordinate[]) => points(coordinates));
  }

  return (
    <>
      <InputBar
        onChangeCallback={(event, index) => graph(event.target.value, index)}
      ></InputBar>
      <Paper>

        <Mafs
          zoom={{ min: 0.000001, max: Infinity }}
          width={900}
          height={600}
        >
          <Coordinates.Cartesian
            xAxis={{ lines: 1, subdivisions: false }} />
          {coords.length > 0 ? graphs() : "No points"}
        </Mafs>
      </Paper>
    </>
  );
}

export default Graph;
