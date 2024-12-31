// components/CustomAlert.tsx
import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface CustomAlertProps {
  severity: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ severity, title, message }) => {
  return (
    <Alert severity={severity} className="mb-4">
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export default CustomAlert;
