import type { IUser } from "@/types";
import { create } from "zustand";

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;

  // cart
  // wishlist
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;