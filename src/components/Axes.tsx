import * as React from "react";
import Canvas from "./Canvas.tsx";

interface AxesProps {
  data: { x: number, y: number }[],
}

function Axes({ data }: AxesProps) {
  let [xPadding] = React.useState<number>(0);
  let [yPadding] = React.useState<number>(0);
  let [maxX] = React.useState<number>(50);
  let [maxY] = React.useState<number>(50);
  let [xTickStep] = React.useState<number>(5);
  let [yTickStep] = React.useState<number>(5);

  /**
   * Get the X ordinate of the pixel at X value `val`.
   * 
   * @param val X ordinate in the graph space.
   * @param context Canvas context.
   * @returns The X ordinate in the pixel space of `val`.
   */
  function getXPixel(val: number, context: CanvasRenderingContext2D) {
    return ((context.canvas.width - xPadding) / (2 * maxX)) * (val + maxX) + xPadding;
  }

  /**
   * Get the Y ordinate of the pixel at Y value `val`.
   * 
   * @param val Y ordinate in the graph space.
   * @param context Canvas context.
   * @returns The Y ordinate in the pixel space of `val`.
   */
  function getYPixel(val: number, context: CanvasRenderingContext2D) {
    return context.canvas.height - ((context.canvas.height - yPadding) / (2 * maxY)) * (val + maxY) - yPadding;
  }

  function drawAxes(context: CanvasRenderingContext2D) {
    context.lineWidth = 1;
    context.strokeStyle = "#333";
    context.font = "italic 8pt sans-serif";
    context.textAlign = "center";

    // Draw the y-axis
    context.beginPath();
    context.moveTo(getXPixel(0, context), getYPixel(-maxY, context));
    context.lineTo(getXPixel(0, context), getYPixel(maxY, context));
    context.stroke();

    // Draw the x-axis
    context.beginPath();
    context.moveTo(getXPixel(-maxX, context), getYPixel(0, context));
    context.lineTo(getXPixel(maxX, context), getYPixel(0, context));
    context.stroke();


    // Draw the X axis tick labels
    for (let i = -maxX + xTickStep; i < maxX; i += xTickStep) {
      if (i !== 0) { // Skip the origin, this is placed individually.
        context.fillText(i.toString(), getXPixel(i, context), getYPixel(0, context) + 15);
      }
    }

    // Draw the Y axis tick labels
    context.textAlign = "right";
    context.textBaseline = "middle";

    for (let i = -maxY + yTickStep; i < maxY; i += yTickStep) {
      if (i !== 0) { // Skip the origin, this is placed individually.
        context.fillText(i.toString(), getXPixel(0, context) - 10, getYPixel(i, context));
      }
    }

    // tick label for the origin.
    context.fillText("0", getXPixel(0, context) - 10, getYPixel(0, context) + 15);
    context.save();
  }

  function draw(context: CanvasRenderingContext2D) {
    if (data.length > 0) {
      context.save();
      context.restore();
      context.strokeStyle = "#ff0000";

      context.beginPath();
      context.moveTo(getXPixel(data[0].x, context), getYPixel(data[0].y, context));
      for (let i = 1; i < data.length; i++) {
        context.lineTo(getXPixel(data[i].x, context), getYPixel(data[i].y, context));
      }
      context.stroke();
    }
  }


  return (
    <Canvas
      init={drawAxes}
      draw={draw}
      canvasProps={{
        // height: "90vh",
        // width: "90vw",
        width: "1920px",
        height: "1080px",
      }}
    />
  );
}

export default Axes;
