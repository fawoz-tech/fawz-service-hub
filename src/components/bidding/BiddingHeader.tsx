import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/language';

const BiddingHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">{t('bidding.title')}</h1>
        <p className="text-secondary-500 mt-1">{t('bidding.subtitle')}</p>
      </div>
      <Button className="whitespace-nowrap">
        <PlusCircle size={16} className="mr-2" />
        {t('bidding.post_job')}
      </Button>
    </div>
  );
};

export default BiddingHeader;
