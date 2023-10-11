import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsQuestionSubmit({ answers, submitQuiz }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const handlePopupToggle = () => {
    setPopupOpen((prev) => !prev);
  };

  return (
    <Accordion
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          bgcolor: 'inherit',
          color: 'inherit',
        },
      }}
      onClick={handlePopupToggle}
      className="flex justify-end align-center"
    >
      <AccordionSummary
        sx={{
          px: 1,
          minHeight: 64,
          [`& .${accordionSummaryClasses.content}`]: {
            p: 0,
            m: 0,
          },
        }}
      >
        {/* <Iconify width={24} icon="formkit:submit" /> */}

        <Button onClick={submitQuiz} variant="outlined" color="success">
          Submit Quiz
          {answers[answers.length - 1] && (
            <div className="absolute top-50 left-50">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" /> */}
              </span>
            </div>
          )}
        </Button>
      </AccordionSummary>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={popupOpen}
        onClick={handlePopupToggle}
      >
        <Dialog open={popupOpen} onClose={handlePopupToggle} aria-describedby="popup-confirmation">
          <DialogTitle>Submit Quiz?</DialogTitle>
          <DialogContent>
            <DialogContentText id="popup-confirmation">
              All the questions will be submitted and Result will be displayed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupToggle} variant="outlined">
              Continue Quiz
            </Button>
            <Button onClick={submitQuiz} variant="outlined" color="success">
              Submit Quiz
            </Button>
          </DialogActions>
        </Dialog>
      </Backdrop>
    </Accordion>
  );
}

ElearningCourseDetailsQuestionSubmit.propTypes = {
  answers: PropTypes.array,
  submitQuiz: PropTypes.func,
};
