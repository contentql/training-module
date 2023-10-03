'use client';

import { useState } from 'react';
import { PropTypes } from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';
import ElearningCourseDetailsLessonItem from 'src/sections/_elearning/details/elearning-course-details-quiz-item';

import QuizHookForm from './quiz-hook-form';
import { shuffleArray } from './utils/shuffle-array';

export default function QuizForm(props) {
  const { _questions } = props;

  const [open, setOpen] = useState(false);

  const questions = shuffleArray(_questions).slice(0, Math.max(5, _questions.length / 2));

  questions.forEach((question) => {
    question.options = shuffleArray(question.options);
  });

  const mdUp = useResponsive('up', 'md');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
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
    '& .MuiDialog-container>.MuiPaper-root': {
      minWidth: '600px',
    },
  }));

  const bootstrapDialogProperties = {
    mobile: {
      fullWidth: true,
    },
  };

  return (
    <>
      <ElearningCourseDetailsLessonItem
        handleClickOpen={handleClickOpen}
        questionsLength={questions.length}
      >
        Start Test
      </ElearningCourseDetailsLessonItem>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        {...bootstrapDialogProperties[!mdUp && 'mobile']}
      >
        <QuizHookForm questions={questions} />
      </BootstrapDialog>
    </>
  );
}

QuizForm.propTypes = {
  _questions: PropTypes.array.isRequired,
};
