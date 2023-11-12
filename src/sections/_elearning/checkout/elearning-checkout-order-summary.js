/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import TextMaxLine from 'src/components/text-max-line';
import { fPercent, fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ElearningCheckoutOrderSummary({
  taxPercent,
  total,
  subtotal,
  discount,
  courses,
  loading,
  isDelete,
}) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Order Summary </Typography>

      {!!courses?.length && (
        <>
          {courses.map((course) => (
            <CourseItem key={courses.id} course={course} isDelete={isDelete} />
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(subtotal)} />

        <Row label="Discount (15%)" value={`${fCurrency(discount)}`} />

        <Row label="Tax" value={fPercent(taxPercent)} />
      </Stack>

      <TextField
        hiddenLabel
        placeholder="Discount Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Apply</Button>
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(total)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <LoadingButton
        size="large"
        variant="contained"
        color="inherit"
        type="submit"
        loading={loading}
        class="SS_ProductCheckout"
        data-id="1"
        data-email="<userEmail>"
        data-url="http://localhost:1337"
      >
        Buy Now
      </LoadingButton>
    </Stack>
  );
}

ElearningCheckoutOrderSummary.propTypes = {
  discount: PropTypes.number,
  loading: PropTypes.bool,
  courses: PropTypes.array,
  subtotal: PropTypes.number,
  taxPercent: PropTypes.number,
  total: PropTypes.number,
  isDelete: PropTypes.bool,
};

// ----------------------------------------------------------------------

function CourseItem({ course, isDelete, ...other }) {
  const removeCourseFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <Stack direction="row" alignItems="flex-start" {...other}>
      <Image
        src={course?.coverUrl}
        sx={{
          mr: 2,
          width: 64,
          height: 64,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack flexGrow={1}>
        <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
          {course?.attributes.title}
        </TextMaxLine>

        <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
          {fCurrency(course?.attributes.price)}
        </Typography>
      </Stack>

      {isDelete && (
        <IconButton onClick={() => removeCourseFromCart(course)}>
          <Iconify icon="carbon:trash-can" />
        </IconButton>
      )}
    </Stack>
  );
}

CourseItem.propTypes = {
  course: PropTypes.shape({
    coverUrl: PropTypes.string,
    slug: PropTypes.string,
    price: PropTypes.number,
  }),
  isDelete: PropTypes.bool,
};

// ----------------------------------------------------------------------

function Row({ label, value, sx, ...other }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}

Row.propTypes = {
  label: PropTypes.string,
  sx: PropTypes.object,
  value: PropTypes.string,
};
