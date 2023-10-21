/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ElearningCartItem({ course }) {
  const removeCourseFromCart = useCartStore((state) => state.removeFromCart);

  console.log('courseTitle', course);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Image
          src={course.coverUrl}
          // eslint-disable-next-line react/prop-types
          alt={course.attributes.title}
          sx={{
            width: 100,
            height: 80,
            backgroundSize: 'cover',
            borderRadius: 1.5,
          }}
        />

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2">{course.attributes.title}</Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: 220, typography: 'subtitle2' }}>
        {' '}
        {fCurrency(course.attributes.price)}{' '}
      </Stack>

      <IconButton onClick={() => removeCourseFromCart(course)}>
        <Iconify icon="carbon:trash-can" />
      </IconButton>
    </Stack>
  );
}

ElearningCartItem.propTypes = {
  course: PropTypes.shape({
    coverUrl: PropTypes.string,
    slug: PropTypes.string,
    price: PropTypes.number,
  }),
};
