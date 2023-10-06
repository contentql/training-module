import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (course) => set((state) => ({ cart: [...state.cart, course] })),
      removeFromCart: (course) =>
        set((state) => ({ cart: state.cart.filter((courseItem) => courseItem !== course) })),
      emptyCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
