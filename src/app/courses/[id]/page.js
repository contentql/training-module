'use client';

import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from 'react-query';

import MainLayout from 'src/layouts/main';
import ElearningCourseView from 'src/sections/_elearning/view/elearning-course-view';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function ElearningCoursePage({ params }) {
  return (
    <MainLayout>
      <ElearningCourseView courseId={params.id} />
    </MainLayout>
  );
}

ElearningCoursePage.propTypes = {
  params: PropTypes.object,
};
