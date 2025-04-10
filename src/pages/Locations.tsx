
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter, Building, Home, Globe, Plus } from 'lucide-react';

const Locations = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary-900">Locations</h1>
          <div className="flex items-center gap-2 self-stretch md:self-auto w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-500" />
              <Input
                placeholder="Search locations..."
                className="pl-9 w-full md:w-[250px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
            <Button className="gap-1">
              <Plus size={16} />
              Add Location
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-[500px]">
            <TabsTrigger value="all">All Areas</TabsTrigger>
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="secondary">Secondary</TabsTrigger>
            <TabsTrigger value="excluded">Excluded</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TabsContent value="all" className="mt-0 space-y-0">
              {locations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </TabsContent>
            
            <TabsContent value="primary" className="mt-0 space-y-0">
              {locations
                .filter((location) => location.type === 'primary')
                .map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
            </TabsContent>
            
            <TabsContent value="secondary" className="mt-0 space-y-0">
              {locations
                .filter((location) => location.type === 'secondary')
                .map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
            </TabsContent>
            
            <TabsContent value="excluded" className="mt-0 space-y-0">
              {locations
                .filter((location) => location.type === 'excluded')
                .map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
            </TabsContent>
          </div>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Coverage Settings</CardTitle>
            <CardDescription>Configure your service area radius and limitations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Service Radius</label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="20">20 km</SelectItem>
                    <SelectItem value="30">30 km</SelectItem>
                    <SelectItem value="50">50 km</SelectItem>
                    <SelectItem value="100">100 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Extended Area Surcharge</label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue placeholder="Select surcharge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="15">15%</SelectItem>
                    <SelectItem value="20">20%</SelectItem>
                    <SelectItem value="25">25%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

interface Location {
  id: string;
  name: string;
  address: string;
  type: 'primary' | 'secondary' | 'excluded';
  radius: number;
  city: string;
  locationType: 'business' | 'residential' | 'both';
}

interface LocationCardProps {
  location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
  const typeColors = {
    'primary': 'bg-green-100 text-green-800 border-green-200',
    'secondary': 'bg-blue-100 text-blue-800 border-blue-200',
    'excluded': 'bg-red-100 text-red-800 border-red-200',
  };

  const typeIcons = {
    'business': <Building className="h-4 w-4" />,
    'residential': <Home className="h-4 w-4" />,
    'both': <Globe className="h-4 w-4" />
  };

  return (
    <Card className="overflow-hidden">
      <div className={`px-4 py-1 border-b ${typeColors[location.type]}`}>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium capitalize">{location.type} Area</span>
          <span className="text-xs">{location.radius} km radius</span>
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{location.name}</h3>
            <div className="text-sm text-secondary-600 flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {location.address}
            </div>
            <div className="text-sm text-secondary-600 mt-2">
              <Badge variant="outline" className="gap-1 mt-1">
                {typeIcons[location.locationType]}
                <span className="capitalize">{location.locationType}</span>
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Sample location data
const locations: Location[] = [
  {
    id: '1',
    name: 'Main Office',
    address: 'Al Olaya District, Riyadh',
    type: 'primary',
    radius: 30,
    city: 'Riyadh',
    locationType: 'business'
  },
  {
    id: '2',
    name: 'Northern Branch',
    address: 'Al Muruj, Riyadh',
    type: 'secondary',
    radius: 20,
    city: 'Riyadh',
    locationType: 'both'
  },
  {
    id: '3',
    name: 'Jeddah Office',
    address: 'Al Hamra, Jeddah',
    type: 'secondary',
    radius: 25,
    city: 'Jeddah',
    locationType: 'business'
  },
  {
    id: '4',
    name: 'Dammam Zone',
    address: 'Al Aziziyah, Dammam',
    type: 'secondary',
    radius: 15,
    city: 'Dammam',
    locationType: 'both'
  },
  {
    id: '5',
    name: 'Industrial Area',
    address: 'Industrial Zone, Riyadh',
    type: 'excluded',
    radius: 5,
    city: 'Riyadh',
    locationType: 'business'
  }
];

export default Locations;
