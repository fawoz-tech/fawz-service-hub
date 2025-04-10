
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ArrowDownToLine, ArrowUpToLine, Calendar, Calculator, CreditCard, Download, Filter, PiggyBank, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

const FinancialDashboard = () => {
  const [period, setPeriod] = useState('weekly');
  const [payoutSettings, setPayoutSettings] = useState('weekly');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary-900">Financial Dashboard</h1>
          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto w-full md:w-auto">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">SAR 3,452.00</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last {period}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Escrow</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">SAR 842.00</div>
              <p className="text-xs text-muted-foreground">
                4 jobs pending release
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available for Payout</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">SAR 2,610.00</div>
              <div className="text-xs text-muted-foreground">
                Next auto-payout: {format(new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), 'dd MMM yyyy')}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Success Rate</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                +4% from last {period}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardDescription>
                View your earnings trend for the selected {period}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={{ revenue: { label: "Revenue", theme: { light: "#22c55e" } } }} className="aspect-[4/3]">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    name="revenue"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Earnings by Service</CardTitle>
              <CardDescription>
                Breakdown of your revenue by service type
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={{ services: { label: "Services", theme: { light: "#4f46e5" } } }} className="aspect-[4/3]">
                <BarChart
                  data={serviceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="services" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Overview of your latest financial activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      transaction.type === "credit" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-amber-100 text-amber-600"
                    )}>
                      {transaction.type === "credit" ? 
                        <ArrowDownToLine size={18} /> : 
                        <ArrowUpToLine size={18} />
                      }
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "font-medium",
                      transaction.type === "credit" ? "text-green-600" : ""
                    )}>
                      {transaction.type === "credit" ? "+" : ""}{transaction.amount}
                    </div>
                    <Badge variant={getStatusBadgeVariant(transaction.status)}>{transaction.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>
              Configure how and when you receive your earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">Payout Frequency</h3>
                <Tabs value={payoutSettings} onValueChange={setPayoutSettings} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full max-w-md">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="biweekly">Bi-Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Default Payout Method</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <CreditCard className="h-5 w-5" />
                    <div className="flex-1">
                      <div className="font-medium">Bank Transfer - Saudi National Bank</div>
                      <div className="text-sm text-muted-foreground">Account ending in 4398</div>
                    </div>
                    <Badge>Primary</Badge>
                  </div>
                </div>
                <Button variant="outline" className="mt-2 w-full sm:w-auto">Manage Payment Methods</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Helper function for badge styles
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "processing":
      return "outline";
    case "escrow":
      return "destructive";
    default:
      return "secondary";
  }
};

// Sample data for charts
const revenueData = [
  { name: "Sun", value: 400, revenue: 400 },
  { name: "Mon", value: 300, revenue: 300 },
  { name: "Tue", value: 600, revenue: 600 },
  { name: "Wed", value: 800, revenue: 800 },
  { name: "Thu", value: 500, revenue: 500 },
  { name: "Fri", value: 450, revenue: 450 },
  { name: "Sat", value: 700, revenue: 700 }
];

const serviceData = [
  { name: "AC Repair", value: 1200, services: 1200 },
  { name: "Plumbing", value: 900, services: 900 },
  { name: "Electrical", value: 600, services: 600 },
  { name: "Cleaning", value: 400, services: 400 },
  { name: "Painting", value: 300, services: 300 }
];

// Sample transaction data
const transactions = [
  {
    id: "1",
    type: "credit",
    description: "Ahmed Hassan - AC Repair",
    date: "Today, 10:30 AM",
    amount: "SAR 450.00",
    status: "completed"
  },
  {
    id: "2",
    type: "credit",
    description: "Fatima Al-Saud - Plumbing",
    date: "Today, 2:15 PM",
    amount: "SAR 320.00",
    status: "pending"
  },
  {
    id: "3",
    type: "debit",
    description: "Platform Commission",
    date: "Today, 2:16 PM",
    amount: "SAR 32.00",
    status: "completed"
  },
  {
    id: "4",
    type: "credit",
    description: "Mohammed Al-Qahtani - Electrical",
    date: "Yesterday, 4:30 PM",
    amount: "SAR 560.00",
    status: "escrow"
  },
  {
    id: "5",
    type: "credit",
    description: "Sara Abdullah - Installation",
    date: "Apr 12, 2025",
    amount: "SAR 280.00",
    status: "processing"
  }
];

// Helper function for classnames
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export default FinancialDashboard;
