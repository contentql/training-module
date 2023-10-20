'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from 'react-query';

import MainLayout from 'src/layouts/main';
import ElearningCoursesView from 'src/sections/_elearning/view/elearning-courses-view';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function ElearningCoursesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <ElearningCoursesView />
      </MainLayout>
    </QueryClientProvider>
  );
}
