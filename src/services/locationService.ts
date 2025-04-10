
import { Location } from '@/types/location';

// Sample location data - later this can be fetched from an API
export const locations: Location[] = [
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

// This function will later be replaced with an actual API call
export const getLocations = (): Promise<Location[]> => {
  return Promise.resolve(locations);
};
