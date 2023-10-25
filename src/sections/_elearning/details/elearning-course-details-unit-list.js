'use client';

import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import ElearningCourseDetailsUnitItem from './elearning-course-details-unit-item';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonList({ units, hasBoughtCourse }) {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Units
      </Typography>

      {units.map((unit, index) => (
        <ElearningCourseDetailsUnitItem
          hasBoughtCourse={hasBoughtCourse}
          key={index}
          unit={unit.attributes}
          index={index}
          units={units}
        />
      ))}
    </div>
  );
}

ElearningCourseDetailsLessonList.propTypes = {
  units: PropTypes.array,
  hasBoughtCourse: PropTypes.bool,
};
