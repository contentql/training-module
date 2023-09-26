'use client';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { lightBlue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Container, CssBaseline } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CircularProgress from '@mui/material/CircularProgress';

import questions from 'src/_mock/_questions';

import Result from './result';
import QuestionCard from './question-card';
// ----------------------------------------------------------------------

export default function QuizHookForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const finishedQuiz = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const goToPrevious = () => {
    setCurrentQuestionIndex((prevState) => prevState - 1);
  };

  const goToNext = () => {
    setCurrentQuestionIndex((prevState) => prevState + 1);
  };

  const submitAnswer = (value) => {
    setAnswers((prevState) => [...prevState, value]);
    goToNext();
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <>
      {finishedQuiz ? (
        <Result restartQuiz={restartQuiz} answers={answers} />
      ) : (
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          submitAnswer={submitAnswer}
          islastQuestion={currentQuestionIndex + 1 === questions.length}
          goToPrevious={goToPrevious}
          selectedValue={answers[currentQuestionIndex] || null}
          goToNext={goToNext}
        />
      )}
    </>
  );
}
