
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Download, CreditCard, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Sample payment data
const paymentData = [
  { id: '1', customer: 'Ahmed Hassan', service: 'AC Repair', amount: 350, date: '2023-06-10', status: 'completed' },
  { id: '2', customer: 'Fatima Al-Saud', service: 'Plumbing', amount: 220, date: '2023-06-09', status: 'pending' },
  { id: '3', customer: 'Mohammed Al-Qahtani', service: 'Electrical', amount: 180, date: '2023-06-08', status: 'completed' },
  { id: '4', customer: 'Sara Abdullah', service: 'AC Maintenance', amount: 150, date: '2023-06-07', status: 'completed' },
  { id: '5', customer: 'Khalid Al-Otaibi', service: 'Plumbing', amount: 275, date: '2023-06-06', status: 'pending' },
  { id: '6', customer: 'Layla Mohammed', service: 'Appliance Repair', amount: 420, date: '2023-06-05', status: 'declined' },
  { id: '7', customer: 'Nasser Al-Farhan', service: 'Electrical', amount: 195, date: '2023-06-04', status: 'completed' },
  { id: '8', customer: 'Aisha Rahman', service: 'Plumbing', amount: 320, date: '2023-06-03', status: 'pending' },
];

// Payment methods data
const paymentMethods = [
  { id: '1', name: 'Visa **** 4231', type: 'credit-card', isDefault: true },
  { id: '2', name: 'STC Pay', type: 'mobile-wallet', isDefault: false },
  { id: '3', name: 'Bank Transfer (SABB)', type: 'bank', isDefault: false },
];

const Payments = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-secondary-900">Payments</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Available Balance</CardDescription>
              <CardTitle className="text-2xl">SAR 4,780.00</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <Button className="w-full">Withdraw Funds</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Payments</CardDescription>
              <CardTitle className="text-2xl">SAR 1,620.00</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-secondary-500">4 payments waiting to clear</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Payout</CardDescription>
              <CardTitle className="text-2xl">SAR 3,250.00</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-secondary-500">June 1, 2023 • Bank transfer</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different payment sections */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="payout-settings">Payout Settings</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.customer}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>SAR {payment.amount}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : payment.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {payment.status === 'completed' && <CheckCircle size={12} className="mr-1" />}
                            {payment.status === 'pending' && <Clock size={12} className="mr-1" />}
                            {payment.status === 'declined' && <AlertCircle size={12} className="mr-1" />}
                            {payment.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Transactions</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Payment Methods</CardTitle>
                <CardDescription>
                  Manage how you receive payments from customers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-50 p-2 rounded-full">
                        <CreditCard className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.type === 'credit-card' ? 'Credit Card' : method.type === 'mobile-wallet' ? 'Mobile Wallet' : 'Bank Account'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && (
                        <span className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add Payment Method</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Payout Settings Tab */}
          <TabsContent value="payout-settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payout Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive your funds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Payout Schedule</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="weekly" name="payout-schedule" className="h-4 w-4 text-primary" checked />
                        <label htmlFor="weekly">Weekly (Every Monday)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="biweekly" name="payout-schedule" className="h-4 w-4 text-primary" />
                        <label htmlFor="biweekly">Bi-Weekly</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="monthly" name="payout-schedule" className="h-4 w-4 text-primary" />
                        <label htmlFor="monthly">Monthly</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-medium mb-2">Minimum Payout Amount</h3>
                    <Input type="number" placeholder="500" defaultValue="500" />
                    <p className="text-sm text-secondary-500 mt-2">
                      Funds will be held until this threshold is reached
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-md font-medium mb-2">Tax Information</h3>
                  <p className="text-sm text-secondary-500 mb-4">
                    Make sure your tax information is up to date for proper reporting
                  </p>
                  <Button variant="outline">Update Tax Information</Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Payments;
