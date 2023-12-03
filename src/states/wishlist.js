import { create } from 'zustand';
import { toast } from 'react-toastify';
import { persist } from 'zustand/middleware';

import { toastSettings } from './toast-settings';

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      addToWishlist: (wishlistCourse) =>
        set((state) => {
          toast.success('Added To Wishlist', toastSettings);
          if (state.wishlist.includes(wishlistCourse)) return state.wishlist;
          return { wishlist: [...state.wishlist, wishlistCourse] };
        }),
      removeFromWishlist: (wishlist) =>
        set((state) => {
          toast.error('Removed From Wishlist', toastSettings);
          return {
            wishlist: state.wishlist.filter((wishlistItem) => wishlistItem.id !== wishlist.id),
          };
        }),
      emptyWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
