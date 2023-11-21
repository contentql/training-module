'use client';

import { useEffect } from 'react';

import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
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

  const isEmpty = _courses.length === 0;

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
            {_courses.length ? (
              <ElearningCartList courses={_courses} />
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
                  src="/assets/images/empty-states/empty-cart.png"
                  sx={{
                    height: { xs: 122, md: 300 },
                    width: { xs: 160, md: 300 },
                    objectFit: 'cover',
                  }}
                />

                <Link component={RouterLink} href={paths.eLearning.courses} sx={{ pt: 6 }}>
                  <Button
                    sx={{ bgcolor: '#FF774B' }}
                    size="large"
                    variant="contained"
                    startIcon={<Iconify icon="carbon:chevron-left" />}
                  >
                    Add Courses Now
                  </Button>
                </Link>
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={4} sx={{ py: 4, pl: 4 }}>
            <ElearningCartSummary
              tax={tax}
              taxPercent={taxPercent}
              total={total}
              subtotal={subTotal}
              discountPercent={discountPercent}
              discount={discount}
              isEmpty={isEmpty}
            />
          </Grid>
        </Grid>

        {!!_courses.length && (
          <Button
            component={RouterLink}
            href={paths.eLearning.courses}
            color="inherit"
            startIcon={<Iconify icon="carbon:chevron-left" />}
            sx={{ mt: 3 }}
          >
            Continue Shopping
          </Button>
        )}
      </Container>

      <ElearningNewsletter />
    </>
  );
}
