'use client';

import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
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
import { useUserStore } from 'src/states/auth-store';
import { useResponsive } from 'src/hooks/use-responsive';
import ElearningCourseDetailsQuestionList from 'src/sections/_elearning/details/elearning-course-details-question-item';
import ElearningCourseDetailsQuestionSubmit from 'src/sections/_elearning/details/elearning-course-details-question-submit';

import Result from './result';
import QuestionCard from './question-card';

// ----------------------------------------------------------------------

export default function QuizHookForm(props) {
  const { questions, handleModalClose } = props;

  const { UserData } = useUserStore();

  console.log('userdata', UserData);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([...Array(questions.length)]);
  const [areAllAnswersMarked, setAreAllAnswersMarked] = useState(false);
  useEffect(() => {
    if (answers.filter((answer) => answer === undefined).length === 0) setAreAllAnswersMarked(true);
  }, [answers]);

  const [finishedQuiz, setFinishedQuiz] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

  const [popupOpen, setPopupOpen] = useState(false);
  const handlePopupToggle = () => {
    setPopupOpen((prev) => !prev);
  };

  const mdUp = useResponsive('up', 'md');
  const submitButtonScrollStyles = mdUp
    ? { maxHeight: '70vh', overflowY: 'scroll' }
    : { maxHeight: '30vh', overflowY: 'scroll' };

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

  const userToken = localStorage.getItem('token');

  async function addScoreToStrapi(itemId) {
    const requestBody = {
      data: {
        username: UserData.username,
        courseTitle: UserData.email,
        score: '9',
        email: UserData.email,
      },
    };
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_QUIZ_SCORE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const submitQuiz = () => {
    setFinishedQuiz(true);
    addScoreToStrapi();
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([...Array(questions.length)]);
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
      <div className="p-5">
        {finishedQuiz ? (
          <Result restartQuiz={restartQuiz} answers={answers} questions={questions} />
        ) : (
          <Grid direction={{ xs: 'column-reverse', md: 'row' }} container className="h-full">
            <Grid item md={4}>
              <Card variant="outlined">
                <Stack direction="column">
                  <Box className="mb-2">
                    <span className="text-lg font-bold">Questions</span>
                    <Box className="flex items-center">
                      <div className="bg-green-200 rounded-full h-4 w-4 mr-2" />
                      <span>Correct Answer</span>
                      <div className="bg-red-200 rounded-full h-4 w-4 mx-2" />
                      <span>Wrong Answer</span>
                    </Box>
                    <Box className="flex items-center">
                      <div className="bg-gray-200 rounded-full h-4 w-4 mr-2" />
                      <span>Unattempted</span>
                    </Box>
                  </Box>
                  <Box
                    style={submitButtonScrollStyles}
                    sx={{
                      scrollbarWidth: 'thin',
                      '&::-webkit-scrollbar': {
                        width: '0.2em',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                    }}
                  >
                    {questions.map((question, index) => (
                      <ElearningCourseDetailsQuestionList
                        key={question.id}
                        question={question}
                        answers={answers}
                        index={index}
                        goToIndex={goToIndex}
                        isCurrentQuestion={currentQuestionIndex === index}
                      />
                    ))}
                  </Box>
                  <ElearningCourseDetailsQuestionSubmit
                    areAllAnswersMarked={areAllAnswersMarked}
                    submitQuiz={submitQuiz}
                  />
                </Stack>
              </Card>
            </Grid>

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
