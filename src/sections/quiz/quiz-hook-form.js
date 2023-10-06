'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from 'src/components/iconify';
import ElearningCourseDetailsQuestionList from 'src/sections/_elearning/details/elearning-course-details-question-item';
import ElearningCourseDetailsQuestionSubmit from 'src/sections/_elearning/details/elearning-course-details-question-submit';

import Result from './result';
import QuestionCard from './question-card';

// ----------------------------------------------------------------------

export default function QuizHookForm(props) {
  const { questions, handleModalClose } = props;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([...Array(questions.length)]);
  const [finishedQuiz, setFinishedQuiz] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

  const [popupOpen, setPopupOpen] = useState(false);
  const handlePopupToggle = () => {
    setPopupOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log(popupOpen);
  }, [popupOpen]);

  const goToPrevious = () => {
    setCurrentQuestionIndex((prevState) => prevState - 1);
  };

  const goToNext = () => {
    if (currentQuestionIndex + 1 !== questions.length) {
      setCurrentQuestionIndex((prevState) => prevState + 1);
    }
  };

  const goToIndex = (index) => {
    setCurrentQuestionIndex(index);
  };

  const submitAnswer = (index, value) => {
    setAnswers((prevState) => {
      const newAnswers = [...prevState];
      newAnswers[index] = value;
      return newAnswers;
    });
    goToNext();
  };

  const submitQuiz = () => {
    setFinishedQuiz(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFinishedQuiz(false);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        onClick={finishedQuiz ? handleModalClose : handlePopupToggle}
        aria-label="close"
      >
        <Iconify icon="mdi:close" className="absolute left-5 top-3 z-10" />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={popupOpen}
          onClick={handlePopupToggle}
        >
          <Dialog
            open={popupOpen}
            onClose={handlePopupToggle}
            aria-describedby="popup-confirmation"
          >
            <DialogTitle>Close Quiz?</DialogTitle>
            <DialogContent>
              <DialogContentText id="popup-confirmation">
                You will lose all your progress if you close the quiz.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose} variant="outlined" color="error">
                Close
              </Button>
              <Button onClick={handlePopupToggle} variant="outlined">
                Continue Quiz
              </Button>
            </DialogActions>
          </Dialog>
        </Backdrop>
      </IconButton>
      <div className="p-5 h-full">
        {finishedQuiz ? (
          <Result restartQuiz={restartQuiz} answers={answers} questions={questions} />
        ) : (
          <Grid direction={{ xs: 'column', md: 'row' }} container className="h-full">
            <Grid item md={8}>
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                submitAnswer={submitAnswer}
                islastQuestion={currentQuestionIndex + 1 === questions.length}
                goToPrevious={goToPrevious}
                selectedValue={answers[currentQuestionIndex] || null}
                goToNext={goToNext}
              />
            </Grid>
            <Grid item md={4}>
              <Card variant="outlined">
                <Stack direction="column" className="w-full">
                  {questions.map((question, index) => (
                    <ElearningCourseDetailsQuestionList
                      key={question.id}
                      question={question}
                      answers={answers}
                      index={index}
                      goToIndex={goToIndex}
                    />
                  ))}
                  <ElearningCourseDetailsQuestionSubmit submitQuiz={submitQuiz} />
                </Stack>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}

QuizHookForm.propTypes = {
  questions: PropTypes.array.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
