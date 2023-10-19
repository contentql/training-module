import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { _mock } from 'src/_mock';

const store = persist(
  (set) => ({
    UserData: {
      authToken: '',
      userName: '',
      isLoggedIn: false,
      image: _mock.image.avatar(0),
    },
    updateUserData: (userData) => {
      set(() => ({
        UserData: userData,
      }));
    },
    removeUserData: () => {
      set(() => ({
        UserData: {
          authToken: '',
          userName: '',
          isLoggedIn: false,
        },
      }));
    },
  }),
  {
    name: 'user-data',
  }
);

export const useUserStore = create(store);
