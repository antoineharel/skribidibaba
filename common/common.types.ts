export interface User {
  id: string;
  isGameMaster: boolean;
  name: string;
}

export interface Room {
  id: string;
  users: User[];
  state: 'idle' | 'drawing';
}
