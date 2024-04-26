import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function AutoHideSnackbar({ open, setOpen, message, duration }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

  return (
    <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={message}
    />
  );
}