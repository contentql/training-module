import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsQuestionSubmit({ submitQuiz }) {
  return (
    <Accordion
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          bgcolor: 'inherit',
          color: 'inherit',
        },
      }}
      onClick={() => submitQuiz()}
    >
      <AccordionSummary
        sx={{
          px: 1,
          minHeight: 64,
          [`& .${accordionSummaryClasses.content}`]: {
            p: 0,
            m: 0,
          },
        }}
      >
        <Iconify width={24} icon="formkit:submit" />

        <Typography
          variant="subtitle1"
          sx={{
            pl: 2,
            flexGrow: 1,
          }}
        >
          <p className="line-clamp-1 w-5/6">Submit Quiz</p>
        </Typography>

        <Iconify icon="carbon:chevron-right" />
      </AccordionSummary>
    </Accordion>
  );
}

ElearningCourseDetailsQuestionSubmit.propTypes = {
  submitQuiz: PropTypes.func,
};
