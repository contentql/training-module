import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ElearningCheckoutPersonalDetails() {
  // const passwordShow = useBoolean();
  return (
    <>
      <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1} sx={{ mb: 4 }}>
        {/* <Typography variant="subtitle2">Sign in with:</Typography>

         <Button color="inherit" variant="outlined" startIcon={<Iconify icon="logos:google-icon" />}>
          Google
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="carbon:logo-facebook" sx={{ color: '#1877F2' }} />}
        >
          Facebook
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          startIcon={
            <Iconify icon="carbon:logo-github" width={24} sx={{ color: 'text.primary' }} />
          }
        >
          Github
        </Button>

        <Button color="inherit" variant="outlined" startIcon={<Iconify icon="carbon:email" />}>
          Continue with Email
        </Button> */}
      </Stack>

      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <RHFTextField name="username" label="User Name" disabled />

        <RHFTextField name="emailAddress" label="Email Address" disabled />

        <RHFTextField name="phoneNumber" label="Phone Number" disabled />

        {/* <RHFTextField
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
        /> */}
      </Box>
    </>
  );
}
