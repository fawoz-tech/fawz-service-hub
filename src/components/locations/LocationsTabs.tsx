
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LocationCard from './LocationCard';
import { Location } from '@/types/location';

interface LocationsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  locations: Location[];
}

const LocationsTabs = ({ activeTab, setActiveTab, locations }: LocationsTabsProps) => {
  return (
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
  );
};

export default LocationsTabs;
