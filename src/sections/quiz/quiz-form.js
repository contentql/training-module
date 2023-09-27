'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import QuizHookForm from './quiz-hook-form';

export default function QuizForm() {
  const [open, setOpen] = useState(false);

  const mdUp = useResponsive('up', 'md');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiCard-root': {
      padding: theme.spacing(2),
      width: '100%',
      height: '100%',
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .css-18d06lz-MuiPaper-root-MuiDialog-paper': {
      minWidth: '600px',
    },
  }));

  const bootstrapDialogProperties = {
    mobile: {
      fullWidth: true,
    },
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Start Test
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        {...bootstrapDialogProperties[!mdUp && 'mobile']}
      >
        <QuizHookForm />
      </BootstrapDialog>
    </>
  );
}
