'use client';

import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import Quiz from 'src/sections/quiz';
import { _questions } from 'src/_mock';

import ElearningCourseDetailsUnitItem from './elearning-course-details-unit-item';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonList({ units, hasBoughtCourse }) {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Units
      </Typography>

      {units?.map((unit, index) => (
        <ElearningCourseDetailsUnitItem
          hasBoughtCourse={hasBoughtCourse}
          key={index}
          unit={unit.attributes}
          index={index}
          units={units}
        />
      ))}
      <Quiz _questions={_questions} hasBoughtCourse={hasBoughtCourse} />
    </div>
  );
}

ElearningCourseDetailsLessonList.propTypes = {
  units: PropTypes.array,
  hasBoughtCourse: PropTypes.bool,
};
