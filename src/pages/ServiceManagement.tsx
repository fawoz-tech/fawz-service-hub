
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, MoreHorizontal, Trash2, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ServiceManagement = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary-900">Service Management</h1>
          <div className="flex items-center gap-2 self-stretch md:self-auto w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-500" />
              <Input
                placeholder="Search services..."
                className="pl-9 w-full md:w-[250px]"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="grid grid-cols-2 w-[200px]">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="active" className="space-y-0">
              <div className="border rounded-lg overflow-hidden">
                {activeServices.map((service, index) => (
                  <ServiceRow 
                    key={service.id} 
                    service={service} 
                    isLast={index === activeServices.length - 1} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inactive" className="space-y-0">
              <div className="border rounded-lg overflow-hidden">
                {inactiveServices.map((service, index) => (
                  <ServiceRow 
                    key={service.id} 
                    service={service} 
                    isLast={index === inactiveServices.length - 1} 
                  />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Service Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">{category.name}</CardTitle>
                    <CardDescription>{category.services} services</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Category
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-secondary-600">
                      {category.pricing}
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface Service {
  id: string;
  name: string;
  category: string;
  pricing: string;
  duration: string;
  featured?: boolean;
  status: 'active' | 'inactive';
}

interface ServiceRowProps {
  service: Service;
  isLast: boolean;
}

const ServiceRow = ({ service, isLast }: ServiceRowProps) => {
  return (
    <div className={`flex items-center justify-between p-4 bg-white ${!isLast ? 'border-b' : ''}`}>
      <div className="flex items-center gap-4">
        <div>
          <div className="font-medium text-secondary-900">{service.name}</div>
          <div className="text-sm text-secondary-600">{service.category}</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="text-sm text-secondary-600 mr-6">
          <span className="font-medium">{service.pricing}</span>
          <span className="mx-1">·</span>
          <span>{service.duration}</span>
        </div>
        
        {service.featured && (
          <Badge variant="secondary" className="mr-2">Featured</Badge>
        )}
        
        <Switch id={`service-status-${service.id}`} checked={service.status === 'active'} />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit Service
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const activeServices: Service[] = [
  {
    id: '1',
    name: 'AC Repair - Split Unit',
    category: 'AC Services',
    pricing: '$50 - $150',
    duration: '1-2 hours',
    featured: true,
    status: 'active',
  },
  {
    id: '2',
    name: 'AC Installation',
    category: 'AC Services',
    pricing: '$200 - $400',
    duration: '3-4 hours',
    status: 'active',
  },
  {
    id: '3',
    name: 'Plumbing - Leak Repair',
    category: 'Plumbing',
    pricing: '$75 - $180',
    duration: '1-3 hours',
    status: 'active',
  },
  {
    id: '4',
    name: 'Electrical Wiring',
    category: 'Electrical',
    pricing: '$100 - $250',
    duration: '2-5 hours',
    featured: true,
    status: 'active',
  },
  {
    id: '5',
    name: 'Sink Installation',
    category: 'Plumbing',
    pricing: '$120 - $200',
    duration: '1-2 hours',
    status: 'active',
  },
];

const inactiveServices: Service[] = [
  {
    id: '6',
    name: 'Emergency Towing',
    category: 'Automotive',
    pricing: '$75 - $200',
    duration: 'Varies',
    status: 'inactive',
  },
  {
    id: '7',
    name: 'Water Heater Repair',
    category: 'Plumbing',
    pricing: '$80 - $250',
    duration: '1-3 hours',
    status: 'inactive',
  },
];

const categories = [
  {
    id: '1',
    name: 'AC Services',
    services: 4,
    pricing: 'From $50'
  },
  {
    id: '2',
    name: 'Plumbing',
    services: 6,
    pricing: 'From $75'
  },
  {
    id: '3',
    name: 'Electrical',
    services: 3,
    pricing: 'From $100'
  },
  {
    id: '4',
    name: 'Cleaning',
    services: 5,
    pricing: 'From $60'
  },
  {
    id: '5',
    name: 'Automotive',
    services: 2,
    pricing: 'From $75'
  },
  {
    id: '6',
    name: 'Handyman',
    services: 8,
    pricing: 'From $40'
  },
];

export default ServiceManagement;
