'use client';

import axios from 'axios';
import { m } from 'framer-motion';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { useUserStore } from 'src/states/auth-store';
import { SplashScreen } from 'src/components/loading-screen';
import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function ElearningPurchaseCompletedView() {
  const { UserData } = useUserStore();

  const search = useSearchParams();
  const success = search.get('success');
  const username = search.get('username');

  const emptyCart = useCartStore((state) => state.emptyCart);
  const cart = useCartStore((state) => state.cart);

  const addUserToCourse = (itemId) => {
    const apiUrl = process.env.NEXT_PUBLIC_COURSES_URL; // Your Strapi base URL
    const contentType = 'courses'; // Replace with your actual content type

    axios
      .put(`${apiUrl}/${contentType}/${itemId}`, {
        data: {
          users: {
            connect: [UserData.id],
          },
        },
      })
      .then((res) => {
        console.log('Array updated successfully:', res.data);
      })
      .then((res) => {
        emptyCart();
      })
      .catch((error) => {
        console.error('Error updating array:', error);
      });
  };

  const { data } = useQuery({
    queryKey: ['payment'],
    queryFn: () => username === UserData.username && cart.forEach(({ id }) => addUserToCourse(id)),
  });

  console.log({ data });

  return (
    <Container
      component={MotionContainer}
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <m.div variants={varBounce().in}>
        <Box sx={{ fontSize: 128 }}>🎉</Box>
      </m.div>

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Thank You for Your Purchase!</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Feel free to explore more courses and enhance your knowledge.
        </Typography>
      </Stack>

      <Button
        component={RouterLink}
        href={paths.eLearning.account.myLearning}
        size="large"
        color="inherit"
        variant="contained"
        startIcon={<Iconify icon="carbon:chevron-left" />}
      >
        My learning
      </Button>
    </Container>
  );
}
