
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from 'lucide-react';

interface LocationsFilterProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  onAddLocation: () => void;
}

const LocationsFilter = ({ 
  onSearch, 
  onFilter, 
  onAddLocation 
}: LocationsFilterProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 self-stretch md:self-auto w-full md:w-auto">
      <div className="relative flex-1 md:flex-initial">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-500" />
        <Input
          placeholder="Search locations..."
          className="pl-9 w-full md:w-[250px]"
          onChange={handleSearchChange}
        />
      </div>
      <Button variant="outline" size="icon" onClick={onFilter}>
        <Filter size={16} />
      </Button>
      <Button className="gap-1" onClick={onAddLocation}>
        <Plus size={16} />
        Add Location
      </Button>
    </div>
  );
};

export default LocationsFilter;
