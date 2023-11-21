import PropTypes from 'prop-types';

import ProtectedRoute from 'src/routes/components/protected-route';
import ElearningLessonsView from 'src/sections/_elearning/view/elearning-lessons-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Lessons',
};

export default function ElearningCourseDetailsLessonsPage({ params }) {
  return (
    <ProtectedRoute>
      <ElearningLessonsView params={params} />
    </ProtectedRoute>
  );
}

ElearningCourseDetailsLessonsPage.propTypes = {
  params: PropTypes.object,
};
