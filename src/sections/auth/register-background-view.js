'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { axiosClient } from 'src/utils/axiosClient';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { useUserStore } from '../../states/auth-store';

// ----------------------------------------------------------------------

export default function RegisterBackgroundView() {
  const passwordShow = useBoolean();

  const [loginError, setLoginError] = useState('');
  const [success, setSuccess] = useState(false);

  const userdata = useUserStore((store) => store?.UserData);

  const router = useRouter();

  const updateUserData = useUserStore((store) => store?.updateUserData);

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Full name is required')
      .min(6, 'Mininum 6 characters')
      .max(15, 'Maximum 15 characters'),
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], "Password's not match"),
    agency: Yup.string().required('Agency name is required'),

    city: Yup.string().required('City is required'),

    country: Yup.string().required('Country is required'),

    phone: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agency: '',
    city: '',
    country: '',
    phone: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  // if (userdata.isLoggedIn) {
  //   router.push('/');
  //   return null;
  // }

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { userName, email, password, agency, city, country, phone } = data;
      const image = `/assets/images/avatar/avatar_${Math.floor(Math.random() * 25 + 1)}.jpg`;

      // const response = await fetch(process.env.NEXT_PUBLIC_REGISTER_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     username: userName,
      //     password,
      //     agency,
      //     city,
      //     country,
      //     phone,
      //     image,
      //   }),
      // });

      const response = await axiosClient.post('/api/auth/local/register', {
        email,
        username: userName,
        password,
        agency,
        city,
        country,
        phone,
        image,
      });

      console.log(response);

      const resData = await response.data;
      const { jwt } = resData;
      localStorage.setItem('token', jwt);

      if (response.status === 200) {
        const userData = {
          authToken: resData.jwt,
          userName: resData.user.username,
          isLoggedIn: resData.user.confirmed,
          image: resData.user.image,
          agency: resData.user.agency,
          city: resData.user.city,
          counrty: resData.user.country,
          phone: resData.user.phone,
        };
        updateUserData(userData);
        setSuccess(true);
        reset();
      } else {
        setLoginError('username already exists');
      }
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Get Started
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Already have an account? `}
        <Link
          component={RouterLink}
          href={paths.loginBackground}
          variant="subtitle2"
          color="secondary"
        >
          Login
        </Link>
      </Typography>
    </div>
  );

  // const renderSocials = (
  //   <Stack direction="row" spacing={2}>
  //     <Button fullWidth size="large" color="inherit" variant="outlined">
  //       <Iconify icon="logos:google-icon" width={24} />
  //     </Button>

  //     <Button fullWidth size="large" color="inherit" variant="outlined">
  //       <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
  //     </Button>

  //     <Button color="inherit" fullWidth variant="outlined" size="large">
  //       <Iconify icon="carbon:logo-github" width={24} sx={{ color: 'text.primary' }} />
  //     </Button>
  //   </Stack>
  // );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        <RHFTextField name="userName" label="User Name" />

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField name="agency" label="Agency name" />
        <RHFTextField name="city" label="City" />
        <RHFTextField name="country" label="Country" />
        <RHFTextField name="phone" label="Phone number" />

        <LoadingButton
          fullWidth
          color="secondary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
        {loginError && <Alert severity="warning">{loginError}</Alert>}

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {`I agree to `}
          <Link color="text.primary" href="#" underline="always">
            Terms of Service
          </Link>
          {` and `}
          <Link color="text.primary" href="#" underline="always">
            Privacy Policy.
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {success ? (
        <Alert severity="success">
          <Typography variant="h6"> verification link sent to regestered email.</Typography>
          <br />
          Please verify your email before try{'  '}
          <Link
            component={RouterLink}
            href={paths.loginBackground}
            variant="subtitle2"
            color="primary"
          >
            Login
          </Link>
        </Alert>
      ) : (
        <>
          {' '}
          {renderHead}
          {renderForm}
          {/* <Divider>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              or continue with
            </Typography>
          </Divider> */}
          {/* {renderSocials} */}
        </>
      )}
    </>
  );
}
