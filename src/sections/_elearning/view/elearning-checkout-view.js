'use client';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { useCartStore } from 'src/states/cart';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider from 'src/components/hook-form';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningCheckoutNewCardForm from '../checkout/elearning-checkout-new-card-form';
import ElearningCheckoutOrderSummary from '../checkout/elearning-checkout-order-summary';
import ElearningCheckoutPaymentMethod from '../checkout/elearning-checkout-payment-method';
import ElearningCheckoutPersonalDetails from '../checkout/elearning-checkout-personal-details';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    label: 'Paypal',
    value: 'paypal',
    description: '**** **** **** 1234',
  },
  {
    label: 'MasterCard',
    value: 'mastercard',
    description: '**** **** **** 3456',
  },
  {
    label: 'Visa',
    value: 'visa',
    description: '**** **** **** 6789',
  },
];

// ----------------------------------------------------------------------

export default function ElearningCheckoutView() {
  const router = useRouter();

  const formOpen = useBoolean();

  const _courses = useCartStore((state) => state.cart);

  const cost = _courses.map((course) => course.price).reduce((a, b) => a + b, 0);
  const discountPercent = cost && 7;
  const taxPercent = cost && 7;

  const subTotal = cost;
  const discount = cost && cost * (discountPercent / -16.17);
  const tax = cost && cost * (taxPercent / 100);
  const total = cost && subTotal + discount + tax;

  const ElearningCheckoutSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
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
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      router.push(paths.eCommerce.orderCompleted);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

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

                <div>
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
                </div>
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
