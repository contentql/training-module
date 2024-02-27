// import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';

// import NavList from './nav-list';

// // ----------------------------------------------------------------------

// export default function NavDesktop({ data, sx }) {
//   return (
//     <Stack
//       component="nav"
//       direction="row"
//       spacing={5}
//       sx={{
//         height: 1,
//         ...sx,
//       }}
//     >
//       {data.map((link) => (
//         <NavList key={link.title} item={link} />
//       ))}
//     </Stack>
//   );
// }

// NavDesktop.propTypes = {
//   data: PropTypes.array,
//   sx: PropTypes.object,
// };

import Stack from '@mui/material/Stack';

import { hideScroll } from 'src/theme/css';

import NavList from './nav-list';

import { navHorizontalConfig } from '../config';

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
