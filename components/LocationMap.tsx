'use client'

import { useEffect, useRef, useState , useCallback} from 'react'

interface LocationMapProps {
  lat: number
  lng: number
  zoom?: number
  className?: string
}

export default function LocationMap({ lat, lng, zoom = 15, className = "w-full h-[200px] rounded-lg" }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null)

  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      // Initialize the map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom,
        disableDefaultUI: true,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Initialize InfoWindow
      const infoWindow = new window.google.maps.InfoWindow();
      setInfoWindow(infoWindow);

      // Add marker for the specified location
      new google.maps.Marker({
        map,
        position: { lat, lng },
        // title: 'Current Location'
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = initializeMap
      return () => {
        document.head.removeChild(script)
      }
    } else {
      initializeMap()
    }
  }, [lat, lng, zoom, initializeMap])

  return (
    <div ref={mapRef} className={className} />
  );
}