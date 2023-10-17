import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      addToWishlist: (wishlistCourse) =>
        set((state) =>
          state.wishlist.includes(wishlistCourse)
            ? state.wishlist
            : { wishlist: [...state.wishlist, wishlistCourse] }
        ),
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
