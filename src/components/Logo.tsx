
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className, size = 'md' }: LogoProps) => {
  // Define sizes for different variants
  const sizes = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/c2eceea0-c911-4c28-9347-a9bb54323bf2.png" 
        alt="FAWOZ Logo" 
        className={`${sizes[size]} w-auto`}
      />
    </div>
  );
};

export default Logo;
