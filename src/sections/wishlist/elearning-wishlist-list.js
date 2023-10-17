import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import Scrollbar from 'src/components/scrollbar';

import ElearningWishlistItem from './elearning-wishlist-item';

// ----------------------------------------------------------------------

export default function ElearningWishlistList({ wishlist }) {
  return (
    <Scrollbar>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          py: 3,
          minWidth: 720,
          typography: 'subtitle2',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Stack flexGrow={1}>Item</Stack>
        <Stack sx={{ width: 255 }}>Subtotal</Stack>
      </Stack>

      {wishlist.map((course) => (
        <ElearningWishlistItem key={course.id} course={course} />
      ))}
    </Scrollbar>
  );
}

ElearningWishlistList.propTypes = {
  wishlist: PropTypes.array,
};
