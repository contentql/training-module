import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { getOrdersData } from 'src/queries/orders';
import { axiosClient } from 'src/utils/axiosClient';
import { useUserStore } from 'src/states/auth-store';
import { getCoursesData } from 'src/queries/courses';
import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import ElearningCourseItem from '../list/elearning-course-item';

// ----------------------------------------------------------------------

export default function ElearningLandingFeaturedCourses({ configuration }) {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: getCoursesData,
  });

  const userData = useUserStore((state) => state.UserData);

  const {
    data: orders,
    // isLoading
  } = useQuery({
    queryKey: ['orders', userData.id],
    queryFn: getOrdersData,
    select: (ordersData) =>
      ordersData.filter((orderData) => userData.username === orderData.attributes.username),
  });

  console.log('orders', orders);

  const removeUserToCourse = (orderId) => {
    const expiredOrder = orders?.find((order) => order.id === orderId);
    if (expiredOrder.attributes.expired === false) {
      expiredOrder.attributes.products.map((product) =>
        axiosClient
          .put(`/api/courses/${product.id}`, {
            data: {
              users: {
                disconnect: [userData.id],
              },
            },
          })
          .then((res) => {
            axiosClient.put(`/api/orders/${orderId}`, {
              data: {
                expired: true,
              },
            });
          })
          .catch((err) => console.log(err))
      );
    }
  };

  orders?.forEach((order) => {
    const createdDate = new Date(order.attributes.createdAt);
    const currentDate = new Date();

    const timeDifference = createdDate.getTime() - currentDate.getTime();

    const hoursDifference = Math.abs(timeDifference / (1000 * 60 * 60));
    if (hoursDifference > 0.1) {
      // removeUserToCourse(order.id);
      console.log('course expired');
    }
  });
  // console.log(createdAt);

  // const totalHours = 8760;

  // const givenDate = new Date(createdAt?.map((date) => date));

  // // console.log(givenDate);

  // const currentDate = new Date();

  // const timeDifference = givenDate.getTime() - currentDate.getTime();

  // const hoursDifference = Math.abs(timeDifference / (1000 * 60 * 60));

  // console.log(hoursDifference);

  // console.log('orderDate', createdAt.substring(0, 4));

  // console.log('orderDate', createdAt[0]);

  // if (hoursDifference > 0.15) {
  //   removeUserToCourse();
  // }

  const theme = useTheme();

  const carousel = useCarousel({
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  const mdUp = useResponsive('up', 'md');

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        sx={{
          pt: { xs: 3, md: 6 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-end' }}
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Stack spacing={3} flexGrow={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h2">Featured courses</Typography>
          </Stack>

          {mdUp && <CarouselArrows spacing={2} onNext={carousel.onNext} onPrev={carousel.onPrev} />}
        </Stack>

        <Box
          sx={{
            position: 'relative',
            ml: { md: -2 },
            width: { md: 'calc(100% + 32px)' },
          }}
        >
          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{
              sx: {
                left: -16,
                opacity: 1,
                color: 'common.white',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                ...(mdUp && { display: 'none' }),
              },
            }}
            rightButtonProps={{
              sx: {
                right: -16,
                opacity: 1,
                color: 'common.white',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                ...(mdUp && { display: 'none' }),
              },
            }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {data?.map((course) => (
                <Box
                  key={course.id}
                  sx={{
                    px: 2,
                    pt: { xs: 6, md: 8 },
                    pb: { xs: 6, md: 8 },
                  }}
                >
                  <ElearningCourseItem course={course} configuration={configuration} vertical />
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>
      </Container>
    </Box>
  );
}

ElearningLandingFeaturedCourses.propTypes = {
  courses: PropTypes.array,
  configuration: PropTypes.any,
};
