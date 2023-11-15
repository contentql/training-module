import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import NumberDone from 'src/components/NumberDone';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonItem({
  lesson,
  expanded,
  index,
  selected,
  onSelected,
  onExpanded,
  hasBoughtCourse,
  unitId,
}) {
  const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';
  lesson.unLocked = true;

  const [lessonComplete, setLessonComplete] = useState(false);

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
          pr: 1,
          pl: 2,
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
          <NumberDone index={index} />
        ) : (
          <img src="/icons/lock.svg" alt="lesson" />
        )}
        <Link
          component={RouterLink}
          href={`lessons/?unit=${unitId}&lesson=${lesson.id}`}
          color="inherit"
          sx={{
            pl: 2,
            flexGrow: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              flexGrow: 1,
            }}
          >
            {lesson.title}
          </Typography>
        </Link>

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
  expanded: PropTypes.bool,
  lesson: PropTypes.object,
  index: PropTypes.any,
  onExpanded: PropTypes.func,
  onSelected: PropTypes.func,
  selected: PropTypes.bool,
  hasBoughtCourse: PropTypes.bool,
  unitId: PropTypes.number,
};
