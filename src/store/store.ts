import { create } from 'zustand';
import type { Room } from '../../common/common.types';

export type GameState = {
  userId: string | null;
  room: Room | null;

  currentColor: string;
  setCurrentColor: (color: string) => void;

  radius: number;
  setRadius: (radius: number) => void;

  wordsToChoose: string[] | null;
};

export const useStore = create<GameState>()((set) => ({
  userId: null,
  currentColor: '#000000',
  radius: 10,
  room: null,
  wordsToChoose: null,

  setCurrentColor: (currentColor: string) => set(() => ({ currentColor })),
  setRadius: (radius: number) => set(() => ({ radius })),
}));

export const useGame = () => {
  const state = useStore();

  const currentRound =
    state.room?.currentRoundIndex === null
      ? null
      : state.room?.rounds[state.room?.currentRoundIndex] ?? null;

  const isCurrentUserDrawing = currentRound?.drawingUserId === state.userId;

  return { ...state, currentRound, isCurrentUserDrawing };
};
