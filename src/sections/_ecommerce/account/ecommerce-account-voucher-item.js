/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
// import { differenceInCalendarDays } from 'date-fns';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
// import { fDate } from 'src/utils/format-time';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function EcommerceAccountVoucherItem({ voucher }) {
  // const dayLeft = differenceInCalendarDays(voucher.dueOn, new Date());

  return (
    <Stack
      direction="row"
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Stack
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 120,
          height: 120,
          flexShrink: 0,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {getIcon(voucher.type)}

        <TextMaxLine variant="overline" line={1}>
          {/* {voucher.label} */}
          {/* {voucher.attributes.courseTitle} */}
        </TextMaxLine>
      </Stack>

      <Stack sx={{ p: 2.5, pb: 0 }}>
        <Typography variant="h6" sx={{ color: '#FF774C' }}>
          {voucher?.attributes.courseTitle}
        </Typography>
        <Typography variant="h7" sx={{ mt: 0.5, mb: 0.5 }}>
          Username : {voucher?.attributes.username}
        </Typography>
        {/* <Typography variant="h7" sx={{ mb: 1 }}>
          {voucher?.attributes.email}
        </Typography> */}

        {/* <Stack
          direction="row"
          alignItems="center"
          sx={{
            typography: 'caption',
            color: 'text.disabled',
            ...(dayLeft <= 1 && {
              color: 'error.main',
            }),
          }}
        > */}
        {/* <Iconify icon="carbon:time" width={16} sx={{ mr: 1 }} /> */}
        <Typography variant="h7" sx={{ mb: 1 }}>
          Quiz-Score : {voucher?.attributes.score}
        </Typography>
        <Button sx={{ bgcolor: '#FF774B', mb: 1 }} size="large" variant="contained">
          Download
        </Button>
      </Stack>
    </Stack>
    // </Stack>
  );
}

EcommerceAccountVoucherItem.propTypes = {
  voucher: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    dueOn: PropTypes.instanceOf(Date),
  }),
};

// ----------------------------------------------------------------------

function getIcon(type) {
  let icon;

  switch (type) {
    case 'shipping':
      icon = <Iconify icon="carbon:delivery" width={32} />;
      break;
    case 'category':
      icon = <Iconify icon="carbon:cut-out" width={32} />;
      break;
    default:
      icon = <Iconify icon="carbon:star" width={32} />;
  }
  return icon;
}
