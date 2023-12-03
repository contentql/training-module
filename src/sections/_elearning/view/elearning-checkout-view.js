'use client';

// import axios from 'axios';
import * as Yup from 'yup';
// import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadStripe } from '@stripe/stripe-js';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import { paths } from 'src/routes/paths';
// import Iconify from 'src/components/iconify';
// import { useRouter } from 'src/routes/hooks';
import { useCartStore } from 'src/states/cart';
// import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider from 'src/components/hook-form';
import { getCourseInfo } from 'src/queries/checkout';
import { useUserStore } from 'src/states/auth-store';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningNewsletter from '../elearning-newsletter';
// import ElearningCheckoutNewCardForm from '../checkout/elearning-checkout-new-card-form';
import ElearningCheckoutOrderSummary from '../checkout/elearning-checkout-order-summary';
// import ElearningCheckoutPaymentMethod from '../checkout/elearning-checkout-payment-method';
import ElearningCheckoutPersonalDetails from '../checkout/elearning-checkout-personal-details';

// ----------------------------------------------------------------------

const stripePromise = loadStripe(
  'pk_test_51O14wJSGKNDRcuJuUqGzWCeftvJOpycOZUjVgL5BoNzq82clRNztJYpNZw2mdqFtZrkRCCZVbIpSHSqYTIRpJe6t00WaGaXnpK'
);

// const PAYMENT_OPTIONS = [
//   {
//     label: 'Paypal',
//     value: 'paypal',
//     description: '**** **** **** 1234',
//   },
//   {
//     label: 'MasterCard',
//     value: 'mastercard',
//     description: '**** **** **** 3456',
//   },
//   {
//     label: 'Visa',
//     value: 'visa',
//     description: '**** **** **** 6789',
//   },
// ];

// ----------------------------------------------------------------------

export default function ElearningCheckoutView({ courseId }) {
  // const loading = useBoolean(true);

  // const router = useRouter();

  // const formOpen = useBoolean();

  const { UserData } = useUserStore();

  const queryRes = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseInfo(courseId),
    enabled: !!courseId,
  });
  const queryData = queryRes.data;
  const loading = queryRes.isLoading;

  const cartCourses = useCartStore((state) => state.cart);
  // const emptyCart = useCartStore((state) => state.emptyCart);
  const cart = useCartStore((state) => state.cart);

  const _courses = courseId ? [queryData] : cartCourses;
  console.log({ _courses });

  const cost = _courses?.map((course) => course?.attributes.price).reduce((a, b) => a + b, 0);
  const discountPercent = cost && 7;
  const taxPercent = cost && 18;

  const subTotal = cost;
  const discount = cost && cost * (discountPercent / -16.17);
  const tax = cost && cost * (taxPercent / 100);
  const total = cost && subTotal + discount + tax;

  const ElearningCheckoutSchema = Yup.object().shape({
    userName: Yup.string(),
    emailAddress: Yup.string(),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    userName: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    paymentMethods: '',
    newCard: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      ccv: '',
    },
  };

  const methods = useForm({
    resolver: yupResolver(ElearningCheckoutSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      makePayment(data);
    } catch (error) {
      console.error(error);
    }
  });

  if (loading) return <SplashScreen />;

  const userToken = localStorage.getItem('token');

  async function makePayment(data) {
    const stripe = await stripePromise;
    const requestBody = {
      username: UserData.username,
      email: UserData.email,
      products: _courses.map(({ id, attributes }) => ({
        id,
        title: attributes.title,
        price: attributes.price,
      })),
    };

    const response = await fetch(process.env.NEXT_PUBLIC_ORDER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  // async function addUserToCourse(itemId) {
  //   const apiUrl = process.env.NEXT_PUBLIC_COURSES_URL; // Your Strapi base URL
  //   const contentType = 'courses'; // Replace with your actual content type
  //   const arrayField = 'users'; // Replace with the name of your array field

  //   // New string to add to the array
  //   const newString = 'akhilnaidu';

  //   // Make a GET request to fetch the existing data
  //   axios
  //     .get(`${apiUrl}/${contentType}/${itemId}?populate=users`)
  //     .then((response) => {
  //       const existingData = response.data;
  //       // Extract the array field from the existing data

  //       // Add the new string to the array
  //       // Make a PUT request to update the item with the modified array
  //       axios
  //         .put(`${apiUrl}/${contentType}/${itemId}`, {
  //           data: {
  //             users: {
  //               connect: [UserData.id],
  //             },
  //           },
  //         })
  //         .then((res) => {
  //           console.log('Array updated successfully:', res.data);
  //         })
  //         .catch((error) => {
  //           console.error('Error updating array:', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching existing data:', error);
  //     });
  // }

  return (
    <>
      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h3" sx={{ mb: 5 }}>
          Checkout
        </Typography>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid xs={12} md={8}>
              <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
                <div>
                  <StepLabel title="Personal Details" step="1" />
                  <ElearningCheckoutPersonalDetails />
                </div>

                {/* <div>
                  <StepLabel title="Payment Method" step="2" />

                  <ElearningCheckoutPaymentMethod options={PAYMENT_OPTIONS} />

                  <Divider sx={{ my: 3 }} />

                  <Stack alignItems="flex-end">
                    <Button
                      color={formOpen.value ? 'error' : 'inherit'}
                      startIcon={
                        <Iconify icon={formOpen.value ? 'carbon:close' : 'carbon:add'} width={24} />
                      }
                      onClick={formOpen.onToggle}
                    >
                      {formOpen.value ? 'Cancel' : 'Add New Card'}
                    </Button>
                  </Stack>

                  <Collapse in={formOpen.value} unmountOnExit>
                    <ElearningCheckoutNewCardForm />
                  </Collapse>
                </div> */}
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <ElearningCheckoutOrderSummary
                taxPercent={taxPercent}
                total={total}
                subtotal={subTotal}
                discount={discount}
                courses={_courses}
                loading={isSubmitting}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </Container>

      <ElearningNewsletter />
    </>
  );
}

ElearningCheckoutView.propTypes = {
  courseId: PropTypes.string,
};

// ----------------------------------------------------------------------

function StepLabel({ step, title }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h6' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}

StepLabel.propTypes = {
  step: PropTypes.string,
  title: PropTypes.string,
};
