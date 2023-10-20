'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from 'react-query';

import { _courses } from 'src/_mock';
import MainLayout from 'src/layouts/main';
import ProtectedRoute from 'src/routes/components/protected-route';

import ElearningLandingFeaturedCourses from './mylearning-courses';

// ----------------------------------------------------------------------
const queryClient = new QueryClient();

export default function MyLearning() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <QueryClientProvider client={queryClient}>
          <ElearningLandingFeaturedCourses courses={_courses} />
        </QueryClientProvider>
      </MainLayout>
    </ProtectedRoute>
  );
}
