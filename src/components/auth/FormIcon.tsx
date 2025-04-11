
import React from 'react';
import { cn } from '@/lib/utils';

type FormIconProps = {
  icon: React.ReactNode;
  className?: string;
};

const FormIcon = ({ icon, className }: FormIconProps) => (
  <div className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", className)}>
    {icon}
  </div>
);

export default FormIcon;
