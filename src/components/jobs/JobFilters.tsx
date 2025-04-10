
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface JobFiltersProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

const JobFilters = ({ onSearch, onFilter }: JobFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 self-stretch md:self-auto w-full md:w-auto">
      <div className="relative flex-1 md:flex-initial">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-500" />
        <Input
          placeholder="Search jobs..."
          className="pl-9 w-full md:w-[250px]"
          onChange={handleSearchChange}
        />
      </div>
      <Button variant="outline" size="icon" onClick={onFilter}>
        <Filter size={16} />
      </Button>
    </div>
  );
};

export default JobFilters;
