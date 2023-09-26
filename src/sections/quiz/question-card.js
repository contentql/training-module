import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
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
    islastQuestion,
    goToPrevious,
    selectedValue,
    goToNext,
  } = props;
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const handleChangeRadio = (e) => {
    setValue(e.target.value);
  };

  const handlePreview = () => {
    goToPrevious();
  };

  const handleNext = () => {
    goToNext();
  };

  const handleSubmit = () => {
    submitAnswer(value);
    setValue(null);
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Question {questionNumber}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {question.title}
          </Typography>

          <FormControl disabled={Boolean(selectedValue)}>
            <RadioGroup name="radio-group-quiz" value={value} onChange={handleChangeRadio}>
              {question.options.map((o, i) => (
                <FormControlLabel
                  key={i + 1}
                  value={i + 1}
                  control={<Radio />}
                  label={o.description}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardActions className="w-full">
          <Button
            disabled={questionNumber === 1}
            onClick={handlePreview}
            variant="outlined"
            size="small"
            className="w-1/2"
          >
            Preview
          </Button>
          {!selectedValue ? (
            <Button
              disabled={!value}
              className="w-1/2"
              onClick={handleSubmit}
              variant="outlined"
              size="small"
            >
              {islastQuestion ? 'Submit Quiz' : 'Submit & Next'}
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-1/2" variant="outlined" size="small">
              Next
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  islastQuestion: PropTypes.bool.isRequired,
  goToPrevious: PropTypes.func.isRequired,
  selectedValue: PropTypes.number,
  goToNext: PropTypes.func.isRequired,
};
