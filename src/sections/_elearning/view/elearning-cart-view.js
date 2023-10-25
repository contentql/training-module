'use client';

import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningCartList from '../cart/elearning-cart-list';
import ElearningCartSummary from '../cart/elearning-cart-summary';

// ----------------------------------------------------------------------

export default function ElearningCartView() {
  const _courses = useCartStore((state) => state.cart);

  const loading = useBoolean(true);

  const cost = _courses.map((course) => course.attributes.price).reduce((a, b) => a + b, 0);
  const discountPercent = cost && 7;
  const taxPercent = cost && 18;

  const subTotal = cost;
  const discount = cost && cost * (discountPercent / -16.17);
  const tax = cost && cost * (taxPercent / 100);
  const total = cost && subTotal + discount + tax;

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

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
