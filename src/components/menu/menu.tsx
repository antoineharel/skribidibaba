import type { FC } from 'react';
import { useGame } from '../../store/store';

const Menu: FC = () => {
  const gameState = useGame();

  return (
    <div className="fixed bottom-4 right-4 bg-white/20 text-sm text-black p-2">
      <pre>{JSON.stringify(gameState, null, 2)}</pre>
    </div>
  );
};

export default Menu;
