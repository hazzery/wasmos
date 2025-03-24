import * as React from 'react';

interface CanvasProps {
  canvasProps?: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>,
  init?: (context: CanvasRenderingContext2D) => void,
  draw: (context: CanvasRenderingContext2D) => void,
}

/**
 * HTML canvas element as a React component.
 *
 * Code taken as JSX from Medium:
 * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 * And converted to TSX by myself.
 *
 * @param canvasProps - Props to be passsed directly to the HTML canvas element.
 * @parm init - Function which draws on to the canvas, called once.
 * @param draw - Function which draws on to the canvas, called every frame.
*/
function Canvas({ canvasProps, draw, init }: CanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [hasInitialised, setHasinitalised] = React.useState<boolean>(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }

    const context = canvas.getContext('2d');

    let animationFrameId: number;

    if (init !== undefined && !hasInitialised && context !== null) {
      init(context);
      setHasinitalised(true);
    }

    function render() {
      if (context !== null) {
        draw(context);
      }
      animationFrameId = window.requestAnimationFrame(render);
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw]);

  return <canvas ref={canvasRef} {...canvasProps} />;
}

export default Canvas;
