'use client';

// import { add } from 'date-fns';
// import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Tab from '@mui/material/Tab';
// import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
// import InputAdornment from '@mui/material/InputAdornment';

// import { _mock } from 'src/_mock';
import { RouterLink } from 'src/routes/components';
import { axiosClient } from 'src/utils/axiosClient';
// import { getScoreData } from 'src/queries/score';
import { useUserStore } from 'src/states/auth-store';

import EcommerceAccountVoucherItem from '../account/ecommerce-account-voucher-item';

// ----------------------------------------------------------------------

// const TABS = ['All Vouchers', 'Latest', 'Popular', 'Expiring'];

// const VOUCHERS = [
//   {
//     id: _mock.id(1),
//     type: 'shipping',
//     label: 'Shipping',
//     title: '6% off',
//     description: 'Min. Spend $0',
//     dueOn: add(new Date(), { days: 1 }),
//   },
//   {
//     id: _mock.id(2),
//     type: 'shipping',
//     label: 'Shipping',
//     title: '6% off',
//     description: 'Min. Spend $0',
//     dueOn: add(new Date(), { days: 2 }),
//   },
//   {
//     id: _mock.id(3),
//     type: 'all',
//     label: 'All Categories',
//     title: '6% off',
//     description: 'Min. Spend $0 Capped at $10',
//     dueOn: add(new Date(), { days: 1 }),
//   },
//   {
//     id: _mock.id(4),
//     type: 'shipping',
//     label: 'Shipping',
//     title: '6% off',
//     description: 'Min. Spend $0 Capped at $10',
//     dueOn: add(new Date(), { days: 2 }),
//   },
//   {
//     id: _mock.id(5),
//     type: 'category',
//     label: 'Men Clothes',
//     title: 'Up to 50%',
//     description: 'Min. Spend $0 Capped at $10',
//     dueOn: add(new Date(), { days: 3 }),
//   },
//   {
//     id: _mock.id(6),
//     type: 'shipping',
//     label: 'Shipping',
//     title: '6% off',
//     description: 'Min. Spend $0',
//     dueOn: add(new Date(), { days: 4 }),
//   },
//   {
//     id: _mock.id(7),
//     type: 'shipping',
//     label: 'Shipping',
//     title: '6% off',
//     description: 'Min. Spend $0',
//     dueOn: add(new Date(), { days: 5 }),
//   },
// ];

// ----------------------------------------------------------------------

export default function EcommerceAccountVouchersView() {
  // const [tab, setTab] = useState('All Vouchers');

  const userData = useUserStore((state) => state.UserData);

  const [quizScore, setQuizScore] = useState([]);

  useEffect(() => {
    const fetchScore = async () => {
      const data = await axiosClient.get('/api/quiz-scores');

      setQuizScore(
        data?.data.data.filter((scoreData) => userData.username === scoreData.attributes.username)
      );
    };
    fetchScore();
  }, [userData.username]);

  console.log('Quiz Score', quizScore);

  const coursesCertificatesFilter = () => {
    const courseScores = {};

    quizScore.forEach((quizData) => {
      const { courseTitle, score } = quizData.attributes;

      const numericScore = Number(score);

      if (!courseScores[courseTitle] || numericScore > courseScores[courseTitle].numericScore) {
        courseScores[courseTitle] = {
          ...quizData,
          numericScore,
        };
      }
    });

    const completedCourses = Object.values(courseScores).filter(
      (quizData) => (quizData.attributes.score / 10) * 100 >= 70
    );

    return completedCourses;
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Certificates
      </Typography>
      {/* 
      <TextField
        fullWidth
        label="Enter voucher code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button size="large" variant="contained" color="inherit" sx={{ mr: -1 }}>
                Redeem
              </Button>
            </InputAdornment>
          ),
        }}
      /> */}

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
      {/* 
      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
        sx={{ mb: 3 }}
      >
        {TABS.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs> */}

      <Box>
        {coursesCertificatesFilter().length ? (
          coursesCertificatesFilter().map((data) => (
            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
              sx={{ mb: 2 }}
            >
              <EcommerceAccountVoucherItem
                key={data.id}
                certificateData={data}
                userData={userData}
              />
            </Box>
          ))
        ) : (
          <Box>
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                ml: { md: -2 },
                mt: { xs: 12, md: 4 },
              }}
            >
              <Image
                alt="Empty State My Learning"
                src="/assets/images/empty-states/no-wishlist.png"
                sx={{
                  height: { xs: 122, md: 182 },
                  width: { xs: 160, md: 220 },
                  objectFit: 'cover',
                }}
              />

              <Link component={RouterLink} href={paths.eLearning.courses} sx={{ pt: 10 }}>
                <Button
                  sx={{ bgcolor: '#FF774B' }}
                  size="large"
                  variant="contained"
                  startIcon={<Iconify icon="carbon:chevron-left" />}
                >
                  Start Learning
                </Button>
              </Link>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
