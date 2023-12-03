import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonItem({
  quizIcon,
  handleClickOpen,
  questionsLength,
  isTest,
}) {
  const icon = isTest ? 'material-symbols:quiz-outline' : 'carbon:play';

  return (
    <Accordion
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          borderRadius: 0,
        },
      }}
      onClick={handleClickOpen}
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
        {quizIcon ? (
          <img src="/icons/note.svg" alt="quiz" height={20} width={20} />
        ) : (
          <Iconify width={24} icon={icon} />
        )}

        <Typography
          variant="subtitle1"
          sx={{
            pl: 2,
            flexGrow: 1,
          }}
        >
          Start Test
        </Typography>

        <Typography variant="body2">{questionsLength} questions</Typography>

        <Iconify icon="carbon:chevron-right" sx={{ ml: 2 }} />
      </AccordionSummary>
    </Accordion>
  );
}

ElearningCourseDetailsLessonItem.propTypes = {
  quizIcon: PropTypes.bool,
  handleClickOpen: PropTypes.func,
  questionsLength: PropTypes.number,
  isTest: PropTypes.bool,
};
