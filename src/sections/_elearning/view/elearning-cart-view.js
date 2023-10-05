'use client';

import { useState, useEffect } from 'react';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
// import { fCurrency } from 'src/utils/format-number';

import ElearningNewsletter from '../elearning-newsletter';
// import ElearningFilters from '../filters/elearning-filters';
// import ElearningCourseList from '../list/elearning-course-list';
import ElearningCartList from '../cart/elearning-cart-list';
import ElearningCartSummary from '../cart/elearning-cart-summary';

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
      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h3" sx={{ mb: 5 }}>
          Shopping Cart
        </Typography>

        <Grid container spacing={{ xs: 5, md: 4 }}>
          <Grid xs={12} md={8} sx={{ p: 4 }}>
            <ElearningCartList courses={_courses} />
          </Grid>

          <Grid xs={12} md={4} sx={{ p: 4 }}>
            <ElearningCartSummary
              tax={7}
              total={357.09}
              subtotal={89.09}
              shipping={55.47}
              discount={16.17}
            />
          </Grid>
        </Grid>

        <Button
          component={RouterLink}
          href={paths.eCommerce.products}
          color="inherit"
          startIcon={<Iconify icon="carbon:chevron-left" />}
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>
      </Container>

      <ElearningNewsletter />
    </>
  );
}
