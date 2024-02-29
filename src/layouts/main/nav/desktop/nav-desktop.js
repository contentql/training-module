import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import { hideScroll } from 'src/theme/css';

import { navHorizontalConfig } from '../config';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavDesktop({ data, config, sx, ...other }) {
  return (
    <Stack
      direction="row"
      sx={{
        mx: 'auto',
        ...hideScroll.y,
        ...sx,
      }}
      {...other}
    >
      <Group items={data} config={navHorizontalConfig(config)} />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Group({ items, config }) {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
}

Group.propTypes = {
  items: PropTypes.array,
  config: PropTypes.any,
};

NavDesktop.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
  config: PropTypes.any,
};
