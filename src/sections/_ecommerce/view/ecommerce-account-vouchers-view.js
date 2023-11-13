'use client';

import { add } from 'date-fns';
import { useQuery } from 'react-query';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { _mock } from 'src/_mock';
import { getScoreData } from 'src/queries/score';
import { useUserStore } from 'src/states/auth-store';

import EcommerceAccountVoucherItem from '../account/ecommerce-account-voucher-item';

// ----------------------------------------------------------------------

const TABS = ['All Vouchers', 'Latest', 'Popular', 'Expiring'];

const VOUCHERS = [
  {
    id: _mock.id(1),
    type: 'shipping',
    label: 'Shipping',
    title: '6% off',
    description: 'Min. Spend $0',
    dueOn: add(new Date(), { days: 1 }),
  },
  {
    id: _mock.id(2),
    type: 'shipping',
    label: 'Shipping',
    title: '6% off',
    description: 'Min. Spend $0',
    dueOn: add(new Date(), { days: 2 }),
  },
  {
    id: _mock.id(3),
    type: 'all',
    label: 'All Categories',
    title: '6% off',
    description: 'Min. Spend $0 Capped at $10',
    dueOn: add(new Date(), { days: 1 }),
  },
  {
    id: _mock.id(4),
    type: 'shipping',
    label: 'Shipping',
    title: '6% off',
    description: 'Min. Spend $0 Capped at $10',
    dueOn: add(new Date(), { days: 2 }),
  },
  {
    id: _mock.id(5),
    type: 'category',
    label: 'Men Clothes',
    title: 'Up to 50%',
    description: 'Min. Spend $0 Capped at $10',
    dueOn: add(new Date(), { days: 3 }),
  },
  {
    id: _mock.id(6),
    type: 'shipping',
    label: 'Shipping',
    title: '6% off',
    description: 'Min. Spend $0',
    dueOn: add(new Date(), { days: 4 }),
  },
  {
    id: _mock.id(7),
    type: 'shipping',
    label: 'Shipping',
    title: '6% off',
    description: 'Min. Spend $0',
    dueOn: add(new Date(), { days: 5 }),
  },
];

// ----------------------------------------------------------------------

export default function EcommerceAccountVouchersView() {
  const [tab, setTab] = useState('All Vouchers');

  const userData = useUserStore((state) => state.UserData);

  const [quizScore, setQuizScore] = useState([]);

  // const { data, isLoading } = useQuery({
  //   queryKey: ['orders', userData.id],
  //   queryFn: getScoreData,
  //   select: (ordersData) =>
  //     ordersData.filter((orderData) => userData.username === orderData.attributes.username),
  // });

  // console.log({ data });

  useEffect(() => {
    const fetchScore = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_QUIZ_SCORE);
      const data = await res.json();

      setQuizScore(
        data.data.filter((scoreData) => userData.username === scoreData.attributes.username)
      );
    };
    fetchScore();
  }, [userData.username]);

  console.log(quizScore);

  const handleChangeTab = useCallback((event, newValue) => {
    setTab(newValue);
  }, []);

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

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {quizScore.map((data) => (
          <EcommerceAccountVoucherItem key={data.id} voucher={data} />
        ))}
      </Box>
    </>
  );
}
