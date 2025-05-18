import { io, Socket } from 'socket.io-client';
import { useGame } from '../store/store';
import type { ClientToServerEvents, ServerToClientEvents } from '../../common/socket.types';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_SERVER_URL
);

socket.on('welcome', (userId) => {
  useGame.setState({ userId });
});
socket.on('roomJoined', (room) => {
  useGame.setState({ room });
});
socket.on('userListUpdated', (room) => {
  useGame.setState({ room });
});
