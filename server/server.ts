import { Server } from 'socket.io';
import { generateId } from './utils/id';
import { ClientToServerEvents, ServerToClientEvents } from '../common/socket.types';
import { Room } from '../common/common.types';

const io = new Server<ClientToServerEvents, ServerToClientEvents>(3000, { cors: { origin: '*' } });

const rooms: Room[] = [];

io.on('connection', (socket) => {
  // Send welcome message
  const userId = socket.id;
  let currentRoomId: string | null = null;

  socket.emit('welcome', userId);

  // Listen for room events
  socket.on('createRoom', async () => {
    const roomId = generateId();

    await socket.join(roomId);
    const newRoom: Room = {
      id: roomId,
      users: [
        {
          id: userId,
          isGameMaster: true,
          name: 'Game Master',
          score: 0,
        },
      ],
      state: 'idle',
      rounds: [],
      currentRoundIndex: 0,
    };
    rooms.push(newRoom);
    currentRoomId = roomId;

    socket.emit('roomJoined', newRoom);
  });

  socket.on('joinRoom', async (roomId) => {
    const roomIndex = rooms.findIndex((room) => room.id === roomId);
    if (roomIndex < 0) {
      socket.emit('joinRoomNotFound', roomId);
      return;
    }

    await socket.join(roomId);
    currentRoomId = roomId;
    rooms[roomIndex].users.push({
      id: userId,
      isGameMaster: false,
      name: `Guest ${rooms[roomIndex].users.length}`,
      score: 0,
    });

    socket.emit('roomJoined', rooms[roomIndex]);
    io.to(roomId).emit('userListUpdated', rooms[roomIndex]);
  });

  // Listen for drawing events
  socket.on('drawCircle', (data) => {
    if (!currentRoomId) {
      return;
    }

    socket.to(currentRoomId).emit('drawCircle', data);
  });

  socket.on('drawLine', (data) => {
    if (!currentRoomId) {
      return;
    }

    socket.to(currentRoomId).emit('drawLine', data);
  });

  socket.on('changeName', (newName) => {
    if (!currentRoomId) {
      return;
    }

    const roomIndex = rooms.findIndex((room) => room.id === currentRoomId);
    const userIndex = rooms[roomIndex].users.findIndex((user) => user.id === userId);

    rooms[roomIndex].users[userIndex].name = newName;

    io.to(currentRoomId).emit('userListUpdated', rooms[roomIndex]);
  });

  // Game events
  socket.on('startGame', () => {
    if (!currentRoomId) {
      return;
    }
    const roomIndex = rooms.findIndex((room) => room.id === currentRoomId);

    rooms[roomIndex].state = 'drawing';
    rooms[roomIndex].currentRoundIndex = 0;
    rooms[roomIndex].rounds = rooms[roomIndex].users.map((user) => ({
      drawingUserId: user.id,
      word: null,
      startedAt: null,
      duration: 60_000,
    }));

    // Send the list of words to the current drawing user
    const words = ['apple', 'banana', 'cherry', 'grape', 'orange'];
    const drawingUserId = rooms[roomIndex].rounds[0].drawingUserId;
    const drawingUserSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.id === drawingUserId
    );

    if (drawingUserSocket) {
      drawingUserSocket.emit('choseWord', words);
    }

    io.to(currentRoomId).emit('gameStarted', rooms[roomIndex]);
  });

  socket.on('chooseWord', (word) => {
    if (!currentRoomId) {
      return;
    }

    const roomIndex = rooms.findIndex((room) => room.id === currentRoomId);
    const roundIndex = rooms[roomIndex].currentRoundIndex;

    rooms[roomIndex].rounds[roundIndex].word = word;
    rooms[roomIndex].rounds[roundIndex].startedAt = Date.now();

    console.log(rooms[roomIndex]);

    io.to(currentRoomId).emit('roundStarted', rooms[roomIndex]);
  });

  // Goodbye...
  socket.on('disconnect', () => {
    if (!currentRoomId) {
      return;
    }

    const roomIndex = rooms.findIndex((room) => room.id === currentRoomId);
    rooms[roomIndex].users = rooms[roomIndex].users.filter((user) => user.id !== userId);

    if (rooms[roomIndex].users.length === 0) {
      // If no user anymore, delete the room
      rooms.slice(roomIndex);
    } else {
      // If game master has left, promote first user to game master
      if (!rooms[roomIndex].users.some((user) => user.isGameMaster)) {
        rooms[roomIndex].users[0].isGameMaster = true;
      }

      io.to(rooms[roomIndex].id).emit('userListUpdated', rooms[roomIndex]);
    }
  });
});
