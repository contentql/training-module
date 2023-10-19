import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { _mock } from 'src/_mock';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {
        image: _mock.image.avatar(0),
      },
      updateUser: (userData) => set(() => ({ user: userData })),
      logout: () => set(() => ({ user: null })),
    }),
    {
      name: 'user-storage',
    }
  )
);
