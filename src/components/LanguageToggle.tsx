
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleLanguage}
      className="relative"
    >
      <Globe size={18} />
    </Button>
  );
};

export default LanguageToggle;
