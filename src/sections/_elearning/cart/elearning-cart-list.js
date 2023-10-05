import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import Scrollbar from 'src/components/scrollbar';

import ElearningCartItem from './elearning-cart-item';

// ----------------------------------------------------------------------

export default function ElearningCartList({ courses, wishlist = false }) {
  return (
    <Scrollbar>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          py: 2,
          minWidth: 720,
          typography: 'subtitle2',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Stack flexGrow={1}>Item</Stack>
        <Stack sx={{ width: 120 }}>Subtotal</Stack>
        <Stack sx={{ width: 36 }} />
        {wishlist && <Stack sx={{ width: 36 }} />}
      </Stack>

      {courses.map((course) => (
        <ElearningCartItem key={course.id} course={course} wishlist={wishlist} />
      ))}
    </Scrollbar>
  );
}

ElearningCartList.propTypes = {
  courses: PropTypes.array,
  wishlist: PropTypes.bool,
};
