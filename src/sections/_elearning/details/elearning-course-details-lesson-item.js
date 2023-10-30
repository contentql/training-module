import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonItem({
  lesson,
  expanded,
  selected,
  onSelected,
  onExpanded,
  hasBoughtCourse,
}) {
  const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';
  lesson.unLocked = true;

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
      disabled={!hasBoughtCourse || !lesson.unLocked}
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
          <Iconify width={24} icon={playIcon} onClick={hasBoughtCourse && onSelected} />
        ) : (
          <img src="/icons/lock.svg" alt="lesson" />
        )}

        <Typography
          variant="subtitle1"
          sx={{
            pl: 2,
            flexGrow: 1,
          }}
        >
          {lesson.title}
        </Typography>

        <Typography variant="body2">{lesson.time} m</Typography>

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
  onExpanded: PropTypes.func,
  onSelected: PropTypes.func,
  selected: PropTypes.bool,
  hasBoughtCourse: PropTypes.bool,
};
