import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { areArraysEqual } from '@mui/base';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  List,
  Card,
  Button,
  Divider,
  Accordion,
  Typography,
  CardContent,
  CardActions,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

const Result = ({ answers, restartQuiz, questions }) => {
  const correctAnswers = useMemo(
    () =>
      questions.filter((q, i) =>
        typeof answers[i] === 'object'
          ? areArraysEqual(q.correctAnswer, answers[i])
          : q.correctAnswer === answers[i]
      ).length,
    [answers, questions]
  );

  const percentage = (correctAnswers / questions.length) * 100;
  let message = '';
  let messageColor = '';

  if (percentage === 100) {
    message = 'Congratulations! You got all the answers correct!';
    messageColor = 'success.main';
  } else if (percentage >= 75) {
    message = 'Great job! You performed well in the quiz.';
    messageColor = 'info.main';
  } else if (percentage >= 50) {
    message = 'Not bad! You passed, but there is room for improvement.';
    messageColor = 'warning.main';
  } else {
    message = 'Oops! You might want to review the material and try again.';
    messageColor = 'error.main';
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2, boxShadow: 3 }}>
      <CardContent sx={{ textAlign: 'center', backgroundColor: 'background.default' }}>
        <Typography variant="h3" gutterBottom>
          Result
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: 'divider' }} />
        <Typography variant="h5" gutterBottom>
          {correctAnswers} / {questions.length}
        </Typography>
        <Typography variant="body1" color={messageColor} sx={{ mt: 2, mb: 3 }}>
          {message}
        </Typography>
        <List sx={{ backgroundColor: 'background.paper' }}>
          {questions.map((q, i) => (
            <Accordion key={i} sx={{ my: 1 }}>
              <div
                className={`rounded ${
                  answers[i] === q.correctAnswer
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${i}-content`}
                  id={`panel${i}-header`}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                    {q.title}
                  </Typography>
                </AccordionSummary>
              </div>
              <AccordionDetails>
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Your answer: <strong>{answers[i]}</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Correct answer: <strong>{q.correctAnswer}</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Description: <strong>{q.description}</strong>
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'center',
          borderTop: '1px solid #ccc',
          p: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Button
          onClick={restartQuiz}
          sx={{ bgcolor: '#FF774B', color: 'white', '&:hover': { bgcolor: '#FF5722' } }}
          variant="contained"
        >
          Retry
        </Button>
      </CardActions>
    </Card>
  );
};

Result.propTypes = {
  answers: PropTypes.array.isRequired,
  restartQuiz: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

export default Result;
