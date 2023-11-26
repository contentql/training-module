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

export default function MyLearningCard({ voucher }) {
  // const dayLeft = differenceInCalendarDays(voucher.dueOn, new Date());

  return (
    <Stack
      direction="row"
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        mr: 2,
        // backgroundColor: '#FDDED4',
        border: (theme) => `solid 1px #FF9470`,
      }}
    >
      <Stack direction="row" sx={{ p: 2.5, pl: 4, pr: 4 }}>
        <Typography variant="h6" sx={{ color: '#0D5992' }}>
          {voucher.title}
          {'  '} :
        </Typography>
        <Typography variant="h6" sx={{ color: '#FF9470', pl: 1 }}>
          {voucher?.score}
        </Typography>
        {/* <Typography variant="h7" sx={{ mt: 0.5, mb: 0.5 }}>
          Username : {voucher?.attributes.username}
        </Typography> */}
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
      </Stack>
    </Stack>
    // </Stack>
  );
}

MyLearningCard.propTypes = {
  voucher: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
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
