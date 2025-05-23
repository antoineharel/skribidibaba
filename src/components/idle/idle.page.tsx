import { useState, type FC } from 'react';
import { useGame } from '../../store/store';
import { socket } from '../../utils/socket';
import CopyLinkButton from './copy-link.button';

const IdlePage: FC = () => {
  const { room, userId } = useGame();

  if (!room || !userId) {
    throw new Error('No room');
  }

  const me = room.users.find((user) => user.id === userId);
  if (!me) {
    throw new Error('I am not in the room');
  }

  const [newName, setNewName] = useState(me.name);
  const [isEditingName, setIsEditingName] = useState(false);

  const saveNewName = () => {
    setIsEditingName(false);
    socket.emit('changeName', newName);
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl mb-6">Room {room.id}</h1>
      <h2 className="text-2xl">Users</h2>
      <div className="divide-y divide-gray-200">
        {room.users.map((user) => {
          const isMe = me.id === user.id;

          return (
            <div key={user.id} className="bg-white p-3 text-black flex items-center gap-x-2">
              {isMe && isEditingName ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-gray-200 px-1 py-1"
                  />
                  <button
                    className="ml-auto p-1 text-xs bg-green-200 rounded cursor-pointer"
                    onClick={saveNewName}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {user.name} {user.isGameMaster && <span>👑</span>}{' '}
                  {isMe && <span className="bg-blue-200 px-2 py-1 rounded-2xl text-sm">You</span>}
                  {isMe && (
                    <button
                      className="ml-auto p-1 text-xs bg-blue-200 rounded cursor-pointer"
                      onClick={() => {
                        setIsEditingName(true);
                      }}
                    >
                      Change your name
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center mt-8 gap-2">
        <CopyLinkButton />
        {me.isGameMaster ? (
          <button
            className="bg-green-600 px-4 py-2 rounded-lg text-lg cursor-pointer"
            onClick={() => {
              socket.emit('startGame');
            }}
          >
            Start Game
          </button>
        ) : (
          <div>Waiting for game master to start the game...</div>
        )}
      </div>
    </main>
  );
};

export default IdlePage;
