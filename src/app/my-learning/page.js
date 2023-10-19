'use client';

import { _courses } from 'src/_mock';
import MainLayout from 'src/layouts/main';

import ElearningLandingFeaturedCourses from './mylearning-courses';

// ----------------------------------------------------------------------

export default function MyLearning() {
  return (
    <MainLayout>
      <ElearningLandingFeaturedCourses courses={_courses} />
    </MainLayout>
  );
}
