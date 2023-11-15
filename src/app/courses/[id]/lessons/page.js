import PropTypes from 'prop-types';

import ElearningLessonsView from 'src/sections/_elearning/view/elearning-lessons-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Lessons',
};

export default function ElearningCourseDetailsLessonsPage({ params }) {
  return <ElearningLessonsView params={params} />;
}

ElearningCourseDetailsLessonsPage.propTypes = {
  params: PropTypes.object,
};
