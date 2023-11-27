'use client';

import { useQuery } from 'react-query';
// import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm, Controller } from 'react-hook-form';

// import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
// import { _mock } from 'src/_mock';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useUserStore } from 'src/states/auth-store';
import ElearningCourseItem from 'src/sections/_elearning/list/elearning-course-item';

import MyLearningCard from '../../../sections/_ecommerce/account/mylearning-card';

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const userData = useUserStore((state) => state.UserData);
  const [quizScore, setQuizScore] = useState([]);

  useEffect(() => {
    const fetchScore = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_QUIZ_SCORE);
      const data = await res.json();

      setQuizScore(
        data.data.filter((scoreData) => userData.username === scoreData.attributes.username)
      );
    };
    fetchScore();
  }, [userData.username]);

  const { data } = useQuery(['repoData', userData.id], () =>
    fetch(process.env.NEXT_PUBLIC_MY_LEARNING_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userData.authToken}`,
      },
    }).then((res) => res.json())
  );

  const ProfileData = [
    {
      id: 1,
      title: 'Courses Enrolled',
      score: data?.length,
    },
    {
      id: 2,
      title: 'Lessons Completed',
      score: '4',
    },
    {
      id: 3,
      title: 'Courses Completed',
      score: quizScore.length,
    },
  ];

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Courses
      </Typography>

      <Stack direction="row" spacing={2}>
        {ProfileData.map((profile) => (
          <MyLearningCard voucher={profile} />
        ))}
      </Stack>

      {data &&
        (data?.length > 0 ? (
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
              mt: { xs: 12, md: 10 },
            }}
          >
            <Image
              alt="Empty State My Learning"
              src="/assets/images/empty-states/no-learning.png"
              sx={{
                height: { xs: 122, md: 182 },
                width: { xs: 160, md: 220 },
                objectFit: 'cover',
              }}
            />

            <Link component={RouterLink} href={paths.eLearning.courses} sx={{ pt: 12, pl: 4 }}>
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
        ))}
    </>
  );
}
