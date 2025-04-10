
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionsTable from './TransactionsTable';
import PaymentMethods from './PaymentMethods';
import PayoutSettingsForm from './PayoutSettingsForm';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaymentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PaymentTabs = ({ activeTab, setActiveTab }: PaymentTabsProps) => {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="transactions">{t('payments.transactions')}</TabsTrigger>
        <TabsTrigger value="payment-methods">{t('payments.payment_methods')}</TabsTrigger>
        <TabsTrigger value="payout-settings">{t('payments.payout_settings')}</TabsTrigger>
      </TabsList>

      {/* Transactions Tab */}
      <TabsContent value="transactions" className="space-y-4">
        <TransactionsTable />
      </TabsContent>

      {/* Payment Methods Tab */}
      <TabsContent value="payment-methods" className="space-y-4">
        <PaymentMethods />
      </TabsContent>

      {/* Payout Settings Tab */}
      <TabsContent value="payout-settings" className="space-y-4">
        <PayoutSettingsForm />
      </TabsContent>
    </Tabs>
  );
};

export default PaymentTabs;
