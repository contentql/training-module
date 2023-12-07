import { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Iconify from 'src/components/iconify';
import NumberDone from 'src/components/NumberDone';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsQuestionList({
  question,
  answers,
  index,
  goToIndex,
  isCurrentQuestion,
}) {
  const [expanded, setExpanded] = useState(false);

  const onExpanded = () => {
    if (answers[index]) setExpanded(!expanded);
  };
  const iconSize = 20;
  // const playIcon = 'carbon:play';
  const isCorrectAnswer = answers[index] === question.correctAnswer;

  let colors = '';
  if (answers[index]) {
    colors = isCorrectAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={onExpanded}
      sx={{
        bgcolor: isCurrentQuestion ? 'grey.300' : 'grey.200',
        [`&.${accordionClasses.expanded}`]: {
          bgcolor: 'grey.300',
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
          <div className="flex items-center">
            {/* <img
              src="/icons/play.svg"
              alt="quiz"
              height={iconSize}
              width={iconSize}
              className="mr-4"
            /> */}
            <NumberDone index={index} />

            <Typography
              variant="subtitle1"
              sx={{
                flexGrow: 1,
              }}
              className="line-clamp-1 w-5/6 pl-2"
            >
              {question.title}
            </Typography>

            {answers[index] && (
              <Iconify icon={expanded ? 'carbon:chevron-down' : 'carbon:chevron-right'} />
            )}
          </div>
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
  isCurrentQuestion: PropTypes.bool,
};
