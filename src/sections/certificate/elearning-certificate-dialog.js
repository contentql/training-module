'use client';

import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
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

import { getCertificateData } from 'src/queries/certificates';
import Certificate from 'src/sections/certificate/certificate';

// ----------------------------------------------------------------------

export default function ElearningCertificateDialog({ open, handleClose, certificateData }) {
  const targetRef = useRef();
  // const { data: certificateNames } = useQuery({
  //   queryKey: ['certificateNames'],
  //   queryFn: getCertificateData,
  // });

  const { data: certificateNames } = useQuery('certificateNames', getCertificateData);

  console.log('certificateNames', certificateNames);

  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePDF = async () => {
    try {
      setIsLoading(true);

      await generatePDF(targetRef, {
        filename: `${certificateData?.attributes.username}_${certificateData?.attributes.courseTitle}_Certificate.pdf`,
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
            {certificateNames && (
              <Certificate
                certificateData={certificateData}
                certificateNames={certificateNames.data[0].attributes.certificate}
              />
            )}
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
