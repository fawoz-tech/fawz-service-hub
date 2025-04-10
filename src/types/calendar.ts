
export interface Appointment {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'maintenance' | 'repair' | 'installation' | 'consultation';
}
