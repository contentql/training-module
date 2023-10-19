import { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Quiz from 'src/sections/quiz';
import Iconify from 'src/components/iconify';

import ElearningCourseDetailsLessonList from './elearning-course-details-lesson-list';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsUnitItem({ unit, index, units }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
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
          {unit.title}
        </Typography>

        <Iconify icon={expanded ? 'carbon:chevron-down' : 'carbon:chevron-right'} sx={{ ml: 2 }} />
      </AccordionSummary>

      <AccordionDetails
        sx={{
          p: 2,
          typography: 'body',
          color: 'text.secondary',
        }}
        className="ml-10"
      >
        <ElearningCourseDetailsLessonList lessons={unit.lessons} units={units} />
        <Quiz _questions={unit.questions} />
      </AccordionDetails>
    </Accordion>
  );
}

ElearningCourseDetailsUnitItem.propTypes = {
  unit: PropTypes.object,
  index: PropTypes.number,
  units: PropTypes.array,
};
