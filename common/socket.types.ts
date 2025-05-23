import type { DrawCircleParams, DrawLineParams } from './canvas.types';
import type { Room } from './common.types';

interface CommonEvents {
  // Drawing
  drawCircle: (params: DrawCircleParams) => void;
  drawLine: (params: DrawLineParams) => void;
}

export interface ServerToClientEvents extends CommonEvents {
  // General
  welcome: (userId: string) => void;

  // Rooms
  roomJoined: (room: Room) => void;
  joinRoomNotFound: (roomId: string) => void;
  userListUpdated: (room: Room) => void;
  
  // Game
  gameStarted: (room: Room) => void;
}

export interface ClientToServerEvents extends CommonEvents {
  createRoom: () => void;
  joinRoom: (roomId: string) => void;
  changeName: (newName: string) => void;
  
  // Game
  startGame: () => void;
}
