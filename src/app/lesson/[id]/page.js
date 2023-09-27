// import ElearningLessonView from 'src/sections/_elearning/view/elearning-lesson-view';

import { _courses } from 'src/_mock';

import ElearningCourseDetailsLessonList from '../../../sections/_elearning/details/elearning-course-details-lesson-list';

// // ----------------------------------------------------------------------

export const metadata = {
  title: 'Design Masterclass Course',
};

const _mockCourse = _courses[0];

export default function ElearningLessonPage() {
  return <ElearningCourseDetailsLessonList lessons={_mockCourse.lessons} />;
}
