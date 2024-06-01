import { create } from "zustand";

type Coordinations = { lat: number; lng: number };

type State = {
  marker: Coordinations;
  location: Coordinations;
};

type Actions = {
  setMarker: (data: Coordinations) => void;
  setLocation: (data: Coordinations) => void;
  clearState: () => void; // Define clearState action
};

export const useRoundStore = create<State & Actions>((set) => ({
  marker: { lat: 0, lng: 0 },
  location: { lat: 0, lng: 0 },
  setMarker: (data) => set((state) => ({ ...state, marker: data })),
  setLocation: (data) => set((state) => ({ ...state, location: data })),
  clearState: () =>
    set({ marker: { lat: 0, lng: 0 }, location: { lat: 0, lng: 0 } })
}));

type State2 = {
  avatarPath: string;
};

type Actions2 = {
  setAvatarPath: (data: string) => void;
  clearState: () => void;
};

export const useUserAvatarStore = create<State2 & Actions2>((set) => ({
  avatarPath: "",
  setAvatarPath: (data) => set((state) => ({ ...state, avatarPath: data })),
  clearState: () => set({ avatarPath: "" })
}));
