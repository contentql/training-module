import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'success', 'warning'];

const SERVICES = [
  {
    name: 'SEO',
    icon: '/assets/icons/service/ic_service_seo.svg',
    content:
      'We have meticulously crafted our programs to serve as comprehensive learning environments,allowing each Administrator or Manager to partake in personalized learning experiences.',
    path: paths.marketing.services,
    color: '#ffe1c9',
  },
  {
    name: 'Email Marketing',
    icon: '/assets/icons/service/ic_service_mail.svg',
    content:
      'Our programs not only meet but surpass the licensing standards mandated by the states of Texas.',

    path: paths.marketing.services,
    color: '#e2c9ff',
  },
  {
    name: 'Search Engine Oprimization',
    icon: '/assets/icons/service/ic_service_analysis.svg',
    content: 'Enjoy 24/7 support through chat, text, email, and phone',
    path: paths.marketing.services,
    color: '#fff5c9',
  },
  {
    name: 'Social Marketing',
    icon: '/assets/icons/service/ic_service_bullhorn.svg',
    content: 'Centralized account for all courses and for all certificates.',
    path: paths.marketing.services,
    color: '#d7ffc9',
  },
];

// ----------------------------------------------------------------------

export default function ElearningLandingServices() {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 4 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 580,
          mb: { xs: 8, md: 5 },
          mx: { xs: 'auto', md: 'auto' },
          mt: { xs: 8, md: 5 },
          // textAlign: { xs: 'center', md: 'center' },
          textAlign: 'center',
        }}
      >
        <Typography variant="h2">Why Texas Administrators choose us</Typography>
      </Stack>

      <Box
        sx={{
          gap: 4,
          display: 'grid',
          alignItems: 'center',
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
      <Divider sx={{ borderStyle: 'dashed', mt: 8, bgcolor: 'primary.main' }} />
    </Container>
  );
}

// ----------------------------------------------------------------------

function ServiceItem({ service, index }) {
  const { name, icon, content, path, color } = service;

  return (
    <Card
      sx={{
        px: 4,
        py: 5,
        textAlign: 'center',
        backgroundColor: color,
        ...(index === 1 && {
          py: { xs: 5, md: 8 },
        }),
        ...(index === 2 && {
          py: { xs: 5, md: 10 },
          boxShadow: (theme) => ({ md: theme.customShadows.z24 }),
        }),
      }}
    >
      <Stack spacing={1} sx={{ my: 2 }}>
        {/* <TextMaxLine variant="h6">{name}</TextMaxLine> */}
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          {content}
        </Typography>
      </Stack>

      {/* <IconButton
        component={RouterLink}
        href={path}
        color={
          (index === 0 && 'primary') ||
          (index === 1 && 'secondary') ||
          (index === 2 && 'success') ||
          'warning'
        }
      >
        <Iconify icon="carbon:direction-straight-right" />
      </IconButton> */}
    </Card>
  );
}

ServiceItem.propTypes = {
  index: PropTypes.number,
  service: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    content: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }),
};
