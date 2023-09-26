import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { areArraysEqual } from '@mui/base';
import { Card, Button, Typography, CardContent, CardActions } from '@mui/material';

export default function Result(props) {
  const { answers, restartQuiz, questions } = props;

  const correctAnswers = useMemo(
    () =>
      questions.filter((q, i) =>
        typeof answers[i] === 'object'
          ? areArraysEqual(q.correctAnswer, answers[i])
          : q.correctAnswer === answers[i]
      ).length,
    [answers, questions]
  );

  return (
    <Card variant="outlined" sx={{ pt: 3, pb: 3 }}>
      <CardContent>
        <Typography
          sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
          variant="h4"
          color="text.secondary"
        >
          Result
        </Typography>
        <Typography
          sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
          variant="h4"
          color="text.secondary"
        >
          {correctAnswers} / {questions.length}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={restartQuiz} variant="outlined">
          Retry
        </Button>
      </CardActions>
    </Card>
  );
}

Result.propTypes = {
  answers: PropTypes.array.isRequired,
  restartQuiz: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};
