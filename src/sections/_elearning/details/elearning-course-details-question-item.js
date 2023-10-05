import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsQuestionList({
  question,
  answers,
  index,
  goToIndex,
}) {
  const [expanded, setExpanded] = useState(false);

  const onExpanded = () => {
    if (answers[index]) setExpanded(!expanded);
  };

  const playIcon = 'carbon:play';
  const isCorrectAnswer =
    answers[index] && answers[index] === question.correctAnswer ? 'success' : 'error';

  return (
    <Accordion
      expanded={expanded}
      onChange={onExpanded}
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          borderRadius: 0,
        },
        bgcolor: `${isCorrectAnswer}`,
      }}
      onClick={() => goToIndex(index)}
      className="w-full"
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
        <Iconify width={24} icon={playIcon} />

        <Typography
          variant="subtitle1"
          sx={{
            pl: 2,
            flexGrow: 1,
          }}
        >
          <p className="line-clamp-1 w-5/6">{question.title}</p>
        </Typography>

        <Typography variant="body2">{question.duration} m</Typography>

        <Iconify icon={expanded ? 'carbon:chevron-down' : 'carbon:chevron-right'} sx={{ ml: 2 }} />
      </AccordionSummary>

      <AccordionDetails
        sx={{
          p: 2,
          typography: 'body',
          color: 'text.secondary',
        }}
      >
        {question.correctAnswer}
      </AccordionDetails>
    </Accordion>
  );
}

ElearningCourseDetailsQuestionList.propTypes = {
  question: PropTypes.object,
  answers: PropTypes.array,
  index: PropTypes.number,
  goToIndex: PropTypes.func,
};
