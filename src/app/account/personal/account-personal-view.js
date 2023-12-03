'use client';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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
  // const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);

  // const passwordShow = useBoolean();
  const [userData, updateImage] = useUserStore((state) => [state.UserData, state.updateImage]);

  const EcommerceAccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    username: userData.username,
    emailAddress: userData.email,
    phoneNumber: userData.phone,
  };

  const methods = useForm({
    resolver: yupResolver(EcommerceAccountPersonalSchema),
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
      // console.log('DATA', data);
    } catch (error) {
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
        <RHFTextField name="username" label="User Name" value={userData.username} />

        <RHFTextField name="emailAddress" label="Email Address" value={userData.email} />

        <RHFTextField name="phoneNumber" label="Phone Number" value={userData.phone} />

        {/* <Controller
          name="birthday"
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Birthday"
              slotProps={{
                textField: {
                  helperText: error?.message,
                  error: !!error?.message,
                },
              }}
              {...field}
              value={field.value}
            />
          )}
        /> */}

        {/* <RHFSelect native name="gender" label="Gender">
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </RHFSelect> */}

        <RHFTextField name="city" label="city" value={userData.city} />

        <RHFTextField name="country" label="country" value={userData.country} />

        <RHFTextField name="agency" label="agency" value={userData.agency} />
      </Box>

      {/* <Stack spacing={3} sx={{ my: 5 }}>
        <Typography variant="h5"> Change Password </Typography>

        <Stack spacing={2.5}>
          <RHFTextField
            name="oldPassword"
            label="Old Password"
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
            name="newPassword"
            label="New Password"
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
            name="confirmNewPassword"
            label="Confirm New Password"
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
        </Stack>
      </Stack> */}

      <Stack spacing={2} sx={{ my: 5 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Avatar
        </Typography>

        <Grid container spacing={2.5} sx={{ marginLeft: 1.5 }}>
          {[...Array(25)].map((arr, index) => {
            let styles = { margin: 1, height: 60, width: 60 };
            if (_mock.image.avatar(index) === userData.image)
              styles = { ...styles, border: 4, borderRadius: '50%', borderColor: '#0d5992' };

            return (
              <Avatar
                src={_mock.image.avatar(index)}
                sx={styles}
                key={index}
                onClick={() => updateImage(_mock.image.avatar(index))}
              />
            );
          })}
        </Grid>
      </Stack>

      <LoadingButton
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Save Changes
      </LoadingButton>
    </FormProvider>
  );
}
