import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { _coursePosts } from 'src/_mock';
import Player from 'src/components/player';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import { useResponsive } from 'src/hooks/use-responsive';

import PostTags from '../../blog/common/post-tags';
import PostSocialsShare from '../../blog/common/post-socials-share';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonsDialog({
  lessons,
  selectedLesson,
  onSelectedLesson,
  open,
  onClose,
  playing,
  onReady,
  onEnded,
  onPlay,
  onPause,
}) {
  const { title, description, duration, tags, content } = _coursePosts[0];

  const mdUp = useResponsive('up', 'md');

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (value) => {
    setDrawerOpen(value);
  };

  const renderVideo = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 1,
        height: 1,
        aspectRatio: 16 / 9,
      }}
    >
      {selectedLesson?.videoPath ? (
        <Player
          controls
          url={selectedLesson?.videoPath}
          playing={playing}
          onReady={onReady}
          onEnded={onEnded}
          onPlay={onPlay}
          onPause={onPause}
        />
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 1,
            height: 1,
            typography: 'h6',
            color: 'text.disabled',
            bgcolor: 'background.neutral',
          }}
        >
          No Data
        </Stack>
      )}
    </Stack>
  );

  const renderLesson = (
    <Container className="overflow-y-scroll py-14">
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ borderRadius: 2, overflow: 'hidden' }}
      >
        {renderVideo}
      </Stack>

      <Grid container spacing={3} justifyContent={{ md: 'center' }}>
        <Grid xs={12} md={8}>
          <Stack
            spacing={3}
            sx={{
              pb: 6,
              textAlign: 'center',
              pt: { xs: 6, md: 10 },
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {duration}
            </Typography>

            <Typography variant="h2" component="h1">
              {title}
            </Typography>

            <Typography variant="h5">{description}</Typography>
          </Stack>

          <Divider sx={{ mb: 6 }} />

          <Markdown content={content} firstLetter />

          <PostTags tags={tags} />

          <PostSocialsShare />
        </Grid>
      </Grid>
    </Container>
  );

  const renderListDesktop = (
    <Stack
      spacing={0.5}
      sx={{
        p: 1,
        overflowY: 'scroll',
        width: { xs: 1, md: '44%' },
        height: 1,
      }}
    >
      {lessons?.map((lesson) => {
        const selected = selectedLesson?.id === lesson.id;

        const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';

        return (
          <ListItemButton
            key={lesson.id}
            selected={selected}
            disabled={!lesson.unLocked}
            onClick={() => onSelectedLesson(lesson)}
            sx={{ borderRadius: 1, maxHeight: '6rem' }}
          >
            <IconButton>
              <Iconify
                width="20px"
                height="20px"
                icon={!lesson.unLocked ? 'carbon:locked' : playIcon}
                sx={{
                  mr: 2,
                  ...(selected && {
                    color: 'primary.main',
                  }),
                  ...(!lesson.unLocked && {
                    color: 'text.disabled',
                  }),
                }}
              />
            </IconButton>

            <ListItemText
              primary={lesson.title}
              secondary={lesson.description}
              primaryTypographyProps={{
                typography: 'subtitle1',
                sx: {
                  ...(selected && {
                    color: 'primary.main',
                  }),
                },
              }}
              secondaryTypographyProps={{
                noWrap: true,
                component: 'span',
              }}
            />
          </ListItemButton>
        );
      })}
    </Stack>
  );

  const renderListMobile = (
    <SwipeableDrawer
      anchor="bottom"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      swipeAreaWidth={56}
      ModalProps={{
        keepMounted: true,
        style: { zIndex: 1300 },
      }}
      sx={{ '.MuiDrawer-paper': { height: '60%', overflow: 'visible' } }}
    >
      <Stack
        sx={{
          position: 'absolute',
          top: -56,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
        }}
      >
        <IconButton
          sx={{
            alignSelf: 'center',
            width: 40,
            height: 40,
            borderRadius: 3,
            top: 8,
            background: 'white',
          }}
          onClick={() => toggleDrawer(false)}
          className="animate-bounce"
        >
          <Iconify
            icon={drawerOpen ? 'carbon:arrow-down' : 'carbon:arrow-up'}
            width="25px"
            height="25px"
          />
        </IconButton>
      </Stack>
      <Stack
        spacing={0.5}
        sx={{
          p: 1,
          pt: 2,
          overflowY: 'scroll',
          width: 1,
          height: 1,
        }}
      >
        {lessons?.map((lesson) => {
          const selected = selectedLesson?.id === lesson.id;

          const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';

          return (
            <ListItemButton
              key={lesson.id}
              selected={selected}
              disabled={!lesson.unLocked}
              onClick={() => onSelectedLesson(lesson)}
              sx={{ borderRadius: 1, maxHeight: '6rem' }}
            >
              <IconButton>
                <Iconify
                  width="16px"
                  height="16px"
                  icon={!lesson.unLocked ? 'carbon:locked' : playIcon}
                  sx={{
                    mr: 2,
                    ...(selected && {
                      color: 'primary.main',
                    }),
                    ...(!lesson.unLocked && {
                      color: 'text.disabled',
                    }),
                  }}
                />
              </IconButton>

              <ListItemText
                primary={lesson.title}
                secondary={lesson.description}
                primaryTypographyProps={{
                  typography: 'subtitle1',
                  sx: {
                    ...(selected && {
                      color: 'primary.main',
                    }),
                  },
                }}
                secondaryTypographyProps={{
                  noWrap: true,
                  component: 'span',
                }}
              />
            </ListItemButton>
          );
        })}
      </Stack>
    </SwipeableDrawer>
  );

  return (
    <Dialog
      fullWidth
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          overflow: 'hidden',
          borderRadius: 0,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          top: 6,
          right: { xs: 4, md: 24 },
          zIndex: 9,
          position: 'absolute',
        }}
      >
        <Iconify icon="carbon:close" width="25px" height="25px" />
      </IconButton>

      <Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={{ height: 1 }}>
        {mdUp ? renderListDesktop : renderListMobile}
        {renderLesson}
      </Stack>
    </Dialog>
  );
}

ElearningCourseDetailsLessonsDialog.propTypes = {
  lessons: PropTypes.array,
  onClose: PropTypes.func,
  onEnded: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onReady: PropTypes.func,
  onSelectedLesson: PropTypes.func,
  open: PropTypes.bool,
  playing: PropTypes.bool,
  selectedLesson: PropTypes.object,
};
