
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-md ${color}`}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-secondary-900">{value}</div>
        <div className="text-sm text-secondary-600 mb-4">{description}</div>
        <Button variant="link" className="text-primary-600 p-0 h-auto" asChild>
          <Link to={linkHref}>
            {linkText} <ArrowRight size={16} className="ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
