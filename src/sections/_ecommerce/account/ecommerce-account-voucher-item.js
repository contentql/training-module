/* eslint-disable react/prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
// import { differenceInCalendarDays } from 'date-fns';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
// import Iconify from 'src/components/iconify';
import ElearningCertificateDialog from 'src/sections/certificate/elearning-certificate-dialog';
// import { fDate } from 'src/utils/format-time';
// import TextMaxLine from 'src/components/text-max-line';
// import Certificate from 'src/sections/certificate/certificate';

// ----------------------------------------------------------------------

export default function EcommerceAccountVoucherItem({ certificateData }) {
  // const dayLeft = differenceInCalendarDays(voucher.dueOn, new Date());

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const certificateImages = [
    {
      courseTitle: '8 Hour Initial Administrator Training Program',
      image: '/assets/images/course/basic.png',
    },
    {
      courseTitle: 'TX Administrator Basics & Beyond (16 Hours)',
      image: '/assets/images/course/basicsandbeyond.png',
    },
    {
      courseTitle: 'TX Administrator Advanced Level (12 Hours)',
      image: '/assets/images/course/advanced.png',
    },
  ];

  const imageUrl = certificateImages
    .filter((data) => data.courseTitle === certificateData.attributes.courseTitle)
    .at(0).image;

  return (
    <Stack
      direction="row"
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        border: (theme) => `solid 1px #FF9470`,
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
          // borderRight: (theme) => `dashed 1px #FF9470`,
        }}
      >
        <Box sx={{ flexShrink: { sm: 0 }, pt: 1 }}>
          <Image
            alt="images"
            src={imageUrl}
            sx={{
              height: 1,
              objectFit: 'cover',
              width: 100,
              // ...(vertical && {
              //   width: { sm: 1 },
              // }),
            }}
          />
        </Box>

        {/* <TextMaxLine variant="overline" line={1}> */}
        {/* {voucher.label} */}
        {/* {voucher.attributes.courseTitle} */}
        {/* </TextMaxLine> */}
      </Stack>

      <Stack sx={{ pl: 2.5, pr: 2.5, pb: 1, pt: 1 }}>
        <Typography variant="h6" sx={{ color: '#FF774C' }}>
          {certificateData?.attributes.courseTitle}
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
        <Typography variant="h7" sx={{ mb: 1 }}>
          Score : {certificateData?.attributes.score}/10
        </Typography>
        <Button
          sx={{ bgcolor: '#FF774B', mb: 1 }}
          size="large"
          variant="contained"
          onClick={() => handleClickOpen()}
        >
          View
        </Button>
        <ElearningCertificateDialog
          open={open}
          handleClose={handleClose}
          certificateData={certificateData}
        />
      </Stack>
    </Stack>
    // </Stack>
  );
}

EcommerceAccountVoucherItem.propTypes = {
  certificateData: PropTypes.object,
};

// ----------------------------------------------------------------------

// function getIcon(type) {
//   let icon;

//   switch (type) {
//     case 'shipping':
//       icon = <Iconify icon="carbon:delivery" width={32} />;
//       break;
//     case 'category':
//       icon = <Iconify icon="carbon:cut-out" width={32} />;
//       break;
//     default:
//       icon = <Iconify icon="carbon:star" width={32} />;
//   }
//   return icon;
// }
