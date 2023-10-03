import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import ElearningCourseItem from './elearning-course-item';
import ElearningCourseItemSkeleton from './elearning-course-item-skeleton';

// ----------------------------------------------------------------------

export default function ElearningCourseList({ courses, loading, filters }) {
  return (
    <>
      <Stack spacing={4}>
        {(loading
          ? [...Array(9)]
          : courses.filter(
              (course) =>
                (filters.text !== '' &&
                  course.slug.toLowerCase().includes(filters.text.toLowerCase())) ||
                Number(course.ratingNumber) >= Number(filters.rating)
            )
        ).map((course, index) =>
          course ? (
            <ElearningCourseItem key={course.id} course={course} id={course.id} />
          ) : (
            <ElearningCourseItemSkeleton key={index} />
          )
        )}
      </Stack>

      <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

ElearningCourseList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool,
  filters: PropTypes.object,
};
