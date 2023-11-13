import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

export const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open' && prop !== 'subItem',
})(({ active, open, subItem, theme }) => {
  const dotActiveStyle = {
    content: '""',
    borderRadius: '50%',
    position: 'absolute',
    width: 6,
    height: 6,
    left: -12,
    backgroundColor: theme.palette.primary.main,
  };

  return {
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightMedium,
    padding: 0,
    height: '100%',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      opacity: 0.8,
      backgroundColor: 'transparent',
      '&::before': dotActiveStyle,
    },
    // Sub item
    ...(subItem && {
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
    }),
    // Active
    ...(active && {
      color: '#0D5992',
      fontWeight: theme.typography.fontWeightBold,
      '&::before': dotActiveStyle,
    }),
    // Active sub item
    ...(active &&
      subItem && {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightSemiBold,
        '&::before': {
          ...dotActiveStyle,
          color: theme.palette.primary.main,
        },
      }),
    // Open
    ...(open && {
      opacity: 0.48,
      '&::before': dotActiveStyle,
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledMenu = styled(Paper)(({ theme }) => ({
  top: 62,
  width: '100%',
  borderRadius: 0,
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  boxShadow: theme.customShadows.dialog,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.h6,
  padding: 0,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
}));
