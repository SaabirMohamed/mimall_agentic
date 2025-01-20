import { Store } from '../types/categories';

export const generateStores = (baseId: number): Store[] => [
  {
    id: baseId,
    name: 'Mall of Africa Store',
    location: 'Mall of Africa',
    coordinates: {lat: -26.0167, lng: 28.1167},
    availability: 'In Stock'
  },
  {
    id: baseId + 1,
    name: 'Sandton City Store',
    location: 'Sandton City',
    coordinates: {lat: -26.1067, lng: 28.0567},
    availability: 'Limited Stock'
  },
  {
    id: baseId + 2,
    name: 'Eastgate Store',
    location: 'Eastgate',
    coordinates: {lat: -26.1833, lng: 28.1167},
    availability: 'In Stock'
  },
  {
    id: baseId + 3,
    name: 'Rosebank Mall Store',
    location: 'Rosebank Mall',
    coordinates: {lat: -26.1467, lng: 28.0367},
    availability: 'In Stock'
  }
];
