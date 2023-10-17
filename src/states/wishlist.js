import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      wishlist: [],
      addToWishlist: (wishlist) => set((state) => ({ wishlist: [...state.wishlist, wishlist] })),
      removeFromWishlist: (wishlist) =>
        set((state) => ({
          wishlist: state.wishlist.filter((wishlistItem) => wishlistItem.id !== wishlist.id),
        })),
      emptyWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
