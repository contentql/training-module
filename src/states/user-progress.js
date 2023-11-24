import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

const instialState = {
  lessons: [],
};

export const useUserProgress = create(
  //   persist(

  (set) => ({
    ...instialState,
    addToLessons: (id) =>
      set((state) =>
        state.lessons.includes(id)
          ? state.lessons
          : { lessons: [...state.lessons, { LessonTitle: id }] }
      ),
    updateLessons: (userProgress) => {
      set({ lessons: userProgress });
    },
    reset: () => {
      set(instialState);
    },
  })
);
