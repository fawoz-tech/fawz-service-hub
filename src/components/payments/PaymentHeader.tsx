import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLanguage } from '@/contexts/language';

const PaymentHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-secondary-900">{t('payments.title')}</h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          {t('payments.export')}
        </Button>
      </div>
    </div>
  );
};

export default PaymentHeader;
