// import type { IUser } from "@/types";
import type { ICart, IUser, IWishlist } from "@/types";
import { create } from "zustand";

interface IUserStore {
  user: IUser | null;
  setUser: (data: IUser | null) => void;

  // cart
  // wishlist
   cart: ICart[] | null;
  setCart: (data: ICart[] | null) => void;

  addCartItem: (item: ICart) => void;
  removeCartItem: (itemId: string) => void;

  wishlist: IWishlist[] | null;
  setWishlist: (data: IWishlist[] | null) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
   setUser: (data) => set({ user: data }),

  cart: null,
  setCart: (data) => set({ cart: data }),

  addCartItem: (item) => set((state) => ({ cart: [...state.cart!, item] })),
  removeCartItem: (itemId) => set((state) => ({ cart: state.cart!.filter((item) => item.item !== itemId) })),

  wishlist: null,
  setWishlist: (data) => set({ wishlist: data }),

}));

export default useUserStore;