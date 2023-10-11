import { useState } from 'react';
import PropTypes from 'prop-types';

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
  const isCorrectAnswer = answers[index] === question.correctAnswer;

  let colors = '';
  if (answers[index]) {
    if (isCorrectAnswer) {
      colors = 'bg-green-100 text-green-800';
    } else {
      colors = 'bg-red-100 text-red-800';
    }
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={onExpanded}
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          bgcolor: 'inherit',
          color: 'inherit',
        },
      }}
      onClick={() => goToIndex(index)}
    >
      <div className={`rounded ${colors}`}>
        <AccordionSummary
          sx={{
            px: 1,
            minHeight: 64,
            [`& .${accordionSummaryClasses.content}`]: {
              p: 0,
              m: 0,
            },
          }}
          className={colors}
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

          {answers[index] && (
            <Iconify icon={expanded ? 'carbon:chevron-down' : 'carbon:chevron-right'} />
          )}
        </AccordionSummary>
      </div>

      <AccordionDetails
        sx={{
          p: 2,
          typography: 'body',
        }}
      >
        Correct Answer:{' '}
        {Array.isArray(question.correctAnswer)
          ? question.correctAnswer.join(', ')
          : question.correctAnswer}
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
