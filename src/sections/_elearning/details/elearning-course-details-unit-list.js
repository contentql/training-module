'use client';

import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import ElearningCourseDetailsUnitItem from './elearning-course-details-unit-item';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonList({ units }) {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Units
      </Typography>

      {units.map((unit, index) => (
        <ElearningCourseDetailsUnitItem key={index} unit={unit} index={index} />
      ))}
    </div>
  );
}

ElearningCourseDetailsLessonList.propTypes = {
  units: PropTypes.array,
};
