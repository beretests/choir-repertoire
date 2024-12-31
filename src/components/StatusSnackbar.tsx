// components/StatusSnackbar.tsx
import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface StatusSnackbarProps {
  status: 'success' | 'error' | null;
  message: string | null;
  onClose: () => void;
}

const StatusSnackbar: React.FC<StatusSnackbarProps> = ({ status, message, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status && message) {
      setOpen(true);
    }
  }, [status, message]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={status || 'info'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default StatusSnackbar;
