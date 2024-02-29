import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import { appBarClasses } from '@mui/material/AppBar';

import { usePathname } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import NavItem from './nav-item';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, hasChild, config }) {
  const navRef = useRef(null);

  const pathname = usePathname();

  const active = useActiveLink(data.path, hasChild);

  const externalLink = data.path.includes('http');

  const listOpen = useBoolean();

  useEffect(() => {
    if (listOpen.value) {
      listOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const appBarEl = Array.from(document.querySelectorAll(`.${appBarClasses.root}`));

    // Reset styles when hover
    const styles = () => {
      document.body.style.overflow = '';
      document.body.style.padding = '';
      // Apply for Window
      appBarEl.forEach((elem) => {
        elem.style.padding = '';
      });
    };

    if (listOpen.value) {
      styles();
    } else {
      styles();
    }
  }, [listOpen.value]);

  return (
    <>
      <NavItem
        ref={navRef}
        item={data}
        depth={depth}
        open={listOpen.value}
        active={active}
        externalLink={externalLink}
        onMouseEnter={listOpen.onTrue}
        onMouseLeave={listOpen.onFalse}
        config={config}
      />

      {hasChild && (
        <Popover
          open={listOpen.value}
          anchorEl={navRef.current}
          anchorOrigin={
            depth === 1
              ? { vertical: 'bottom', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'right' }
          }
          transformOrigin={
            depth === 1
              ? { vertical: 'top', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'left' }
          }
          slotProps={{
            paper: {
              onMouseEnter: listOpen.onTrue,
              onMouseLeave: listOpen.onFalse,
              sx: {
                width: 220,
                ...(listOpen.value && {
                  pointerEvents: 'auto',
                }),
              },
            },
          }}
          sx={{
            pointerEvents: 'none',
          }}
        >
          <NavSubList data={data.children} depth={depth} config={config} />
        </Popover>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ data, depth, config }) {
  return (
    <Stack spacing={0.2}>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </Stack>
  );
}

NavSubList.propTypes = {
  config: PropTypes.any,
  data: PropTypes.array,
  depth: PropTypes.number,
};

NavList.propTypes = {
  config: PropTypes.any,
  data: PropTypes.object,
  depth: PropTypes.number,
  hasChild: PropTypes.bool,
};
