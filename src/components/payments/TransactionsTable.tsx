
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

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

const TransactionsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
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
    </>
  );
};

export default TransactionsTable;
