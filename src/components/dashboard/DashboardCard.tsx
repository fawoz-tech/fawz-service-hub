
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkHref: string;
  color: string;
}

const DashboardCard = ({
  title,
  value,
  description,
  icon,
  linkText,
  linkHref,
  color
}: DashboardCardProps) => {
  const { isRTL } = useLanguage();
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-md ${color}`}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-secondary-900">{value}</div>
        <div className="text-sm text-secondary-600 mb-4 line-clamp-1">{description}</div>
        <Button variant="link" className="text-primary-600 p-0 h-auto flex items-center" asChild>
          <Link to={linkHref} className="flex items-center">
            {linkText} 
            {isRTL ? (
              <ArrowRight size={16} className="mr-1 transform rotate-180" />
            ) : (
              <ArrowRight size={16} className="ml-1" />
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
