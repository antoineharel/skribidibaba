import type { DrawCircleParams, DrawLineParams } from '../../common/canvas.types';
import { socket } from './socket';

export function draw({
  x,
  y,
  radius,
  canvasCtx,
  currentColor,
  state,
}: {
  x: number;
  y: number;
  radius: number;
  canvasCtx: CanvasRenderingContext2D;
  currentColor: string;
  state: {
    lastPointCoordinates: { x: number; y: number } | null;
  };
}) {
  drawCircle({
    fill: currentColor,
    radius,
    x,
    y,
    canvasCtx: canvasCtx,
  });

  socket.emit('drawCircle', {
    fill: currentColor,
    radius,
    x,
    y,
  });

  if (state.lastPointCoordinates) {
    drawLine({
      from: {
        x: state.lastPointCoordinates.x,
        y: state.lastPointCoordinates.y,
      },
      to: {
        x: x,
        y: y,
      },
      canvasCtx,
      fill: currentColor,
      radius,
    });

    socket.emit('drawLine', {
      from: {
        x: state.lastPointCoordinates.x,
        y: state.lastPointCoordinates.y,
      },
      to: {
        x: x,
        y: y,
      },
      fill: currentColor,
      radius,
    });
  }

  state.lastPointCoordinates = { x, y };
}

export function drawCircle({
  x,
  y,
  radius,
  fill,
  canvasCtx,
}: DrawCircleParams & {
  canvasCtx: CanvasRenderingContext2D;
}) {
  canvasCtx.beginPath();
  canvasCtx.arc(x, y, radius, 0, 2 * Math.PI, false);

  canvasCtx.fillStyle = fill;
  canvasCtx.fill();
}

export function drawLine({
  from,
  to,
  radius,
  fill,
  canvasCtx,
}: DrawLineParams & {
  canvasCtx: CanvasRenderingContext2D;
}) {
  canvasCtx.beginPath(); // Start a new path
  canvasCtx.moveTo(from.x, from.y); // Move the pen to (30, 50)
  canvasCtx.lineTo(to.x, to.y); // Draw a line to (150, 100)
  canvasCtx.lineWidth = radius * 2;
  canvasCtx.lineCap = 'round';
  canvasCtx.strokeStyle = fill;
  canvasCtx.stroke(); // Render the path
}
