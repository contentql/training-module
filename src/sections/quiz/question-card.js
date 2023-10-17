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

  return (
    <Box className="w-full h-full pb-10 md:pb-0 md:px-5" md={7}>
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
                    value={o.description}
                    control={<Checkbox />}
                    label={o.description}
                  />
                ))}
              </FormGroup>
            ) : (
              <RadioGroup name="radio-group-quiz" value={value} onChange={handleChangeRadio}>
                {question.options.map((o, i) => (
                  <FormControlLabel
                    key={i + 1}
                    value={o.description}
                    control={<Radio />}
                    label={o.description}
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
              Submit & Next
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
  goToPrevious: PropTypes.func.isRequired,
  selectedValue: PropTypes.number,
  goToNext: PropTypes.func.isRequired,
};
