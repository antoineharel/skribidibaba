import { io, Socket } from 'socket.io-client';
import { useStore } from '../store/store';
import type { ClientToServerEvents, ServerToClientEvents } from '../../common/socket.types';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_SERVER_URL
);

socket.on('welcome', (userId) => {
  useStore.setState({ userId });
});
socket.on('roomJoined', (room) => {
  useStore.setState({ room });
});
socket.on('userListUpdated', (room) => {
  useStore.setState({ room });
});
socket.on('gameStarted', (room) => {
  useStore.setState({ room });
});

socket.on('choseWord', (wordsToChoose) => {
  useStore.setState({ wordsToChoose });
});
socket.on('roundStarted', (room) => {
  useStore.setState({ wordsToChoose: null, room });
});
