import { Store } from '../types/categories';

export const generateStores = (baseId: number): Store[] => [
  {
    id: `${baseId}`,
    name: 'Mall of Africa Store',
    location: 'Mall of Africa',
    lat: -26.0167,
    lng: 28.1167,
    coordinates: {lat: -26.0167, lng: 28.1167},
    owner_id: 'default-owner',
    availability: 'In Stock',
    created_at: '2025-01-20T17:43:10+02:00',
    updated_at: '2025-01-20T17:43:10+02:00'
  },
  {
    id: `${baseId + 1}`,
    name: 'Sandton City Store',
    location: 'Sandton City',
    lat: -26.1067,
    lng: 28.0567,
    coordinates: {lat: -26.1067, lng: 28.0567},
    owner_id: 'default-owner',
    availability: 'Limited Stock',
    created_at: '2025-01-20T17:43:10+02:00',
    updated_at: '2025-01-20T17:43:10+02:00'
  },
  {
    id: `${baseId + 2}`,
    name: 'Eastgate Store',
    location: 'Eastgate',
    lat: -26.1833,
    lng: 28.1167,
    coordinates: {lat: -26.1833, lng: 28.1167},
    owner_id: 'default-owner',
    availability: 'In Stock',
    created_at: '2025-01-20T17:43:10+02:00',
    updated_at: '2025-01-20T17:43:10+02:00'
  },
  {
    id: `${baseId + 3}`,
    name: 'Rosebank Mall Store',
    location: 'Rosebank Mall',
    lat: -26.1467,
    lng: 28.0367,
    coordinates: {lat: -26.1467, lng: 28.0367},
    owner_id: 'default-owner',
    availability: 'In Stock',
    created_at: '2025-01-20T17:43:10+02:00',
    updated_at: '2025-01-20T17:43:10+02:00'
  }
];
