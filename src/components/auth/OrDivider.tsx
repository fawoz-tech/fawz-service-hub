import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/language';

const OrDivider = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {t('auth.or_continue_with')}
        </span>
      </div>
    </div>
  );
};

export default OrDivider;
