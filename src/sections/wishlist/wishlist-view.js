'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
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

  const subtotal = wishlist.reduce((accumulator, course) => accumulator + course.price, 0);

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

      <ElearningWishlistList wishlist={wishlist} />
      {/* <EcommerceCartList wishlist products={_products.slice(0, 4)} /> */}

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
            onClick={addWishlistToCart}
          >
            Add All to Cart
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
