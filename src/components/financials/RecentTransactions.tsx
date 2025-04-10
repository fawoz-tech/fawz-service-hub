
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Sample data
const transactionData = [
  { id: '1', customer: 'Ahmed Hassan', service: 'AC Repair', amount: 350, date: '2023-06-10', status: 'completed' },
  { id: '2', customer: 'Fatima Al-Saud', service: 'Plumbing', amount: 220, date: '2023-06-09', status: 'pending' },
  { id: '3', customer: 'Mohammed Al-Qahtani', service: 'Electrical', amount: 180, date: '2023-06-08', status: 'completed' },
  { id: '4', customer: 'Sara Abdullah', service: 'AC Maintenance', amount: 150, date: '2023-06-07', status: 'completed' },
  { id: '5', customer: 'Khalid Al-Otaibi', service: 'Plumbing', amount: 275, date: '2023-06-06', status: 'pending' },
];

const RecentTransactions = () => {
  return (
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
  );
};

export default RecentTransactions;
