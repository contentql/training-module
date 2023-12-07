'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';
import generatePDF, { Margin } from 'react-to-pdf';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Certificate from 'src/sections/certificate/certificate';

// ----------------------------------------------------------------------

export default function ElearningCertificateDialog({ open, handleClose, certificateData }) {
  const targetRef = useRef();

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Stack>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ position: 'absolute', top: 2, left: 22, zIndex: 999 }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                top: 2,
                right: 2,
                zIndex: 999,
                '&:hover': {
                  backgroundColor: (theme) => `${theme.palette.error.main}30`,
                },
              }}
              size="large"
              variant="contained"
              onClick={() =>
                generatePDF(targetRef, {
                  filename: 'page.pdf',
                  method: 'download',
                  page: { orientation: 'landscape', margin: Margin.NONE },
                })
              }
            >
              <FileDownloadIcon color="error" />
            </IconButton>
          </Stack>
          <Stack ref={targetRef}>
            <Certificate certificateData={certificateData} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}

ElearningCertificateDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  certificateData: PropTypes.object,
};
