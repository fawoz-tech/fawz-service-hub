
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LocationsFilter from '@/components/locations/LocationsFilter';
import LocationsTabs from '@/components/locations/LocationsTabs';
import CoverageSettings from '@/components/locations/CoverageSettings';
import { locations } from '@/services/locationService';
import { useLanguage } from '@/contexts/LanguageContext';

const Locations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useLanguage();
  
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // We'll implement actual search functionality later
  };

  const handleFilter = () => {
    console.log('Filter clicked');
    // We'll implement filter functionality later
  };

  const handleAddLocation = () => {
    console.log('Add location clicked');
    // We'll implement add location functionality later
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary-900">{t('locations.title')}</h1>
          <LocationsFilter 
            onSearch={handleSearch}
            onFilter={handleFilter}
            onAddLocation={handleAddLocation}
          />
        </div>

        <LocationsTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          locations={locations}
        />

        <CoverageSettings />
      </div>
    </Layout>
  );
};

export default Locations;
