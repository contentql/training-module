'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _courses } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { getCoursesData } from 'src/queries/courses';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningFilters from '../filters/elearning-filters';
import ElearningCourseList from '../list/elearning-course-list';

// ----------------------------------------------------------------------

export default function ElearningCoursesView() {
  const mobileOpen = useBoolean();

  const loading = useBoolean(true);

  const [filters, setFilters] = useState({
    text: '',
    rating: null,
    duration: [],
    category: [],
    fee: [],
  });

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: getCoursesData,
  });

  console.log('data', data);

  useEffect(() => {
    if (!data) return;
    loading.onFalse();
  }, [data, loading]);

  if (loading.value) return <SplashScreen />;

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 5,
          }}
        >
          <Typography variant="h2">Courses</Typography>

          <Button
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:filter" width={18} />}
            onClick={mobileOpen.onTrue}
            sx={{
              display: { md: 'none' },
            }}
          >
            Filters
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }}>
          <ElearningFilters
            open={mobileOpen.value}
            onClose={mobileOpen.onFalse}
            filters={filters}
            setFilters={setFilters}
          />

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            <ElearningCourseList courses={data} loading={loading.value} filters={filters} />
          </Box>
        </Stack>
      </Container>

      <ElearningNewsletter />
    </>
  );
}
