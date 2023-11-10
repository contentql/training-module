import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const store = persist(
  (set) => ({
    UserData: {
      authToken: '',
      userName: '',
      isLoggedIn: false,
      image: null,
      progress: { unit: null, lesson: null },
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
    updateProgress: (unitId, lessonId) => {
      set(() => ({
        userData: {
          progress: {
            unit: unitId,
            lesson: lessonId,
          },
        },
      }));
    },
  }),
  {
    name: 'user-data',
  }
);

export const useUserStore = create(store);
