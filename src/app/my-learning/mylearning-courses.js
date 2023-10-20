import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ElearningCourseItem from 'src/sections/_elearning/list/elearning-course-item';

// ----------------------------------------------------------------------

export default function ElearningLandingFeaturedCourses({ courses }) {
  

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'flex-end' }}
        sx={{
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Stack spacing={3} flexGrow={1}>
          <Typography variant="h2">My Courses</Typography>
        </Stack>
      </Stack>

      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          ml: { md: -2 },
          mt: 5,
        }}
      >
        {courses.map((course) => (
          <Grid
            item
            md={6}
            lg={4}
            key={course.id}
            sx={{
              px: 2,
              pt: { xs: 8, md: 15 },
            }}
          >
            <ElearningCourseItem course={course} vertical />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

ElearningLandingFeaturedCourses.propTypes = {
  courses: PropTypes.array,
};
