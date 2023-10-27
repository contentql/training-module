import { create } from 'zustand';
import { toast } from 'react-toastify';
import { persist } from 'zustand/middleware';

import { toastSettings } from './toast-settings';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (course) =>
        set((state) => {
          toast.success('Adding To Cart', toastSettings);
          return state.cart.includes(course) ? state.cart : { cart: [...state.cart, course] };
        }),
      removeFromCart: (course) =>
        set((state) => {
          toast.error('Removed From Cart', toastSettings);
          return { cart: state.cart.filter((courseItem) => courseItem.id !== course.id) };
        }),
      emptyCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
