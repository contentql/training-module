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
          : courses.filter((course) => {
              if (
                filters.text === '' &&
                filters.rating === null &&
                filters.duration.length === 0 &&
                filters.category === '' &&
                filters.fee === ''
              )
                return true;

              return (
                (filters.text !== '' &&
                  course.slug.toLowerCase().includes(filters.text.toLowerCase())) ||
                (filters.rating && Number(course.ratingNumber) >= Number(filters.rating)) ||
                (filters.duration.length > 0 &&
                  filters.duration.filter(
                    (duration) =>
                      (duration === '0 - 1 Hour' && course.totalHours <= 1) ||
                      (duration === '1 - 3 Hours' && course.totalHours <= 3) ||
                      (duration === '3 - 6 Hours' && course.totalHours <= 6) ||
                      (duration === '6 - 18 Hours' && course.totalHours <= 18) ||
                      (duration === '18+ Hours' && course.totalHours > 18)
                  ).length === 1)
              );
            })
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
