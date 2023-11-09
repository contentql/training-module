import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useUserStore } from 'src/states/auth-store';

import ElearningCourseDetailsUnitList from './elearning-course-details-unit-list';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsSummary({ course }) {
  const userData = useUserStore((state) => state.UserData);

  const { isLoggedIn } = userData;

  const hasBoughtCourse =
    isLoggedIn &&
    course.users?.data.filter((user) => user.id === userData.id.toString()).length > 0;
  console.log('course', course.units.data);
  return (
    <Stack spacing={5}>
      <ElearningCourseDetailsUnitList
        units={course.units?.data}
        quiz={course?.quiz}
        // unitQuiz={course.units?.data.attributes.quiz}
        hasBoughtCourse={hasBoughtCourse}
      />

      <Stack spacing={3}>
        <Typography variant="h4">What You Will Learn</Typography>

        <Stack spacing={1}>
          {course.learnList?.map((learn) => (
            <Stack key={learn} direction="row" alignItems="center">
              <Box
                sx={{
                  mr: 1.5,
                  width: 20,
                  height: 20,
                  display: 'flex',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: (theme) => alpha(theme?.palette?.primary?.main, 0.08),
                }}
              >
                <Iconify
                  icon="carbon:checkmark"
                  sx={{ width: 16, height: 16, color: 'primary.main' }}
                />
              </Box>
              {learn}
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">Skills You Will Gain</Typography>

        <Stack direction="row" flexWrap="wrap" spacing={1}>
          {course.skills?.map((skill) => (
            <Chip key={skill} label={skill} size="small" variant="soft" onClick={() => {}} />
          ))}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h4">Overview</Typography>

        <Typography>
          Consentaneum aeternitate dignitati commoventur primisque cupit mea officia peccata parens
          egone dolorem minuis. Secundae neglegi sextilius conantur commodaita siti philosophi ioca
          tenere lorem apparet assentior pudoris sint leves neglegebat unde reliquisti simile.
        </Typography>
      </Stack>
    </Stack>
  );
}

ElearningCourseDetailsSummary.propTypes = {
  course: PropTypes.shape({
    learnList: PropTypes.array,
    units: PropTypes.object,
    skills: PropTypes.array,
    users: PropTypes.array,
    quiz: PropTypes.any,
  }),
};
