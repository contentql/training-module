import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function QuestionCard(props) {
  const {
    question = {},
    questionNumber,
    submitAnswer,
    goToPrevious,
    selectedValue,
    goToNext,
    islastQuestion,
    areAllAnswersMarked,
    handleSubmitPopupToggle,
  } = props;
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const handleChangeRadio = (e) => {
    setValue(e.target.value);
  };
  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      setValue((prev) => {
        if (!prev) return [e.target.value];
        if (prev.includes(e.target.value)) return prev;
        return [...prev, e.target.value];
      });
    } else {
      setValue((prev) => {
        if (!prev) return null;
        return prev.filter((p) => p !== e.target.value);
      });
    }
  };

  const handlePreview = () => {
    goToPrevious();
  };

  const handleNext = () => {
    goToNext();
  };

  const handleSubmit = () => {
    submitAnswer(questionNumber - 1, value);
    setValue(null);
  };

  const colorMap = {
    Prev: 'secondary',
    Submit: 'info',
    Next: 'warning',
    'Submit Quiz': 'success',
  };

  return (
    <Box className="w-full h-full pb-10 lg:pb-0 md:px-5" md={7}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Question {questionNumber}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {question.title}
          </Typography>

          <FormControl disabled={Boolean(selectedValue)}>
            {typeof question.correctAnswer === 'object' ? (
              <FormGroup name="checkbox-group-quiz" value={value} onChange={handleChangeCheckbox}>
                {question.options.map((o, i) => (
                  <FormControlLabel
                    key={i + 1}
                    value={o.option}
                    control={<Checkbox />}
                    label={o.option}
                  />
                ))}
              </FormGroup>
            ) : (
              <RadioGroup name="radio-group-quiz" value={value} onChange={handleChangeRadio}>
                {question.options.map((o, i) => (
                  <FormControlLabel
                    key={i + 1}
                    value={o.option}
                    control={<Radio />}
                    label={o.option}
                  />
                ))}
              </RadioGroup>
            )}
          </FormControl>
        </CardContent>
        <CardActions className="w-full">
          <Button
            disabled={questionNumber === 1}
            onClick={handlePreview}
            variant="outlined"
            size="small"
            className="w-1/2"
            color={colorMap.Prev}
          >
            Prev
          </Button>
          {!selectedValue ? (
            <Button
              disabled={!value}
              className="w-1/2"
              onClick={handleSubmit}
              variant="outlined"
              size="small"
              color={colorMap.Submit}
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={areAllAnswersMarked && islastQuestion ? handleSubmitPopupToggle : handleNext}
              className="w-1/2"
              variant="outlined"
              size="small"
              color={islastQuestion ? colorMap['Submit Quiz'] : colorMap.Next}
              disabled={islastQuestion && !areAllAnswersMarked}
            >
              {islastQuestion ? 'Submit Quiz' : 'Next'}
              {islastQuestion && areAllAnswersMarked && (
                <div className="absolute top-50 left-50">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  </span>
                </div>
              )}
            </Button>
          )}
        </CardActions>
        {Boolean(selectedValue) && (
          <>
            <Box sx={{ px: 1, pt: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: 'grey.300',
                  p: 2,
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'grey.600',
                  borderRadius: 1,
                }}
              >
                Correct Answer (option ):
                <strong>
                  {Array.isArray(question.correctAnswer)
                    ? question.correctAnswer.join(', ')
                    : question.correctAnswer}
                </strong>
              </Typography>
            </Box>
            <Box sx={{ px: 1, pt: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: 'grey.300',
                  p: 2,
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'grey.600',
                  borderRadius: 1,
                }}
              >
                Description :<strong>{question?.description}</strong>
              </Typography>
            </Box>
          </>
        )}
      </Card>
    </Box>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  goToPrevious: PropTypes.func.isRequired,
  selectedValue: PropTypes.number,
  goToNext: PropTypes.func.isRequired,
  islastQuestion: PropTypes.bool,
  areAllAnswersMarked: PropTypes.bool,
  handleSubmitPopupToggle: PropTypes.func,
};
