'use client';

import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { quizProgress } from 'src/states/quiz-progress';
import { useResponsive } from 'src/hooks/use-responsive';
import ElearningCourseDetailsLessonItem from 'src/sections/_elearning/details/elearning-course-details-quiz-item';

import QuizHookForm from './quiz-hook-form';
import { shuffleArray } from './utils/shuffle-array';

export default function QuizForm(props) {
  const currentDate = new Date();

  const { _questions, hasBoughtCourse, courseName, score, finalQuiz, title } = props;

  const [quizOpen, setOpen] = useState(false);

  const [startTime, setStartTime] = useState(0);

  const [popupOpen, setPopupOpen] = useState(false);

  const inputRef = useRef();

  const toggleQuiz = quizProgress((state) => state.toggleQuiz);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const questions = shuffleArray(_questions).slice(0, 10);

  questions.forEach((question) => {
    question.options = shuffleArray(question.options);
  });

  const mdUp = useResponsive('up', 'md');

  const handleClickOpen = () => {
    if (hasBoughtCourse) {
      toggleQuiz(true);
      setOpen(true);
      setStartTime(currentDate.toLocaleString());
    } else
      toast.error('Please buy the course to start the test', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
  };
  const handleModalClose = () => {
    toggleQuiz(false);
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
        handleClickOpen={() => {
          if (finalQuiz) handlePopupOpen();
          else handleClickOpen();
        }}
        questionsLength={questions?.length}
        isTest
        quizIcon
        finalQuiz
        title={title}
      />
      {/* <img src="src/icons/note.svg" alt="quiz" height={20} width={20} />
        Start Test
      </ElearningCourseDetailsLessonItem> */}
      {/* {finalQuiz && ( */}
      <Dialog open={popupOpen} onClose={handlePopupClose}>
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To successfully finish the course, a minimum score of 70% is required.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handlePopupClose();
              handleClickOpen();
            }}
            color="primary"
            variant="outlined"
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      {/* )} */}
      <BootstrapDialog
        fullScreen
        aria-labelledby="customized-dialog-title"
        open={hasBoughtCourse && quizOpen}
        maxWidth="lg"
        {...(!mdUp && bootstrapDialogProperties)}
      >
        <QuizHookForm
          questions={questions}
          courseName={courseName}
          handleModalClose={handleModalClose}
          startTime={startTime}
          score={score}
          name={inputRef.current}
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
  finalQuiz: PropTypes.bool,
  title: PropTypes.string,
};
