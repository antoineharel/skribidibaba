import ColorPalette from './color-palette';
import Canvas from './canvas';
import type { FC } from 'react';
import { useGame } from '../../store/store';
import IdlePage from '../idle/idle.page';
import SelectWord from './select-word';
import { createPortal } from 'react-dom';

const GameMain: FC = () => {
  const room = useGame((state) => state.room)!;

  if (room.state === 'drawing') {
    return (
      <main className="p-8 space-y-4">
        {createPortal(<SelectWord />, document.body)}

        <Canvas />
        <ColorPalette />
      </main>
    );
  }

  if (room.state === 'idle') {
    return <IdlePage />;
  }
};

export default GameMain;
