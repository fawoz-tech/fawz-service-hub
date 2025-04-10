
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobCard from '@/components/bidding/JobCard';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { mockOpenJobs } from '@/data/mockOpenJobs';

const OpenMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="san-francisco">San Francisco</SelectItem>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under-100">Under $100</SelectItem>
              <SelectItem value="100-500">$100 - $500</SelectItem>
              <SelectItem value="over-500">Over $500</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline" className="bg-secondary-100">
          {mockOpenJobs.length} jobs available
        </Badge>
        {locationFilter !== 'all' && (
          <Badge variant="secondary" className="cursor-pointer" onClick={() => setLocationFilter('all')}>
            Location: {locationFilter.replace('-', ' ')} ×
          </Badge>
        )}
        {serviceFilter !== 'all' && (
          <Badge variant="secondary" className="cursor-pointer" onClick={() => setServiceFilter('all')}>
            Service: {serviceFilter} ×
          </Badge>
        )}
        {priceFilter !== 'all' && (
          <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriceFilter('all')}>
            Price: {priceFilter.replace('-', ' - $').replace('under-', 'Under $').replace('over-', 'Over $')} ×
          </Badge>
        )}
      </div>
      
      <div className="space-y-4">
        {mockOpenJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default OpenMarketplace;
