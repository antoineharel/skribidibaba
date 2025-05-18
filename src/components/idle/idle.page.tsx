import type { FC } from 'react';
import { useGame } from '../../store/store';

const IdlePage: FC = () => {
  const { room, userId } = useGame();

  if (!room || !userId) {
    throw new Error('No room');
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl mb-6">Room {room.id}</h1>
      <h2 className="text-2xl">Users</h2>
      <div className="divide-y divide-gray-200">
        {room.users.map((user) => (
          <div key={user.id} className="bg-white p-3 text-black flex items-center gap-x-2">
            {user.name} {user.isGameMaster && <span>👑</span>}{' '}
            {user.id === userId && (
              <span className="bg-blue-200 px-2 py-1 rounded-2xl text-sm">You</span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default IdlePage;
