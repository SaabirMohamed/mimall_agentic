declare global {
  interface Window {
    google: {
      maps: typeof import('./googlemaps')
    }
  }
}

declare namespace google.maps {
  export interface MapOptions {
    center: { lat: number; lng: number };
    zoom: number;
    styles?: MapTypeStyle[];
  }

  export interface MapTypeStyle {
    elementType?: MapTypeStyleElementType;
    featureType?: MapTypeStyleFeatureType;
    stylers: MapTypeStyler[];
  }

  export enum MapTypeStyleElementType {
    All = 'all',
    Geometry = 'geometry',
    Labels = 'labels',
  }

  export enum MapTypeStyleFeatureType {
    All = 'all',
    Administrative = 'administrative',
    Landscape = 'landscape',
    PointOfInterest = 'point_of_interest',
    Political = 'political',
    Road = 'road',
    Transit = 'transit',
    Water = 'water'
  }

  export interface MapTypeStyler {
    saturation?: number;
    visibility?: 'on' | 'off' | 'simplified';
  }

  export interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  export class Map {
    constructor(mapDiv: HTMLElement, opts?: MapOptions);
    fitBounds(bounds: LatLngBounds): void;
    panTo(latLng: LatLngLiteral): void;
    setZoom(zoom: number): void;
    // ... (other methods omitted for brevity)
  }

  export class Marker {
    constructor(opts: {
      position: LatLngLiteral;
      map: Map;
      animation?: Animation;
      label?: string | MarkerLabel;
    });
    setMap(map: Map | null): void;
    // ... (other methods omitted for brevity)
  }

  export class MarkerLabel {
    constructor(opts: {
      text: string;
      color: string;
    });
  }

  export class LatLngBounds {
    constructor(sw?: LatLngLiteral, ne?: LatLngLiteral);
    extend(latLng: LatLngLiteral): LatLngBounds;
    // ... (other methods omitted for brevity)
  }

  export enum Animation {
    DROP,
    BOUNCE
  }
}