'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import ElearningCourseDetailsQuestionList from 'src/sections/_elearning/details/elearning-course-details-question-item';

import Result from './result';
import QuestionCard from './question-card';

// ----------------------------------------------------------------------

export default function QuizHookForm(props) {
  const { questions, handleModalClose } = props;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([...Array(questions.length)]);
  const finishedQuiz = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const areAllAnswersMarked = finishedQuiz || answers.every((answer) => answer !== undefined);

  const goToPrevious = () => {
    setCurrentQuestionIndex((prevState) => prevState - 1);
  };

  const goToNext = () => {
    setCurrentQuestionIndex((prevState) => prevState + 1);
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

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        onClick={areAllAnswersMarked ? handleModalClose : handleSnackbarOpen}
        aria-label="close"
      >
        <Iconify icon="mdi:close" className="absolute left-5 top-3 z-10" />
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Please Submit All Answers
          </Alert>
        </Snackbar>
      </IconButton>
      <div className="p-5 h-full">
        {finishedQuiz ? (
          <Result restartQuiz={restartQuiz} answers={answers} questions={questions} />
        ) : (
          <Card variant="outlined">
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
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Card>
        )}
      </div>
    </>
  );
}

QuizHookForm.propTypes = {
  questions: PropTypes.array.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
