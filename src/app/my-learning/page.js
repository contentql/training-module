'use client';

import { _courses } from 'src/_mock';
import MainLayout from 'src/layouts/main';
import ProtectedRoute from 'src/routes/components/protected-route';

import ElearningLandingFeaturedCourses from './mylearning-courses';

// ----------------------------------------------------------------------

export default function MyLearning() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <ElearningLandingFeaturedCourses courses={_courses} />
      </MainLayout>
    </ProtectedRoute>
  );
}
