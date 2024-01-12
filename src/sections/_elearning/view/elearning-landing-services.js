import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';
import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'warning', 'success'];

const SERVICES = [
  {
    name: 'SEO',
    icon: '/assets/icons/service/standard.svg',
    content:
      'Our programs not only meet but surpass the licensing standards mandated by the states of Texas.',
    path: paths.marketing.services,
    bgcolor: '#f7efff',
    color: '#b566ff',
    hovercolor: '#dfc1fc',
  },
  {
    name: 'Email Marketing',
    icon: '/assets/icons/service/learning.svg',
    content:
      'We have meticulously crafted our programs to serve as comprehensive learning environments,allowing each Administrator or Manager to partake in personalized learning experiences.',

    path: paths.marketing.services,
    bgcolor: '#ffe0f2',
    color: '#ff6bc1',
    hovercolor: '#ffbce3',
  },
  {
    name: 'Search Engine Oprimization',
    icon: '/assets/icons/service/support.svg',
    content: 'Enjoy 24/7 support through chat, text, email, and phone',
    path: paths.marketing.services,
    bgcolor: '#ffe2d3',
    color: '#f56025',
    hovercolor: '#ffaf90',
  },
  {
    name: 'Social Marketing',
    icon: '/assets/icons/service/centralized.svg',
    content: 'Centralized account for all courses and for all certificates.',
    path: paths.marketing.services,
    bgcolor: '#d6eded',
    color: '#35b27c',
    hovercolor: '#92d1b6',
  },
];

// ----------------------------------------------------------------------

export default function ElearningLandingServices() {
  return (
    <MotionContainer>
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
          <Typography variant="h2">Why texas administrators choose us</Typography>
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
            <m.div variants={varBounce().in}>
              <ServiceItem key={service.name} service={service} index={index} />
            </m.div>
          ))}
        </Box>
      </Container>
    </MotionContainer>
  );
}

// ----------------------------------------------------------------------

function ServiceItem({ service, index }) {
  const { icon, content, color, bgcolor, hovercolor } = service;

  return (
    <MotionContainer>
      <Card
        sx={{
          px: 4,
          py: 5,
          textAlign: 'center',
          color,
          bgcolor,
          '&:hover': {
            transition: 'transform 1s ease-in-out',
            boxShadow: () => `-0px 0px 14px ${hovercolor}`,
            transform: 'scale(1.05)',

            '& img': {
              animation: 'bounce 1s',
              transition: 'transform 1s ease-in-out',
            },
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateY(0)',
              },
              '40%': {
                transform: 'translateY(-10px)',
              },
              '60%': {
                transform: 'translateY(-10px)',
              },
            },
          },
        }}
      >
        {/* <SvgColor
          src={icon}
          sx={{
            width: 88,
            height: 88,
            mx: 'auto',
            color,
          }}
        /> */}

        <img src={icon} alt="icon" />

        <Stack spacing={1} sx={{ my: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette[COLORS[index]].darker,
            }}
          >
            {content}
          </Typography>
        </Stack>
      </Card>
    </MotionContainer>
  );
}

ServiceItem.propTypes = {
  index: PropTypes.number,
  service: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    content: PropTypes.string,
    color: PropTypes.string,
    bgcolor: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hovercolor: PropTypes.string,
  }),
};
