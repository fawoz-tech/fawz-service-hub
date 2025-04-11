
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type ErrorAlertProps = {
  message: string;
};

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  if (!message) return null;
  
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
