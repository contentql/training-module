import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (course) => set((state) => ({ cart: [...state.cart, course] })),
  removeFromCart: (course) =>
    set((state) => ({ cart: state.cart.filter((courseItem) => courseItem !== course) })),
}));
