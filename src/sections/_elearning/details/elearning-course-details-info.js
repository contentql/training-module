import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';
import { fCurrency } from 'src/utils/format-number';
import { useWishlistStore } from 'src/states/wishlist';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsInfo({ course, hasBoughtCourse }) {
  const [cart, addToCart, removeFromCart] = useCartStore((state) => [
    state.cart,
    state.addToCart,
    state.removeFromCart,
  ]);

  const [wishlist, addToWishlist, removeFromWishlist] = useWishlistStore((state) => [
    state.wishlist,
    state.addToWishlist,
    state.removeFromWishlist,
  ]);

  const isCourseInCart = cart.filter((cartItem) => cartItem.id === course.id).length === 0;
  // const isCourseInCart = cart.filter((cartItem) => console.log('cartItem', cartItem));

  const isCourseInWishlist =
    wishlist.filter((wishlistItem) => wishlistItem.id === course.id).length === 0;

  const wishlistIcon = isCourseInWishlist ? 'solar:heart-linear' : 'solar:heart-bold';

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
        <Stack direction="row" sx={{ typography: 'h3' }}>
          {!!course.priceSale && (
            <Box
              component="span"
              sx={{
                mr: 1,
                typography: 'h4',
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {fCurrency(course.priceSale)}
            </Box>
          )}
          {fCurrency(course.price)}
        </Stack>

        <Stack spacing={2}>
          <Typography>This course includes:</Typography>

          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:document" sx={{ mr: 1 }} />
            <Box component="strong" sx={{ mr: 0.5 }}>
              {course.lessons?.length}
            </Box>
            Lessons
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:document-download" sx={{ mr: 1 }} />
            <Box component="strong" sx={{ mr: 0.5 }}>
              {course.resources}
            </Box>
            Downloadable resources
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:data-accessor" sx={{ mr: 1 }} />
            Full lifetime access
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:devices" sx={{ mr: 1 }} />
            Access on desktops, tablets, mobile
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:certificate" sx={{ mr: 1 }} />
            Certificate of completion
          </Stack>
        </Stack>

        {hasBoughtCourse ? (
          <Button variant="contained" size="large" color="inherit" sx={{ width: 1 }}>
            Already Enrolled
          </Button>
        ) : (
          <>
            <Link component={RouterLink} href={`${paths.eLearning.checkout}/${course.id}`}>
              <Button variant="contained" size="large" color="inherit" sx={{ width: 1 }}>
                Enroll Now
              </Button>
            </Link>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Button
                variant={isCourseInWishlist ? 'outlined' : 'contained'}
                size="large"
                color="inherit"
                sx={{ width: '20%', marginRight: 1 }}
                onClick={() =>
                  isCourseInWishlist ? addToWishlist(course) : removeFromWishlist(course)
                }
              >
                <Iconify icon={wishlistIcon} color="red" />
              </Button>

              <Button
                variant={isCourseInCart ? 'contained' : 'outlined'}
                size="large"
                color="inherit"
                sx={{ width: '80%' }}
                onClick={() => (isCourseInCart ? addToCart(course) : removeFromCart(course))}
              >
                {isCourseInCart ? 'Add to cart' : 'Remove from cart'}
              </Button>
            </Box>
            s
          </>
        )}
      </Stack>
    </Card>
  );
}

ElearningCourseDetailsInfo.propTypes = {
  course: PropTypes.object,
  hasBoughtCourse: PropTypes.bool,
};
