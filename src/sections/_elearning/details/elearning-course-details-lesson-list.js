'use client';

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import { Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import ElearningCourseDetailsLessonItem from './elearning-course-details-lesson-item';
import ElearningCourseDetailsLessonsDialog from './elearning-course-details-lessons-dialog';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonList({ lessons, units, hasBoughtCourse }) {
  const videoPlay = useBoolean();

  const [expanded, setExpanded] = useState(false);

  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleReady = useCallback(() => {
    setTimeout(() => videoPlay.onTrue(), 500);
  }, [videoPlay]);

  const handleSelectedLesson = useCallback((lesson) => {
    if (lesson.unLocked) {
      setSelectedLesson(lesson);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelectedLesson(null);
    videoPlay.onFalse();
  }, [videoPlay]);

  const handleExpandedLesson = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const pauseVideo = useCallback(() => {
    videoPlay.onFalse();
  }, [videoPlay]);

  return (
    <div>
      {/* <Typography variant="h4" sx={{ mb: 3, color: '#FF774B' }}>
        Lessons
      </Typography> */}

      {lessons.map((lesson, index) => (
        <ElearningCourseDetailsLessonItem
          key={index}
          index={index}
          lesson={lesson}
          expanded={expanded === lesson.title}
          onExpanded={handleExpandedLesson(lesson.title)}
          selected={selectedLesson?.title === lesson.title}
          onSelected={() => {
            handleSelectedLesson(lesson);
          }}
          hasBoughtCourse={hasBoughtCourse}
        />
      ))}

      <ElearningCourseDetailsLessonsDialog
        selectedLesson={selectedLesson}
        onSelectedLesson={(lesson) => setSelectedLesson(lesson)}
        open={hasBoughtCourse && !!selectedLesson?.unLocked}
        onClose={handleClose}
        playing={videoPlay.value}
        onReady={handleReady}
        onEnded={videoPlay.onFalse}
        onPlay={videoPlay.onTrue}
        onPause={videoPlay.onFalse}
        units={units}
        pauseVideo={pauseVideo}
        hasBoughtCourse={hasBoughtCourse}
      />
    </div>
  );
}

ElearningCourseDetailsLessonList.propTypes = {
  lessons: PropTypes.array,
  units: PropTypes.array,
  hasBoughtCourse: PropTypes.bool,
};
