import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsQuestionSubmit({
  areAllAnswersMarked,
  submitQuiz,
  submitPopupOpen,
  handleSubmitPopupToggle,
}) {
  return (
    <Accordion
      expanded
      onClick={() => {
        if (areAllAnswersMarked) handleSubmitPopupToggle();
      }}
      className="flex justify-end align-end"
    >
      <AccordionSummary
        sx={{
          px: 1,
          minHeight: 64,
        }}
      >
        <div className="flex flex-col">
          {!areAllAnswersMarked && (
            <div className="text-xs text-gray-400">Please submit all questions</div>
          )}

          {/* <Iconify width={24} icon="formkit:submit" /> */}

          <Button variant="outlined" color={areAllAnswersMarked ? 'success' : 'info'}>
            Submit Quiz
            {areAllAnswersMarked && (
              <div className="absolute top-50 left-50">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" /> */}
                </span>
              </div>
            )}
          </Button>
        </div>
      </AccordionSummary>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submitPopupOpen}
        onClick={handleSubmitPopupToggle}
      >
        <Dialog
          open={submitPopupOpen}
          onClose={handleSubmitPopupToggle}
          aria-describedby="popup-confirmation"
        >
          <DialogTitle>Submit Quiz?</DialogTitle>
          <DialogContent>
            <DialogContentText id="popup-confirmation">
              All the questions will be submitted and Result will be displayed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitPopupToggle} variant="outlined">
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
  areAllAnswersMarked: PropTypes.bool,
  submitQuiz: PropTypes.func,
  submitPopupOpen: PropTypes.bool,
  handleSubmitPopupToggle: PropTypes.func,
};
