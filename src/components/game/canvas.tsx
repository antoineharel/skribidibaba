import { type FC } from 'react';
import { useGame } from '../../store/store';
import { draw, drawCircle, drawLine } from '../../utils/canvas.utils';
import { socket } from '../../utils/socket';
import type { DrawCircleParams, DrawLineParams } from '../../../common/canvas.types';
import { cx } from '../../utils/cx';

const Canvas: FC = () => {
  const gameState = useGame();

  return (
    <canvas
      width="520"
      height="520"
      className={cx('bg-white', {
        'cursor-crosshair': gameState.isCurrentUserDrawing,
      })}
      ref={(canvas) => {
        const state = {
          isMouseDown: false,
          lastPointCoordinates: null as { x: number; y: number } | null,
        };

        const canvasCtx = canvas?.getContext('2d');
        if (!canvas || !canvasCtx) {
          return;
        }
        canvasCtx.imageSmoothingEnabled = false;
        const onMouseDown = (e: MouseEvent) => {
          state.isMouseDown = true;

          draw({
            x: e.offsetX,
            y: e.offsetY,
            radius: gameState.radius,
            canvasCtx,
            currentColor: gameState.currentColor,
            state,
          });
        };

        const onMouseUp = () => {
          state.isMouseDown = false;
          state.lastPointCoordinates = null;
        };

        const onMouseLeave = () => {
          state.isMouseDown = false;
          state.lastPointCoordinates = null;
        };

        const onMouseMove = (e: MouseEvent) => {
          if (state.isMouseDown) {
            draw({
              x: e.offsetX,
              y: e.offsetY,
              radius: gameState.radius,
              canvasCtx,
              currentColor: gameState.currentColor,
              state,
            });
          }
        };

        if (gameState.isCurrentUserDrawing) {
          canvas.addEventListener('mousedown', onMouseDown);
          canvas.addEventListener('mouseup', onMouseUp);
          canvas.addEventListener('mouseleave', onMouseLeave);
          canvas.addEventListener('mousemove', onMouseMove);
        }

        const onDrawCircle = (data: DrawCircleParams) => drawCircle({ ...data, canvasCtx });
        const onDrawLine = (data: DrawLineParams) => drawLine({ ...data, canvasCtx });

        socket.on('drawCircle', onDrawCircle);
        socket.on('drawLine', onDrawLine);

        return () => {
          if (gameState.isCurrentUserDrawing) {
            canvas.removeEventListener('mousedown', onMouseDown);
            canvas.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            canvas.removeEventListener('mousemove', onMouseMove);
          }

          socket.off('drawCircle', onDrawCircle);
          socket.off('drawLine', onDrawLine);
        };
      }}
    ></canvas>
  );
};

export default Canvas;
