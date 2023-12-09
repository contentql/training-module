import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'warning', 'success'];

const SERVICES = [
  {
    name: 'Comprehensive',
    icon: '/assets/icons/service/comprehensive.svg',
    content: 'Our exams cover a wide range of topics to ensure a thorough evaluation.',
    bgcolor: '#f7efff',
    color: '#b566ff',
  },
  {
    name: 'Convenient',
    icon: '/assets/icons/service/convienent.svg',
    content: 'Take our online courses and examinations at a pace that suits your unique schedule.',
    bgcolor: '#ffe0f2',
    color: '#ff6bc1',
  },
  {
    name: 'Certificate',
    icon: '/assets/icons/service/certificate.svg',
    content:
      'Upon completion of the course certificate will be provided after completion of course.',
    bgcolor: '#ffe2d3',
    color: '#f56025',
  },
  {
    name: 'Quality Assurance',
    icon: '/assets/icons/service/quality.svg',
    content: 'We set the bar for excellence in home and community support services.',
    bgcolor: '#d6eded',
    color: '#35b27c',
  },
];

// ----------------------------------------------------------------------

export default function ElearningLandingProcess() {
  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        sx={{
          py: { xs: 5, md: 10 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            maxWidth: 480,
            mb: { xs: 8, md: 5 },
            mx: { xs: 'auto', md: 'auto' },
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          {/* <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Work Flow
          </Typography> */}

          <Typography variant="h2">Why Choose Our Exams</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Reliable assessment experience, combining rigorously crafted questions with a
            user-friendly interface, ensuring a comprehensive evaluation tailored to your learning
            journey.
          </Typography>
        </Stack>

        <Box
          sx={{
            gap: 4,
            display: 'grid',
            alignItems: 'flex-end',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {SERVICES.map((service, index) => (
            <ServiceItem key={service.name} service={service} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function ServiceItem({ service, index }) {
  const { name, icon, content, bgcolor, color } = service;

  return (
    <Card
      sx={{
        p: 2,
        color,
        // bgcolor: (theme) => theme.palette[COLORS[index]].light,
        bgcolor,
        // boxShadow: (theme) => `-8px 12px 32px 0px ${alpha(theme.palette[COLORS[index]].main, 0.2)}`,
        ...(index === 1 && {
          mb: { md: 2.5 },
        }),
        ...(index === 2 && {
          mb: { md: 5 },
        }),
        ...(index === 3 && {
          mb: { md: 7.5 },
        }),
      }}
    >
      <SvgColor
        src={icon}
        sx={{
          width: 64,
          height: 64,
          // opacity: 0.48,
        }}
      />

      <Typography variant="h5" sx={{ mt: 2, mb: 1, textAlign: 'left' }}>
        {name}
      </Typography>
      <Typography
        variant="body"
        sx={{ mt: 2, textAlign: 'right', color: (theme) => theme.palette[COLORS[index]].darker }}
      >
        {content}
      </Typography>
    </Card>
  );
}

ServiceItem.propTypes = {
  index: PropTypes.number,
  service: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    content: PropTypes.string,
    color: PropTypes.string,
    bgcolor: PropTypes.string,
  }),
};
