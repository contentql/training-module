import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function ElearningLandingIntroduce() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Container
      sx={{
        py: { xs: 4, md: 2 },
      }}
    >
      {/* <Typography
        variant="overline"
        sx={{
          display: 'block',
          color: 'primary.main',
          mb: { xs: 2, md: 6 },
        }}
      >
        Our Services.
      </Typography> */}

      <Grid
        container
        spacing={3}
        alignItems={{ md: 'center' }}
        justifyContent={{ md: 'space-between' }}
      >
        {mdUp && (
          <Grid xs={12} md={6} lg={4}>
            <Image
              alt="about"
              src="/assets/images/course/course_6.jpg"
              ratio="4/6"
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        )}

        <Grid xs={12} md={6} lg={6}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Benefits of our training programs
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Our training is designed to provide the skills in practical approach. Our students is
            our best asset in showing the quality of our training
          </Typography>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 5, md: 10 }}
            sx={{ mt: { xs: 8, md: 10 } }}
          >
            <Stack spacing={3}>
              <Box sx={{ width: 24, height: 3, bgcolor: 'primary.main' }} />
              <Typography sx={{ color: 'text.secondary' }}>
                Strategies shared and knowledge earned allows our students to immediately receive
                certifications and continue serving those in need.
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Box sx={{ width: 24, height: 3, bgcolor: 'primary.main' }} />
              <Typography sx={{ color: 'text.secondary' }}>
                Whether you want to boost your career or grow at your own business by applying the
                latest compliance training, we have got you covered.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
