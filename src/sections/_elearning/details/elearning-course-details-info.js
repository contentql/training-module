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
import { useUserStore } from 'src/states/auth-store';
import { useWishlistStore } from 'src/states/wishlist';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsInfo({ course }) {
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

  const userData = useUserStore((state) => state.UserData);

  const { isLoggedIn } = userData;

  const hasBoughtCourse =
    isLoggedIn &&
    course?.attributes.users.data.filter((user) => user.id === userData.id.toString()).length > 0;

  const isCourseInCart = cart.filter((cartItem) => cartItem.id === course.id).length === 0;
  // const isCourseInCart = cart.filter((cartItem) => console.log('cartItem', cartItem));

  const isCourseInWishlist =
    wishlist.filter((wishlistItem) => wishlistItem.id === course.id).length === 0;

  const wishlistIcon = isCourseInWishlist ? 'solar:heart-linear' : 'solar:heart-bold';

  const totalLessons = course?.attributes.units.data.reduce(
    (count, unit) => (unit.attributes.lesson ? count + unit.attributes.lesson.length : count),
    0
  );

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
              {totalLessons}
            </Box>
            Lessons
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:document-download" sx={{ mr: 1 }} />
            <Box component="strong" sx={{ mr: 0.5 }}>
              {course.attributes.resources}
            </Box>
            Multiple practice tests
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:data-accessor" sx={{ mr: 1 }} />
            One year access of course
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

        {/* {!hasBoughtCourse && (
          <Link component={RouterLink} href={`${paths.eLearning.checkout}/${course.id}`}>
            <Button variant="contained" size="large" color="inherit" sx={{ width: 1 }}>
              Enroll Now
            </Button>
          </Link>
        )} */}

        {!hasBoughtCourse && (
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
        )}
      </Stack>
    </Card>
  );
}

ElearningCourseDetailsInfo.propTypes = {
  course: PropTypes.object,
};
