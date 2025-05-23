export interface User {
  id: string;
  isGameMaster: boolean;
  name: string;
  score: number;
}

export interface Room {
  id: string;
  users: User[];
  state: 'idle' | 'drawing';
  currentRoundIndex: number;
  rounds: {
    drawingUserId: string;
    word: string | null;
    startedAt: number | null;
    duration: number;
  }[];
}
