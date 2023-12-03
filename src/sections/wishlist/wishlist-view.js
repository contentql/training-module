'use client';

import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';
import { useWishlistStore } from 'src/states/wishlist';

import ElearningWishlistList from './elearning-wishlist-list';

// import EcommerceCartList from '../cart/ecommerce-cart-list';

// ----------------------------------------------------------------------

export default function EcommerceWishlistView() {
  const addToCart = useCartStore((state) => state.addToCart);
  const [wishlist, emptyWishlist] = useWishlistStore((state) => [
    state.wishlist,
    state.emptyWishlist,
  ]);

  const subtotal = wishlist.reduce(
    (accumulator, course) => accumulator + course.attributes.price,
    0
  );

  const addWishlistToCart = () => {
    wishlist.map((course) => addToCart(course));
    emptyWishlist();
  };

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Wishlist
      </Typography>

      {wishlist.length ? (
        <ElearningWishlistList wishlist={wishlist} />
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
            src="/assets/images/empty-states/no-wishlist.png"
            sx={{
              height: { xs: 122, md: 182 },
              width: { xs: 160, md: 220 },
              objectFit: 'cover',
            }}
          />

          <Link component={RouterLink} href={paths.eLearning.courses} sx={{ pt: 10 }}>
            <Button
              sx={{ bgcolor: '#FF774B' }}
              size="large"
              variant="contained"
              startIcon={<Iconify icon="carbon:chevron-left" />}
            >
              Wishlist Now
            </Button>
          </Link>
        </Stack>
      )}
      {/* <EcommerceCartList wishlist products={_products.slice(0, 4)} /> */}

      {!!wishlist.length && (
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent={{ sm: 'space-between' }}
          sx={{ mt: 3 }}
        >
          <Button
            component={RouterLink}
            href={paths.eLearning.courses}
            color="inherit"
            startIcon={<Iconify icon="carbon:chevron-left" />}
            sx={{ mt: 3 }}
          >
            Continue Shopping
          </Button>

          <Stack spacing={3} sx={{ minWidth: 240 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ typography: 'h6' }}
            >
              <Box component="span"> Subtotal</Box>
              {subtotal}
            </Stack>

            <Button
              component={RouterLink}
              href={paths.eLearning.cart}
              size="large"
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
              onClick={wishlist && addWishlistToCart}
              disabled={wishlist.length === 0}
            >
              Add All to Cart
            </Button>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}
