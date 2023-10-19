import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const store = persist(
  (set) => ({
    UserData: {
      authToken: '',
      userName: '',
      isLoggedIn: false,
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

export const useStore = create(store);
