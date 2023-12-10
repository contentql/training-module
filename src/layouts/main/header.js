import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';

// import { _mock } from 'src/_mock';
import Logo from 'src/components/logo';
import { bgBlur } from 'src/theme/css';
import { paths } from 'src/routes/paths';
// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';
import { useUserStore } from 'src/states/auth-store';
import { useWishlistStore } from 'src/states/wishlist';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from '../config-layout';
// import Searchbar from '../common/searchbar';
import HeaderShadow from '../common/header-shadow';
// import SettingsButton from '../common/settings-button';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  // const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);
  const userData = useUserStore();
  // const removeUserData = useUserStore();

  const { isLoggedIn, image } = userData.UserData;

  const cart = useCartStore((state) => state.cart);

  const wishlist = useWishlistStore((state) => state.wishlist);

  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Box sx={{ lineHeight: 0, position: 'relative', width: '20%' }}>
            <Logo />
          </Box>

          {mdUp && <NavDesktop data={navConfig} />}

          <Stack
            spacing={{ xs: 0, md: 4 }}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Link component={RouterLink} href={paths.eLearning.account.wishlist}>
              <IconButton size="small" sx={{ p: 1.2 }}>
                <Badge
                  badgeContent={wishlist.length > 99 ? '99+' : wishlist.length}
                  color="primary"
                >
                  <Iconify icon="solar:heart-linear" width={24} />
                </Badge>
              </IconButton>
            </Link>

            <Link component={RouterLink} href={paths.eLearning.cart}>
              <IconButton size="small" sx={{ p: 1.2 }}>
                <Badge badgeContent={cart.length > 99 ? '99+' : cart.length} color="primary">
                  <Iconify icon="carbon:shopping-cart" width={24} />
                </Badge>
              </IconButton>
            </Link>

            {mdUp && (
              <>
                {isLoggedIn ? (
                  <>
                    {/* <Link component={RouterLink} href={paths.eLearning.account.personal}> */}
                    <Avatar
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      src={image}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Menu
                      id="basic-menu"
                      sx={{ mx: 'auto', mt: 1 }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <Link
                        sx={{ color: 'black' }}
                        component={RouterLink}
                        href={paths.eLearning.account.personal}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                      </Link>
                      <Link sx={{ color: 'black' }}>
                        <MenuItem onClick={() => userData.removeUserData()}>Logout</MenuItem>
                      </Link>
                    </Menu>
                    {/* </Link> */}
                    {/* <Button variant="contained" color="error" onClick={() => removeUserData()}>
                      logout
                    </Button> */}
                  </>
                ) : (
                  <Link component={RouterLink} href={paths.loginBackground}>
                    <Button variant="contained" color="inherit">
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}

            {!mdUp && <NavMobile data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
