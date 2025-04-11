
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type SubmitButtonProps = {
  isSubmitting: boolean;
  isDirty: boolean;
  label: string;
  loadingLabel: string;
};

const SubmitButton = ({ 
  isSubmitting, 
  isDirty,
  label,
  loadingLabel
}: SubmitButtonProps) => {
  const { t } = useLanguage();
  
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={isSubmitting || !isDirty}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default SubmitButton;
