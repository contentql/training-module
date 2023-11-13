import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { useState, useCallback } from 'react';

import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Iconify from 'src/components/iconify';
import NumberDone from 'src/components/NumberDone';
import { useQuery } from 'react-query';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonItem({
  index,
  lesson,
  expanded,
  selected,
  onSelected,
  onExpanded,
  hasBoughtCourse,
}) {
  console.log({ lesson });
  const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';

  // async function addLessonToUserProgress(itemId) {
  //   const requestBody = {
  //     data: {
  //       username: UserData.username,
  //       courseTitle: courseName.title,
  //       score: String(correctAnswers),
  //       email: UserData.email,
  //     },
  //   };
  //   try {
  //     const response = await fetch(process.env.NEXT_PUBLIC_QUIZ_SCORE, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const [lessonComplete, setLessonComplete] = useState(false);

  lesson.unLocked = true;

  const styles = {
    pl: '2px',
    flexGrow: 1,
    // textDecoration: 'none',
    // '&:hover': {
    //   color: 'white',
    // },
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (!hasBoughtCourse) {
      toast.error('Please buy the course to view the content', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      onExpanded();
    }
  };

  // eslint-disable-next-line no-shadow
  const handleSelectedLesson = () => {
    if (hasBoughtCourse) {
      setLessonComplete(true);
    }
    onSelected();
  };

  return (
    <Accordion
      expanded={hasBoughtCourse && expanded}
      onChange={handleChange}
      disabled={!lesson.unLocked}
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          borderRadius: 0,
        },
      }}
    >
      <AccordionSummary
        sx={{
          px: 1,
          minHeight: 64,
          [`& .${accordionSummaryClasses.content}`]: {
            p: 0,
            m: 0,
          },
          [`&.${accordionSummaryClasses.expanded}`]: {
            bgcolor: 'action.selected',
          },
        }}
      >
        {lesson.unLocked ? (
          <NumberDone index={index} lessonComplete={lessonComplete} />
        ) : (
          <img src="/icons/lock.svg" alt="lesson" />
        )}

        <Typography
          variant="subtitle1"
          sx={{
            pl: 2,
            // flexGrow: 1,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
          style={styles}
          onClick={handleSelectedLesson}
        >
          {lesson.title}
        </Typography>

        <Typography variant="body2">{lesson.time} minutes</Typography>

        <Iconify icon={expanded ? 'carbon:chevron-down' : 'carbon:chevron-right'} sx={{ ml: 2 }} />
      </AccordionSummary>

      <AccordionDetails
        sx={{
          p: 2,
          typography: 'body',
          color: 'text.secondary',
        }}
      >
        {lesson.subtitle}
      </AccordionDetails>
    </Accordion>
  );
}

ElearningCourseDetailsLessonItem.propTypes = {
  index: PropTypes.any,
  expanded: PropTypes.bool,
  lesson: PropTypes.object,
  onExpanded: PropTypes.func,
  onSelected: PropTypes.func,
  selected: PropTypes.bool,
  hasBoughtCourse: PropTypes.bool,
};
