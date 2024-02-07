'use client';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// import Certificate from 'src/sections/certificate/certificate';
import NewCertificate from 'src/sections/certificate/NewCerficate';

// ----------------------------------------------------------------------

export default function ElearningCertificateDialog({ open, handleClose, certificateData }) {
  const targetRef = useRef();

  const certificatesUsername = JSON.parse(localStorage.getItem('user-data'));

  console.log('certificatesUsername', certificatesUsername.state.newUserName);

  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePDF = async () => {
    try {
      setIsLoading(true);

      await generatePDF(targetRef, {
        filename: `${certificatesUsername?.state.newUserName}_${certificateData?.attributes.courseTitle}_Certificate.pdf`,
        method: 'download',
        resolution: Resolution.HIGH,
        format: 'letter',
        page: { orientation: 'landscape', margin: Margin.NONE },
        canvas: {
          mimeType: 'image/png',
          qualityRatio: 1,
        },
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsLoading(false);
    }
  };

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
              sx={{ position: 'fixed', top: 8, left: 26, zIndex: 999 }}
            >
              <CloseIcon />
            </IconButton>
            <LoadingButton
              autoFocus={false}
              loading={isLoading}
              sx={{
                position: 'fixed',
                bottom: 14,
                right: 40,
                zIndex: 999,
                cursor: 'pointer',
                borderRadius: '999px',
                backgroundColor: (theme) => `${theme.palette.error.main}30`,
                '&:hover': {
                  backgroundColor: (theme) => `${theme.palette.error.main}50`,
                },
              }}
              size="large"
              variant="contained"
              onClick={handleGeneratePDF}
              className={`${isLoading ? '' : 'animate-bounce'} hover:animate-none`}
            >
              {!isLoading && <FileDownloadIcon color="error" />}
            </LoadingButton>
          </Stack>
          <Stack ref={targetRef}>
            <NewCertificate certificateData={certificateData} />
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
