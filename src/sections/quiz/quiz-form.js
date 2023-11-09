'use client';

import { useState } from 'react';
import { PropTypes } from 'prop-types';

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';
import ElearningCourseDetailsLessonItem from 'src/sections/_elearning/details/elearning-course-details-quiz-item';

import QuizHookForm from './quiz-hook-form';
import { shuffleArray } from './utils/shuffle-array';

export default function QuizForm(props) {
  const { _questions, hasBoughtCourse, courseName, score } = props;

  const [quizOpen, setOpen] = useState(false);

  // const questions = shuffleArray(_questions);

  // questions.forEach((question) => {
  //   question.options = shuffleArray(question.options);
  // });

  const mdUp = useResponsive('up', 'md');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiCard-root': {
      padding: theme.spacing(2),
      width: '100%',
      height: '100%',
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    // '& .MuiDialog-container>.MuiPaper-root': mdUp && {
    //   minWidth: '600px',
    // },
  }));

  const bootstrapDialogProperties = {
    fullWidth: true,
  };

  return (
    <>
      <ElearningCourseDetailsLessonItem
        handleClickOpen={handleClickOpen}
        questionsLength={_questions.length}
        isTest
        quizIcon
      >
        <img src="src/icons/note.svg" alt="quiz" height={20} width={20} />
        Start Test
      </ElearningCourseDetailsLessonItem>
      <BootstrapDialog
        fullScreen
        aria-labelledby="customized-dialog-title"
        open={hasBoughtCourse && quizOpen}
        maxWidth="lg"
        {...(!mdUp && bootstrapDialogProperties)}
      >
        <QuizHookForm
          questions={_questions}
          courseName={courseName}
          handleModalClose={handleModalClose}
          score={score}
        />
      </BootstrapDialog>
    </>
  );
}

QuizForm.propTypes = {
  _questions: PropTypes.array,
  hasBoughtCourse: PropTypes.bool,
  courseName: PropTypes.any,
  score: PropTypes.bool,
};
