'use client';

import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useForm,
  // Controller
} from 'react-hook-form';

import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { _mock } from 'src/_mock';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useUserStore } from 'src/states/auth-store';
import ElearningCourseItem from 'src/sections/_elearning/list/elearning-course-item';

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const userData = useUserStore((state) => state.UserData);

  const { isLoading, data } = useQuery(['repoData', userData.id], () =>
    fetch(process.env.NEXT_PUBLIC_MY_LEARNING_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userData.authToken}`,
      },
    }).then((res) => res.json())
  );

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Courses
      </Typography>
      {data?.length > 0 ? (
        <Grid
          container
          spacing={2}
          sx={{
            position: 'relative',
            ml: { md: -2 },
            mt: 5,
          }}
        >
          {data.map((course) => {
            const newCourse = {
              id: course.id,
              attributes: course,
            };

            return (
              <Grid
                item
                md={6}
                key={course.id}
                sx={{
                  px: 2,
                  pt: { xs: 8, md: 15 },
                }}
              >
                <ElearningCourseItem course={newCourse} vertical isMyLearning />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            ml: { md: -2 },
            mt: { xs: 12, md: 4 },
          }}
        >
          <Image
            alt="Empty State My Learning"
            src="/assets/images/mylearning/empty-state-mylearning.png"
            sx={{
              height: 1,
              width: { xs: 200, md: 360 },
              objectFit: 'cover',
              opacity: 0.6,
            }}
          />

          <Link component={RouterLink} href={paths.eLearning.courses} sx={{ pt: 2 }}>
            <Button
              sx={{ bgcolor: '#FF774B' }}
              size="large"
              variant="contained"
              startIcon={<Iconify icon="carbon:chevron-left" />}
            >
              Explore Now
            </Button>
          </Link>
        </Stack>
      )}
    </>
  );
}
