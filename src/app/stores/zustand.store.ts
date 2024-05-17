import { create } from "zustand";

type State = {
  round: number;
  timer: number;
  isEnded: boolean;
};

type Actions = {
  incrementRound: () => void;
  resetRound: () => void;
  setEndedRound: () => void;
  resetEnded: () => void;
};

export const useRoundStore = create<State & Actions>((set) => ({
  round: 0,
  timer: 60,
  isEnded: false,
  incrementRound: () => set((state) => ({ round: state.round + 1 })),
  resetRound: () => set({ round: 0 }),
  setEndedRound: () => set({ isEnded: true }),
  resetEnded: () => set({ isEnded: false }),
}));

type UserStore = {
  user: IUser;
  setUser: (newUser: IUser) => void;
};
export const useUserStore = create<UserStore>((set) => ({
  user: {} as IUser,
  setUser: (newUser: IUser) => set({ user: newUser }),
}));
