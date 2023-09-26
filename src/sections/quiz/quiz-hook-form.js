'use client';

import { useState } from 'react';

import all_questions from 'src/_mock/_questions';

import Result from './result';
import QuestionCard from './question-card';
import { shuffleArray } from './utils/shuffle-array';
// ----------------------------------------------------------------------

export default function QuizHookForm() {
  const questions = shuffleArray(all_questions).slice(0, Math.max(5, all_questions.length / 2));

  questions.forEach((question) => {
    question.options = shuffleArray(question.options);
  });

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
