
export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'primary' | 'secondary' | 'excluded';
  radius: number;
  city: string;
  locationType: 'business' | 'residential' | 'both';
}
