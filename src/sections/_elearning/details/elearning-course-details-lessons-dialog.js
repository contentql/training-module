'use client';

import axios from 'axios';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from 'react-query';

import Stack from '@mui/material/Stack';
import { Box, styled } from '@mui/system';
import { grey } from '@mui/material/colors';
import { Link, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// import Dialog from '@mui/material/Dialog';
import ListItemButton from '@mui/material/ListItemButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Quiz from 'src/sections/quiz';
// import { paths } from 'src/routes/paths';
// import Player from 'src/components/player';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import { getUnitData } from 'src/queries/unit';
import { RouterLink } from 'src/routes/components';
import NumberDone from 'src/components/NumberDone';
import { useUserStore } from 'src/states/auth-store';
import { useDebounce } from 'src/hooks/use-debounce';
import { useResponsive } from 'src/hooks/use-responsive';
import { useUserProgress } from 'src/states/user-progress';
// import PostTags from '../../blog/common/post-tags';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonsDialog({
  selectedLesson,
  onSelectedLesson,
  // open,
  onClose,
  playing,
  onReady,
  onEnded,
  onPlay,
  onPause,
  units,
  // pauseVideo,
  hasBoughtCourse,
}) {
  const mdUp = useResponsive('up', 'md');
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState(Array(units?.length).fill(false));

  const [userLessonData, setUserLessonData] = useState([]);
  const [metaDataId, setMetaDataId] = useState(null);

  const searchParams = useSearchParams();

  const userLessons = useUserProgress((state) => state.lessons);
  const addToLessons = useUserProgress((state) => state.addToLessons);
  const updateLessons = useUserProgress((state) => state.updateLessons);
  // const reset = useUserProgress((state) => state.reset);
  // console.log({ userLessons });

  const { data: lessonData, isLoading } = useQuery({
    queryKey: ['unit', searchParams.get('unit'), searchParams.get('lesson')],
    queryFn: () =>
      getUnitData(Number(searchParams.get('unit')), String(searchParams.get('lesson'))),
    refetchOnWindowFocus: false,
  });

  // const lessonData =
  //   data &&
  //   data?.attributes.lesson.find(
  //     (l) => l.title.toString() === searchParams.get('lesson').toString()
  //   );

  const { data: userProgressData } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => getUserProgress(),
    enabled: !!lessonData?.id,
    refetchOnWindowFocus: false,
  });

  const { title, subtitle, content, time, id } = lessonData ?? {};
  const debouncedValue = useDebounce(id, 3000);

  const { data: addUserProgress, refetch } = useQuery({
    queryKey: ['userAddProgress', debouncedValue],
    queryFn: () => addingUserProgress(),
    enabled: false,
  });

  const { data: updateUserProgress } = useQuery({
    queryKey: ['updateUserProgress', debouncedValue],
    queryFn: () => addingLessonToUser(),
    enabled: !!debouncedValue,
  });

  useEffect(() => {
    if (!units) return;
    // reset();
    const idx = units?.findIndex((unit) => unit.id === searchParams.get('unit'));
    setExpandedUnits((prev) => prev.map((_, index) => index === idx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units, searchParams]);

  // useEffect(() => {
  //   // addToLessons(debouncedValue);
  //   // if (debouncedValue) {b
  //   handleClick();
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedValue]);

  const { UserData } = useUserStore();

  const toggleDrawer = (value) => {
    setDrawerOpen(value);
  };

  // const renderVideo = (
  //   <Stack
  //     alignItems="center"
  //     justifyContent="center"
  //     sx={{
  //       width: 1,
  //       height: 1,
  //       aspectRatio: 16 / 9,
  //     }}
  //   >
  //     {selectedLesson?.videoPath ? (
  //       <Player
  //         controls
  //         url={selectedLesson?.videoPath}
  //         playing={playing}
  //         onReady={onReady}
  //         onEnded={onEnded}
  //         onPlay={onPlay}
  //         onPause={onPause}
  //       />
  //     ) : (
  //       <Stack
  //         alignItems="center"
  //         justifyContent="center"
  //         sx={{
  //           width: 1,
  //           height: 1,
  //           typography: 'h6',
  //           color: 'text.disabled',
  //           bgcolor: 'background.neutral',
  //         }}
  //       >
  //         No Data
  //       </Stack>
  //     )}
  //   </Stack>
  // );
  const userToken = localStorage.getItem('token');

  const getUserProgress = async (lesson) => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_METADATA_URL, {
        // method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log('res', res.data);
      res?.data.forEach((list) => {
        setMetaDataId(list);
        setUserLessonData(list.data.map((l) => ({ LessonTitle: l.LessonTitle })));

        // list.data.forEach((listData) => {
        //   userLessonData.forEach((userLesson) => {
        //     if (userLesson.LessonTitle !== listData.LessonTitle) {
        //       //
        //       setUserLessonData((prev) => [...prev, { LessonTitle: listData.LessonTitle }]);
        //     }
        //   });
        // });
      });
      if (res.data.length === 0) {
        console.log('refetch');
        refetch();
      }
      // res?.data.map((list) =>
      //   if(userLessons.LessonTitle)
      //   updateLessons(list.data.map((l) => ({ LessonTitle: l.LessonTitle })))
      // );
    } catch (error) {
      console.log(error);
    }
  };
  const addingLessonToUser = async () => {
    // console.log({ lessonId });
    console.log('add lesson to user');
    // const requiredData = [...new Set([...userLessonData, { LessonTitle: id }])];
    const isMetaDataExisting = userLessonData.filter((details) => details.LessonTitle === id);
    const requiredData = [...userLessonData, { LessonTitle: id }];
    if (isMetaDataExisting.length > 0 || !metaDataId) return;
    console.log({ requiredData });
    const requestBody = {
      data: {
        data: requiredData,
      },
    };
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_METADATA_URL}/${metaDataId.id}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    } catch (error) {
      console.log(error);
    }
  };

  const addingUserProgress = async () => {
    // controller.abort();
    console.log('add user to data');

    const requestBody = {
      data: {
        users: {
          connect: [UserData.id],
        },
        data: [
          {
            LessonTitle: id,
          },
        ],
      },
    };

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_METADATA_URL,
        requestBody,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    // const isMetaDataExisting = userLessons.filter((details) => details.LessonTitle === id);
    // if (!metaDataId) {
    //   console.log('1');
    //   console.log('lesson_1', id);
    //   // addingUserProgress();
    //   // refetch();
    // } else {
    //   // setMetaData([...metaData, { LessonTitle: lesson.title }]);
    //   console.log('2');
    //   console.log('lesson_2', id);
    //   addingLessonToUser();
    // }
    // addToLessons(debouncedValue);
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));

  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

  const drawerBleeding = 56;

  const totalLessons = units?.reduce(
    (count, unit) => (unit.attributes.lesson ? count + unit.attributes.lesson.length : count),
    0
  );

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

            <Typography
              variant="h2"
              component="h1"
              // onClick={() => handleClick()}
            >
              {title}
            </Typography>

            <Typography variant="h5">{subtitle}</Typography>
          </Stack>

          <Divider sx={{ mb: 6 }} />

          <Markdown content={content} />

          {/* <PostTags tags={tags} /> */}

          {/* <PostSocialsShare /> */}
        </Grid>
      </Grid>
    </Container>
  );

  const unitList = units?.map((unit, index) => {
    const idx = units?.findIndex((unitData) => unitData.id === searchParams.get('unit'));
    return (
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
            // maxWidth: 450,
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
            sx={{ ml: 2, minHeight: 16, minWidth: 16 }}
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

            lesson.unLocked = true;
            // const filterData = metaData?.filter((l) => l.LessonTitle !== lesson?.title);
            // const hasMatch = Boolean(userLessons.find((a) => a.LessonTitle === id));

            const hasMatch = Boolean(userLessonData.find((a) => a.LessonTitle === lesson.id));
            // console.log({ hasMatch });

            return (
              <Link
                component={RouterLink}
                href={`?unit=${unit.id}&lesson=${lesson.title}`}
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
                  <Typography sx={{ mr: 2, ...(selected && { color: 'primary.main' }) }}>
                    <NumberDone
                      index={value}
                      sx={{ ml: 2 }}
                      lessonComplete={hasMatch}
                      // lessonComplete={metaData?.filter((l) => l.LessonTitle === lesson?.title)}
                    />
                  </Typography>

                  <ListItemText
                    // onClick={() => handleClick(lesson)}
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
    );
  });

  const renderListDesktop = (
    <Stack
      spacing={0.5}
      sx={{
        p: 1,
        overflowY: 'scroll',
        // width: { xs: 1, md: '44%' },
        maxWidth: 450,
        height: 1,
        mt: 8,
      }}
    >
      {unitList}
    </Stack>
  );

  const renderListMobile = (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            {units.length} units, {totalLessons} lessons
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {unitList}
        </StyledBox>
      </SwipeableDrawer>
    </>
  );

  return (
    <Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={{ height: 1, overflow: 'hidden' }}>
      <Link
        component={RouterLink}
        href="../"
        color="inherit"
        sx={{ position: 'fixed', top: 3, left: 24, zIndex: 9 }}
      >
        <Logo />
      </Link>
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
      {!!lessonData && renderLesson}
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
  // open: PropTypes.bool,
  playing: PropTypes.bool,
  selectedLesson: PropTypes.object,
  units: PropTypes.array,
  // pauseVideo: PropTypes.func,
  hasBoughtCourse: PropTypes.bool,
};
