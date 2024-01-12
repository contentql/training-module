'use client';

import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import {
  useForm,
  // Controller
} from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { _mock } from 'src/_mock';
// import { countries } from 'src/assets/data';
// import Iconify from 'src/components/iconify';
import { useUserStore } from 'src/states/auth-store';
// import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider, {
  // RHFSelect,
  RHFTextField,
  // RHFRadioGroup,
  // RHFAutocomplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

// const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const [userData, updateUserData] = useUserStore((state) => [
    state.UserData,
    state.updateUserData,
  ]);

  console.log({ userData });

  const EcommerceAccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    username: userData?.username,
    emailAddress: userData?.email,
    phoneNumber: userData?.phone,
    city: userData?.city,
    country: userData?.country,
    agency: userData?.agency,
  };

  const methods = useForm({
    // resolver: yupResolver(EcommerceAccountPersonalSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // e.preventDefault();
    console.log('onSubmit');
    updateUserData({
      ...userData,
      username: data.username,
      country: data.country,
      agency: data.agency,
      city: data.city,
      phone: data.phoneNumber,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${userData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.authToken}`,
          },
          body: JSON.stringify({
            country: data.country,
            agency: data.agency,
            city: data.city,
            phone: data.phoneNumber,
          }),
        }
      );
      toast.success('details saved Successfully', {
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
    } catch (error) {
      toast.error('error please try again', {
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
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Personal
      </Typography>

      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <RHFTextField
          name="username"
          label="User Name"
          // value={userData.username}
          InputProps={{ readOnly: true }}
        />

        <RHFTextField
          name="emailAddress"
          label="Email Address"
          value={userData?.email}
          InputProps={{ readOnly: true }}
        />

        <RHFTextField name="phoneNumber" label="Phone Number" />

        <RHFTextField name="city" label="city" />

        <RHFTextField name="country" label="country" />

        <RHFTextField name="agency" label="agency" />
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <LoadingButton
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ my: 4 }}
      >
        Save Changes
      </LoadingButton>
    </FormProvider>
  );
}
