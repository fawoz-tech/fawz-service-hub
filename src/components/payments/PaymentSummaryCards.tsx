
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const PaymentSummaryCards = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>{t('payments.available')}</CardDescription>
          <CardTitle className="text-2xl">SAR 4,780.00</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <Button className="w-full">{t('payments.withdraw')}</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>{t('payments.pending')}</CardDescription>
          <CardTitle className="text-2xl">SAR 1,620.00</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-xs text-secondary-500">4 {t('payments.waiting')}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>{t('payments.last_payout')}</CardDescription>
          <CardTitle className="text-2xl">SAR 3,250.00</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-xs text-secondary-500">June 1, 2023 • {t('payments.bank_transfer')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummaryCards;
