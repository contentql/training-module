import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { _mock } from 'src/_mock';
import { paths } from 'src/routes/paths';
import { bgGradient } from 'src/theme/css';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { PlayerDialog } from 'src/components/player';
import { fShortenNumber } from 'src/utils/format-number';
import { useResponsive } from 'src/hooks/use-responsive';
import ElearningHeroIllustration from 'src/assets/illustrations/elearning-hero-illustration';

// ----------------------------------------------------------------------

const SUMMARY = [
  { value: 14000, label: 'Learners', color: 'warning' },
  { value: 1050, label: 'Courses', color: 'error' },
  { value: 59000, label: 'Graduates', color: 'success' },
];

// ----------------------------------------------------------------------

export default function ElearningLandingHero() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const videoOpen = useBoolean();

  return (
    <>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          overflow: 'hidden',
          paddingTop: 4,
        }}
      >
        <Container
          sx={{
            py: 6,
            pb: { xs: 2 },
            display: { md: 'flex' },
            alignItems: { md: 'center' },
            height: { md: `100vh` },
          }}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={5}>
              <Stack
                sx={{
                  textAlign: { xs: 'center', md: 'unset' },
                  paddingTop: { md: 12 },
                }}
              >
                <Typography variant="h1">
                  Navigating Your
                  {/* <Box component="span" sx={{ color: 'text.disabled' }}>
                    {`  `}
                  </Box> */}
                  <Box component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                    {` Medical Career`}
                  </Box>{' '}
                  with E-Learning
                </Typography>

                <Typography sx={{ color: 'text.secondary', mt: 3, mb: { xs: 0, md: 5 } }}>
                  Discover a World of Opportunities Through Quality Nursing Education Online.
                </Typography>

                <Stack spacing={3} alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                  <Link component={RouterLink} href={paths.eLearning.courses}>
                    <Button sx={{ bgcolor: '#FF774B' }} size="large" variant="contained">
                      Start Learning
                    </Button>
                  </Link>

                  {/* <Stack direction="row" alignItems="center" sx={{ typography: 'h6' }}>
                    <Fab size="medium" color="info" onClick={videoOpen.onTrue} sx={{ mr: 1 }}>
                      <Iconify width={24} icon="carbon:play" />
                    </Fab>
                    Watch Video
                  </Stack> */}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed', mt: 8, mb: 6 }} />

                <Stack
                  direction="row"
                  spacing={{ xs: 3, sm: 10 }}
                  justifyContent={{ xs: 'center', md: 'unset' }}
                >
                  {SUMMARY.map((item) => (
                    <Stack key={item.value} spacing={0.5} sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          top: 8,
                          left: -4,
                          width: 24,
                          height: 24,
                          opacity: 0.24,
                          borderRadius: '50%',
                          position: 'absolute',
                          bgcolor: `${item.color}.main`,
                        }}
                      />
                      <Typography variant="h3">{fShortenNumber(item.value)}+</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.label}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {mdUp && (
              <Grid xs={12} md={6} lg={7}>
                <ElearningHeroIllustration />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* <PlayerDialog open={videoOpen.value} onClose={videoOpen.onFalse} videoPath={_mock.video(0)} /> */}
    </>
  );
}
