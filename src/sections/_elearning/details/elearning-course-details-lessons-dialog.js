'use client';

import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Dialog from '@mui/material/Dialog';
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
// import { paths } from 'src/routes/paths';
import Player from 'src/components/player';
import Iconify from 'src/components/iconify';
import { getUnitData } from 'src/queries/unit';
import Markdown from 'src/components/markdown';
import { RouterLink } from 'src/routes/components';
import NumberDone from 'src/components/NumberDone';
import { useUserStore } from 'src/states/auth-store';
// import { _questions, _coursePosts } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';

// import PostTags from '../../blog/common/post-tags';

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

  const [metaData, setMetaData] = useState([]);
  const [metaDataId, setMetaDataId] = useState(null);

  const searchParams = useSearchParams();

  const { data } = useQuery({
    queryKey: ['unit', searchParams.get('unit')],
    queryFn: () => getUnitData(Number(searchParams.get('unit'))),
    refetchOnWindowFocus: false,
  });

  // console.log(getUserToken());
  console.log('metaData', metaData);

  useEffect(() => {
    if (!units) return;
    getUserProgress();
    const idx = units?.findIndex((unit) => unit.id === searchParams.get('unit'));
    setExpandedUnits((prev) => prev.map((_, index) => index === idx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units, searchParams]);

  // const handleClickOpen = useCallback(() => {
  //   getUserProgress();
  // }, []);

  const lessonData =
    data && data?.attributes.lesson.find((l) => l.id.toString() === searchParams.get('lesson'));

  // if (!selectedLesson) return null;

  const { title, subtitle, content, time } = lessonData ?? {};

  const { UserData } = useUserStore();

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
  const userToken = localStorage.getItem('token');

  const getUserProgress = async (lesson) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_METADATA_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      const returnData = await res.json();
      returnData?.map((l) => setMetaDataId(l));
      returnData?.map((list) =>
        setMetaData(list.data.map((l) => ({ LessonTitle: l.LessonTitle })))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addingLessonToUser = async (lesson) => {
    console.log('add lesson to user');
    console.log('lessonTitle', lesson.title);
    const requestBody = {
      data: {
        data: [...metaData, { LessonTitle: lesson.title }],
      },
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_METADATA_URL}/${metaDataId.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        // body: requestBody,
        body: JSON.stringify(requestBody),
      });
      setMetaData([...metaData, { LessonTitle: lesson.title }]);
    } catch (error) {
      console.log(error);
    }
  };

  const addingUserProgress = async (lesson) => {
    console.log('add user to data');

    const requestBody = {
      data: {
        users: {
          connect: [UserData.id],
        },
        data: [
          {
            LessonTitle: lesson?.title,
          },
        ],
      },
    };
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_METADATA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestBody),
      });
      setMetaData([...metaData, { LessonTitle: lesson.title }]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (lesson) => {
    const isMetaDataExisting = metaData.filter((details) => details.LessonTitle === lesson.title);
    if (metaData.length === 0) {
      addingUserProgress(lesson);
    } else if (isMetaDataExisting.length === 0) {
      // setMetaData([...metaData, { LessonTitle: lesson.title }]);
      addingLessonToUser(lesson);
    }
  };

  const renderLesson = (
    <Container className="overflow-y-scroll py-14">
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ borderRadius: 2, overflow: 'hidden' }}
      >
        {/* {renderVideo} */}
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
      key={unit.id}
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
            color: '#0D5992',
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
        className="ml-3"
      >
        {unit.attributes.lesson.map((lesson, value) => {
          const selected = selectedLesson?.id === lesson.id;

          const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';

          lesson.unLocked = true;
          // const filterData = metaData?.filter((l) => l.LessonTitle !== lesson?.title);
          const hasMatch = Boolean(metaData.find((a) => a.LessonTitle === lesson.title));

          return (
            <Link
              component={RouterLink}
              href={`?unit=${unit.id}&lesson=${lesson.id}`}
              color="inherit"
              underline="none"
            >
              <ListItemButton
                key={lesson.title}
                selected={selected}
                disabled={!lesson.unLocked}
                onClick={() => onSelectedLesson(lesson)}
                sx={{ borderRadius: 1, maxHeight: '6rem' }}
              >
                {/* <IconButton>
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
                </IconButton> */}
                <Typography sx={{ mr: 2, ...(selected && { color: 'primary.main' }) }}>
                  <NumberDone
                    index={value}
                    sx={{ ml: 2 }}
                    lessonComplete={hasMatch}
                    // lessonComplete={metaData?.filter((l) => l.LessonTitle === lesson?.title)}
                  />
                </Typography>

                <ListItemText
                  onClick={() => handleClick(lesson)}
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
            </Link>
          );
        })}
        <Quiz _questions={unit?.attributes?.quiz} hasBoughtCourse={hasBoughtCourse} />
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
    <Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={{ height: 1 }}>
      <Link component={RouterLink} href="../" color="inherit">
        <IconButton
          onClick={onClose}
          sx={{
            top: 6,
            right: { xs: 4, md: 24 },
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <Iconify icon="carbon:close" width="25px" height="25px" sx={{ color: 'red' }} />
        </IconButton>
      </Link>

      {mdUp ? renderListDesktop : renderListMobile}
      {renderLesson}
    </Stack>
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
