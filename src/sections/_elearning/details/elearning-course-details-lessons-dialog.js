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
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Quiz from 'src/sections/quiz';
import Player from 'src/components/player';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import { _questions, _coursePosts } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';

import PostTags from '../../blog/common/post-tags';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonsDialog({
  selectedLesson,
  onSelectedLesson,
  open,
  onClose,
  playing,
  onReady,
  onEnded,
  onPlay,
  onPause,
  units,
  pauseVideo,
  hasBoughtCourse,
}) {
  // units?.map((unit) => unit.attributes.lesson.map((lsn) => lsn.title === selectedLesson.title));

  const mdUp = useResponsive('up', 'md');

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [expandedUnits, setExpandedUnits] = useState(Array(units?.length).fill(false));

  if (!selectedLesson) return null;

  const { title, subtitle, content, time } = selectedLesson;

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
        <Grid xs={12} md={10}>
          <Stack
            spacing={3}
            sx={{
              pb: 6,
              textAlign: 'center',
              pt: { xs: 6, md: 10 },
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {time} mins read
            </Typography>

            <Typography variant="h2" component="h1">
              {title}
            </Typography>

            <Typography variant="h5">{subtitle}</Typography>
          </Stack>

          <Divider sx={{ mb: 6 }} />

          <Markdown content={content} firstLetter />

          {/* <PostTags tags={tags} /> */}

          {/* <PostSocialsShare /> */}
        </Grid>
      </Grid>
    </Container>
  );

  const unitList = units?.map((unit, index) => (
    <Accordion
      key={index}
      expanded={expandedUnits[index]}
      onChange={() => {
        const newExpandedUnits = [...expandedUnits];
        newExpandedUnits[index] = !expandedUnits[index];
        setExpandedUnits(newExpandedUnits);
      }}
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          borderRadius: 0,
        },
      }}
    >
      <AccordionSummary
        sx={{
          pr: 1,
          pl: 2,
          minHeight: { xs: 40, md: 64 },
          mr: 2,
          ...(unit.attributes.lesson.includes(selectedLesson) && {
            color: 'primary.main',
          }),
          [`&.${accordionSummaryClasses.content}`]: {
            p: 0,
            m: 0,
          },
          [`&.${accordionSummaryClasses.expanded}`]: {
            bgcolor: 'action.selected',
          },
        }}
      >
        <img src="/icons/book.svg" alt="unit" />

        <Typography
          variant="subtitle1"
          sx={{
            pl: 2,
            flexGrow: 1,
          }}
        >
          {unit.attributes.title}
        </Typography>

        <Iconify
          icon={expandedUnits[index] ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 2 }}
        />
      </AccordionSummary>

      <AccordionDetails
        sx={{
          p: 2,
          typography: 'body',
          color: 'text.secondary',
        }}
        className="ml-10"
      >
        {unit.attributes.lesson.map((lesson) => {
          const selected = selectedLesson?.title === lesson.title;

          const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';

          return (
            <ListItemButton
              key={lesson.title}
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
        <Quiz _questions={_questions} hasBoughtCourse={hasBoughtCourse} />
      </AccordionDetails>
    </Accordion>
  ));

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
      {unitList}
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
        {unitList}
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
  onClose: PropTypes.func,
  onEnded: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onReady: PropTypes.func,
  onSelectedLesson: PropTypes.func,
  open: PropTypes.bool,
  playing: PropTypes.bool,
  selectedLesson: PropTypes.object,
  units: PropTypes.array,
  pauseVideo: PropTypes.func,
  hasBoughtCourse: PropTypes.bool,
};
