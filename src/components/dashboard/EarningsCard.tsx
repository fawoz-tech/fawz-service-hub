
import React from 'react';
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const EarningsCard = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">{t('dashboard.earnings')}</CardTitle>
        <CardDescription>{t('dashboard.this_month')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-secondary-900 mb-2">$2,456</div>
        <div className="text-sm text-emerald-600 font-medium flex items-center mb-6">
          +12.5% {t('dashboard.from_last')}
        </div>
        <Button 
          variant="outline" 
          className="w-full px-3" 
          asChild
        >
          <Link 
            to="/payments" 
            className={`w-full flex items-center ${isRTL ? 'flex-row-reverse justify-between' : 'justify-center gap-2'}`}
          >
            <DollarSign size={16} />
            <span>{t('dashboard.view_details')}</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EarningsCard;
