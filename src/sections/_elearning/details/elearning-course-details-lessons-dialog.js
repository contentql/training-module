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

import { _coursePosts } from 'src/_mock';
import Player from 'src/components/player';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';

import PostTags from '../../blog/common/post-tags';
import PostSocialsShare from '../../blog/common/post-socials-share';
import { CloseIcon } from 'yet-another-react-lightbox';

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

  const renderList = (
    <Stack
      spacing={0.5}
      sx={{
        p: 1,
        overflowY: 'scroll',
        width: { xs: 1, md: 0.5 },
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
            <Iconify
              width={24}
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
          right: 24,
          zIndex: 9,
          position: 'absolute',
        }}
      >
        <Iconify icon="carbon:close" width="25px" height="25px" />
      </IconButton>

      <Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={{ height: 1 }}>
        {renderList}
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
