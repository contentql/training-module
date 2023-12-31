import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const store = persist(
  (set) => ({
    UserData: {
      authToken: '',
      userName: '',
      isLoggedIn: false,
      image: null,
    },
    updateUserData: (userData) => {
      set(() => ({
        UserData: userData,
      }));
    },
    updateImage: (image) => {
      set((state) => ({
        ...state.UserData,
        image,
      }));
    },
    removeUserData: () => {
      set(() => ({
        UserData: {
          authToken: '',
          userName: '',
          isLoggedIn: false,
          image: null,
        },
      }));
    },
  }),
  {
    name: 'user-data',
  }
);

export const useUserStore = create(store);
