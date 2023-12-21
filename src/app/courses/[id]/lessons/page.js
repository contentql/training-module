import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import ProtectedRoute from 'src/routes/components/protected-route';
import ElearningLessonsView from 'src/sections/_elearning/view/elearning-lessons-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Lessons',
};

export default function ElearningCourseDetailsLessonsPage({ params }) {
  return (
    <MainLayout>
      <ProtectedRoute>
        <ElearningLessonsView params={params} />
      </ProtectedRoute>
    </MainLayout>
  );
}

ElearningCourseDetailsLessonsPage.propTypes = {
  params: PropTypes.object,
};
