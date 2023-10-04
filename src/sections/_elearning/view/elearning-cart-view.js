'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { fCurrency } from 'src/utils/format-number';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningFilters from '../filters/elearning-filters';
import ElearningCourseList from '../list/elearning-course-list';

// ----------------------------------------------------------------------

export default function ElearningCoursesView() {
  const _courses = useCartStore((state) => state.cart);

  const totalPrice = _courses.map((course) => course.price).reduce((a, b) => a + b, 0);

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
          <Typography variant="h2">Cart</Typography>

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
            <ElearningCourseList courses={_courses} loading={loading.value} filters={filters} />

            <Divider
              sx={{
                mb: 2,
              }}
            />

            <Box
              direction="row"
              sx={{
                flexGrow: 1,
                mb: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>
                Total Price: <strong>{fCurrency(totalPrice)}</strong>
              </Typography>

              <Link component={RouterLink} href={paths.eLearning.checkout}>
                <Button variant="contained" color="primary">
                  Proceed to Buy
                </Button>
              </Link>
            </Box>
          </Box>
        </Stack>
      </Container>

      <ElearningNewsletter />
    </>
  );
}
