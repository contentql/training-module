import { create } from 'zustand';

import { _courses } from 'src/_mock';

export const useCartStore = create((set) => ({
  cart: [_courses[0], _courses[1]],
  addToCart: (course) => set((state) => ({ cart: [...state.cart, course] })),
  removeFromCart: (course) =>
    set((state) => ({ cart: state.cart.filter((courseItem) => courseItem !== course) })),
}));
