import { useState, type FC } from 'react';
import { socket } from '../../utils/socket';

const url = new URL(window.location.href);
url.searchParams.get('roomId');

const Homepage: FC = () => {
  const [roomId, setRoomId] = useState(() => url.searchParams.get('roomId') ?? '');

  const createRoom = () => {
    socket.emit('createRoom');
  };

  const joinRoom = () => {
    socket.emit('joinRoom', roomId);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-sm flex flex-col gap-2">
        <button
          className="bg-white/90 text-black rounded py-2 px-3 cursor-pointer active:brightness-75"
          onClick={createRoom}
        >
          Create a room
        </button>
        <div className="flex items-center gap-2">
          <div className="h-px w-full bg-white/20" />
          <div className="text-white">OR</div>
          <div className="h-px w-full bg-white/20" />
        </div>
        <input
          placeholder="Room ID"
          type="text"
          className="bg-white/90 text-black rounded py-2 px-3"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          className="bg-white/90 text-black rounded py-2 px-3 cursor-pointer active:brightness-75"
          onClick={joinRoom}
        >
          Join a room
        </button>
      </div>
    </main>
  );
};

export default Homepage;
