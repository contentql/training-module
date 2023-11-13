import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import NumberDone from 'src/components/NumberDone';

const ElearningCourseDetailsLessonsDailogList = ({ lesson, selected, handleClick, index }) => {
  const [lessonComplete, setLessonComplete] = useState(false);

  return (
    <ListItemButton
      key={lesson.title}
      selected={selected}
      disabled={!lesson.unLocked}
      // onClick={() => onSelectedLesson(lesson)}
      onClick={() => {
        handleClick(lesson);
        setLessonComplete(true);
      }}
      sx={{ borderRadius: 1, maxHeight: '6rem' }}
    >
      <Typography sx={{ mr: 2, ...(selected && { color: 'primary.main' }) }}>
        <NumberDone index={index} lessonComplete={lessonComplete} />
      </Typography>

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
};

export default ElearningCourseDetailsLessonsDailogList;

ElearningCourseDetailsLessonsDailogList.propTypes = {
  handleClick: PropTypes.func,
  lesson: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
};
