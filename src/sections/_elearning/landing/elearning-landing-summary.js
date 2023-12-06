import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
// import CountUp from 'src/components/count-up';
import { RouterLink } from 'src/routes/components';
// import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: 'Comprehensive',
    description: 'Our exams cover a wide range of topics to ensure a thorough evaluation.',
    icon: '/assets/icons/home-steps/step-1.svg',
  },
  {
    title: 'Convenient',
    description: 'Take the online courses and exams at your own pace.',
    icon: '/assets/icons/home-steps/step-2.svg',
  },
  {
    title: 'Certificate',
    description: 'Certificate will be provided after completion of course.',
    icon: '/assets/icons/home-steps/03.png',
  },
  {
    title: 'Quality Assurance',
    description: 'We set the bar for excellence in home and community support services.',
    icon: '/assets/icons/home-steps/step-4.svg',
  },
];

// ----------------------------------------------------------------------

export default function ElearningLandingSummary() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        py: { xs: 5, md: 4 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          mx: 'auto',
          maxWidth: 480,
          mb: { xs: 8, md: 10 },
        }}
      >
        <Typography variant="h2">Why Choose Our Exams</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Reliable assessment experience, combining rigorously crafted questions with a
          user-friendly interface, ensuring a comprehensive evaluation tailored to your learning
          journey.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 8, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value) => (
          <Stack key={value.description} spacing={1}>
            <Image
              alt={value.icon}
              src={value.icon}
              sx={{ mb: 3, width: 80, height: 80, mx: 'auto' }}
            />

            <Typography variant="h4">{value.title}</Typography>

            <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
          </Stack>
        ))}
      </Box>
      <Link component={RouterLink} href={paths.eLearning.courses}>
        <Button sx={{ bgcolor: '#FF774B', mt: 8 }} size="large" variant="contained">
          Start Learning
        </Button>
      </Link>
    </Container>
  );
}
