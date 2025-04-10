
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, DollarSign, Wallet, Calendar, Download } from 'lucide-react';

// Sample data for components
const revenueData = [
  { name: 'Jan', revenue: 3500 },
  { name: 'Feb', revenue: 4200 },
  { name: 'Mar', revenue: 3800 },
  { name: 'Apr', revenue: 5000 },
  { name: 'May', revenue: 4700 },
  { name: 'Jun', revenue: 6000 },
  { name: 'Jul', revenue: 5800 },
];

const serviceData = [
  { name: 'AC Repair', value: 35 },
  { name: 'Plumbing', value: 25 },
  { name: 'Electrical', value: 20 },
  { name: 'Appliances', value: 15 },
  { name: 'Other', value: 5 },
];

const transactionData = [
  { id: '1', customer: 'Ahmed Hassan', service: 'AC Repair', amount: 350, date: '2023-06-10', status: 'completed' },
  { id: '2', customer: 'Fatima Al-Saud', service: 'Plumbing', amount: 220, date: '2023-06-09', status: 'pending' },
  { id: '3', customer: 'Mohammed Al-Qahtani', service: 'Electrical', amount: 180, date: '2023-06-08', status: 'completed' },
  { id: '4', customer: 'Sara Abdullah', service: 'AC Maintenance', amount: 150, date: '2023-06-07', status: 'completed' },
  { id: '5', customer: 'Khalid Al-Otaibi', service: 'Plumbing', amount: 275, date: '2023-06-06', status: 'pending' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const FinancialDashboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-secondary-900">Financial Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">$24,780</CardTitle>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  12.5%
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-secondary-500">vs. previous period</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Payments</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">$5,230</CardTitle>
                <div className="flex items-center text-amber-600 text-sm font-medium">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  4.3%
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-secondary-500">8 invoices pending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Jobs Completed</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">127</CardTitle>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  8.2%
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-secondary-500">this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Job Value</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">$195</CardTitle>
                <div className="flex items-center text-red-600 text-sm font-medium">
                  <ArrowDown className="w-4 h-4 mr-1" />
                  2.1%
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-secondary-500">vs. previous period</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <Tabs defaultValue="weekly" value={timeframe} onValueChange={setTimeframe} className="w-[400px]">
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  labelStyle={{ fontWeight: 'bold' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service Breakdown */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Revenue by Service</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="md:col-span-2">
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
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.service}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {transaction.status}
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
        </div>

        {/* Payout Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium mb-2">Payout Method</h3>
                <Select defaultValue="bank">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payout method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="stcpay">STC Pay</SelectItem>
                    <SelectItem value="wallet">Mobile Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-md font-medium mb-2">Payout Frequency</h3>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payout frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-md font-medium mb-4">Automatic Payouts</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-payout">Enable automatic payouts</Label>
                  <p className="text-sm text-secondary-500">Receive payments on a regular schedule</p>
                </div>
                <Switch id="auto-payout" defaultChecked />
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-md font-medium mb-4">Minimum Payout Amount</h3>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500 h-4 w-4" />
                <input
                  type="number"
                  className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="100"
                  defaultValue="100"
                />
              </div>
              <p className="text-sm text-secondary-500 mt-2">
                Payouts will only be processed when your balance exceeds this amount
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default FinancialDashboard;
