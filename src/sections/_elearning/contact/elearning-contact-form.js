import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function bgGradient(props) {
  const direction = props?.direction || 'to bottom';
  const startColor = props?.startColor;
  const endColor = props?.endColor;
  // const imgUrl = props?.imgUrl;
  // const color = props?.color;

  // if (imgUrl) {
  //   return {
  //     background: `linear-gradient(${direction}, ${startColor || color}, ${
  //       endColor || color
  //     }), url(${imgUrl})`,
  //     backgroundSize: 'cover',
  //     backgroundRepeat: 'no-repeat',
  //     backgroundPosition: 'center center',
  //   };
  // }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

export default function ElearningContactForm() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();

  const ElearningContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().required('Email is required').email('That is not an email'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const ELearningReviewSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required'),
    company: Yup.string().required('Compnay is required'),
    review: Yup.string().required('Review is required'),
  });

  const defaultValues = {
    fullName: '',
    subject: '',
    email: '',
    message: '',
  };

  const reviewDefaultValues = {
    name: '',
    company: '',
    designation: '',
    review: '',
  };

  const methods = useForm({
    resolver: yupResolver(ElearningContactSchema),
    defaultValues,
  });

  const reviewMethods = useForm({
    resolver: yupResolver(ELearningReviewSchema),
    reviewDefaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = reviewMethods;

  const onSubmit = handleSubmit(async (data) => {
    const requestBody = {
      data: {
        fullname: data.fullName,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      toast.success('Thank you for contacting us', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      const resData = await response.json();
      reset();
    } catch (error) {
      toast.error('error, please try again', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.error(error);
    }
  });

  const onReviewSubmit = handleSubmit(async (data) => {
    const requestBody = {
      data: {
        name: data.name,
        company: data.company,
        designation: data.designation,
        review: data.review,
        source: 'training',
      },
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      toast.success('Thank you for submitting review', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      const resData = await response.json();
      reset();
    } catch (error) {
      toast.error('error, please try again', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.error(error);
    }
  });

  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        // ...bgGradient({
        //   endColor: '#FFCEBD',
        //   startColor: '#f7f5f4',
        //   color: alpha(theme.palette.background.default, 0.1),
        //   // imgUrl: '/assets/background/overlay_3.jpg',
        // }),
        py: { xs: 10, md: 10 },
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          {mdUp && (
            <Grid xs={12} md={6} lg={5}>
              <Image
                alt="contact"
                src="/assets/illustrations/illustration_courses_contact.svg"
                sx={{ maxWidth: 260 }}
              />
            </Grid>
          )}

          <Grid xs={12} md={6} lg={6}>
            <Stack
              spacing={2}
              sx={{
                mb: 5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h3">Drop a Review For us</Typography>

              {/* <Typography>We normally respond within 2 business days</Typography> */}
            </Stack>

            <FormProvider methods={reviewMethods} onSubmit={onReviewSubmit}>
              <Stack spacing={2.5} alignItems="flex-start">
                <RHFTextField name="name" label="Name" />

                <RHFTextField name="company" label="Company" />

                <RHFTextField name="designation" label="Designation" />

                <RHFTextField name="review" multiline rows={4} label="Review" sx={{ pb: 2.5 }} />
              </Stack>

              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                loading={isSubmitting}
                sx={{
                  mx: { xs: 'auto !important', md: 'unset !important' },
                }}
              >
                Send Request
              </LoadingButton>
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
              />
            </FormProvider>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
