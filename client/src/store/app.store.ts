import { create } from "zustand";

interface IAppStore {
  sidebar: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const useAppStore = create<IAppStore>((set) => ({
  sidebar: false,
  openSidebar: () => set({ sidebar: true }),
  closeSidebar: () => set({ sidebar: false }),
}));

export default useAppStore;