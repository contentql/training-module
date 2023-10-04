import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo';
import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { HEADER } from '../config-layout';
// import Searchbar from '../common/searchbar';
import HeaderShadow from '../common/header-shadow';
// import SettingsButton from '../common/settings-button';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  const cart = useCartStore((state) => state.cart);

  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo />

            {/* <Link href="#">
              <Label
                color="info"
                sx={{
                  ml: 0.5,
                  px: 0.5,
                  top: -14,
                  left: 60,
                  height: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  position: 'absolute',
                }}
              >
                v2.1.0
              </Label>
            </Link> */}
          </Box>

          {mdUp && <NavDesktop data={navConfig} />}

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            {/* <Stack spacing={1} direction="row" alignItems="center">
              <Searchbar />

              <SettingsButton />
            </Stack> */}

            {mdUp && (
              <Link component={RouterLink} href={paths.loginBackground}>
                <Button variant="contained" color="inherit">
                  Login
                </Button>
              </Link>
            )}

            <Link component={RouterLink} href={paths.eLearning.cart} className="relative">
              <Iconify icon="mi:shopping-cart" />
              <div>
                <Label
                  sx={{
                    ml: 0.5,
                    px: 0.5,
                    bottom: -10,
                    left: 5,
                    height: 20,
                    fontSize: 11,
                    cursor: 'pointer',
                    position: 'absolute',
                  }}
                >
                  {cart.length > 99 ? '99+' : cart.length}
                </Label>
              </div>
            </Link>
          </Stack>

          {!mdUp && <NavMobile data={navConfig} />}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
