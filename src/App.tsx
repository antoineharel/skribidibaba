import GameMain from './components/game/game.main';
import Homepage from './components/homepage/homepage';
import Menu from './components/menu/menu';
import { useGame } from './store/store';

function App() {
  const { userId, room } = useGame();

  return (
    <div>
      <Menu />
      {userId && <div>{room ? <GameMain /> : <Homepage />}</div>}
    </div>
  );
}

export default App;
