'use client';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningCartList from '../cart/elearning-cart-list';
import ElearningCartSummary from '../cart/elearning-cart-summary';

// ----------------------------------------------------------------------

export default function ElearningCoursesView() {
  const _courses = useCartStore((state) => state.cart);

  const cost = _courses.map((course) => course.price).reduce((a, b) => a + b, 0);
  const discountPercent = cost && 7;
  const taxPercent = cost && 7;

  const subTotal = cost;
  const discount = cost && cost * (discountPercent / -16.17);
  const tax = cost && cost * (taxPercent / 100);
  const total = cost && subTotal + discount + tax;

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

        <Grid container spacing={4}>
          <Grid item xs={13} md={8} sx={{ p: 4 }}>
            <ElearningCartList courses={_courses} />
          </Grid>

          <Grid item xs={12} md={4} sx={{ py: 4, pl: 4 }}>
            <ElearningCartSummary
              tax={tax}
              taxPercent={taxPercent}
              total={total}
              subtotal={subTotal}
              discountPercent={discountPercent}
              discount={discount}
            />
          </Grid>
        </Grid>

        <Button
          component={RouterLink}
          href={paths.eLearning.courses}
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
