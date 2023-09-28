'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

import Result from './result';
import QuestionCard from './question-card';
// ----------------------------------------------------------------------

export default function QuizHookForm(props) {
  const { questions } = props;

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
        <Result restartQuiz={restartQuiz} answers={answers} questions={questions} />
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

QuizHookForm.propTypes = {
  questions: PropTypes.array.isRequired,
};
