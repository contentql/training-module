import { memo } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';

import Icon from './pattern/icon';
import Shape from './pattern/shape';
import Label from './pattern/label';
import Pattern02 from './pattern/pattern-02';
import Pattern01 from './pattern/pattern-01';

// ----------------------------------------------------------------------

const varUp = {
  animate: { y: [-8, 8, -8], x: [-4, 4, -4] },
  transition: { duration: 8, repeat: Infinity },
};

const varDown = {
  animate: { y: [8, -8, 8], x: [4, -4, 4] },
  transition: { duration: 8, repeat: Infinity },
};

// const varLeft = {w

const varRight = {
  animate: { x: [8, -8, 8], y: [4, -4, 4] },
  transition: { duration: 7, repeat: Infinity },
};

// ----------------------------------------------------------------------

function ElearningHeroIllustration({ sx, ...other }) {
  const theme = useTheme();

  const GREEN = theme.palette.success.main;

  const YELLOW = theme.palette.warning.main;

  const BLUE = '#355EC9';

  const PURPLE = '#9B3AB1';

  const styleIconContent = {
    fontSize: 22,
    color: 'common.black',
    fontWeight: 'fontWeightBold',
  };

  return (
    <Box
      sx={{
        width: 850,
        height: 600,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ right: 10, bottom: 28, zIndex: 8 }}>
        <Image
          visibleByDefault
          // disabledEffect
          alt="teacher"
          src="/assets/images/course/group16.png"
          sx={{ width: 846, height: 490 }}
        />
      </Box>

      <Box
        {...varDown}
        component={m.div}
        sx={{ position: 'absolute', left: 300, bottom: 100, zIndex: 8 }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="book icon"
          src="/assets/icons/ic_book.png"
          sx={{ width: 50, height: 62 }}
        />
      </Box>

      <Box
        {...varRight}
        component={m.div}
        sx={{ position: 'absolute', left: 600, top: 10, zIndex: 8 }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="pencil icon"
          src="/assets/icons/ic_pencil.png"
          sx={{ width: 60, height: 77 }}
        />
      </Box>

      {/* <Box
        {...varUp}
        component={m.div}
        sx={{ zIndex: 9, left: 120, bottom: 168, position: 'absolute' }}
      >
        <Label
          text="Python"
          icon={
            <Image
              visibleByDefault
              disabledEffect
              alt="python"
              src="/assets/icons/platforms/ic_platform_python.svg"
              sx={{ width: 56, height: 56 }}
            />
          }
          sx={{
            py: 1.75,
            typography: 'h3',
            color: '#2994FF',
            boxShadow: `0px 24px 48px rgba(0, 0, 0, 0.24), inset 0px -4px 10px ${alpha(
              theme.palette.grey[600],
              0.48
            )}`,
          }}
        />
      </Box> */}

      {/* Icon */}

      {/* <Box
        {...varLeft}
        component={m.div}
        sx={{ top: 88, right: 72, zIndex: 8, position: 'absolute' }}
      >
        <Icon
          color={GREEN}
          content={<Typography sx={{ ...styleIconContent }}>Dw</Typography>}
          sx={{ transform: 'scale(1.2) rotate(15deg)' }}
        />
      </Box> */}

      {/* <Box {...varRight} component={m.div} sx={{ zIndex: 8, bottom: 160, position: 'absolute' }}>
        <Icon
          color={YELLOW}
          content={<Typography sx={{ ...styleIconContent }}>Ai</Typography>}
          sx={{ transform: 'translateX(40px) scale(1.2) rotate(-15deg)' }}
        />
      </Box> */}

      {/* <Box {...varUp} component={m.div} sx={{ zIndex: 8, right: 90, position: 'absolute' }}>
        <Icon
          color={PURPLE}
          content={<Typography sx={{ ...styleIconContent, color: 'common.white' }}>Ae</Typography>}
          sx={{ transform: 'scale(1.2) translateY(20px) rotate(15deg)' }}
        />
      </Box>

      <Box {...varDown} component={m.div} sx={{ zIndex: 8, position: 'absolute' }}>
        <Icon
          color={BLUE}
          content={<Typography sx={{ ...styleIconContent, color: 'common.white' }}>Ps</Typography>}
          sx={{
            transform: 'scale(1.2) translate(-135px, -75px) rotate(15deg)',
          }}
        />
      </Box> */}

      <Pattern01 sx={{ left: 0, top: 0 }} />
      <Pattern02 sx={{ top: 35, left: 280, opacity: 0.74, transform: 'scale(1.2)' }} />
      <Shape sx={{ position: 'absolute', right: 120, bottom: 0 }} />
    </Box>
  );
}

ElearningHeroIllustration.propTypes = {
  sx: PropTypes.object,
};

export default memo(ElearningHeroIllustration);
