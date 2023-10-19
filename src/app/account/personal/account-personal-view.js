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
  const userData = useUserStore();

  console.log(userData);

  const { updateUser } = userData;

  const { image } = userData.UserData;

  const EcommerceAccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    firstName: 'Jayvion',
    lastName: 'Simon',
    emailAddress: 'nannie_abernathy70@yahoo.com',
    phoneNumber: '365-374-4961',
  };

  const methods = useForm({
    resolver: yupResolver(EcommerceAccountPersonalSchema),
    defaultValues,
  });

  const {
    // reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      console.log('DATA', data);
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
        <RHFTextField name="firstName" label="First Name" />

        <RHFTextField name="lastName" label="Last Name" />

        <RHFTextField name="emailAddress" label="Email Address" />

        <RHFTextField name="phoneNumber" label="Phone Number" />

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

        {/* <RHFTextField name="streetAddress" label="Street Address" /> */}

        {/* <RHFTextField name="zipCode" label="Zip Code" /> */}

        {/* <RHFTextField name="city" label="City" /> */}

        {/* <RHFAutocomplete
          name="country"
          label="Country"
          options={countries.map((country) => country.label)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => {
            const { code, label, phone } = countries.filter(
              (country) => country.label === option
            )[0];

            if (!label) {
              return null;
            }

            return (
              <li {...props} key={label}>
                <Iconify
                  key={label}
                  icon={`circle-flags:${code.toLowerCase()}`}
                  width={28}
                  sx={{ mr: 1 }}
                />
                {label} ({code}) +{phone}
              </li>
            );
          }}
        /> */}
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
            if (_mock.image.avatar(index) === image)
              styles = { ...styles, border: 4, borderRadius: '50%', borderColor: '#0d5992' };

            return (
              <Avatar
                src={_mock.image.avatar(index)}
                sx={styles}
                key={index}
                onClick={() => updateUser({ name: 'Name', image: _mock.image.avatar(index) })}
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
