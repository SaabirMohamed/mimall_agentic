'use client'

declare global {
  interface Window {
    google: typeof google;
  }
}

import { useEffect, useRef, useCallback, useState } from 'react'

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
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null)

  const createMarker = useCallback((place: google.maps.places.PlaceResult, map: google.maps.Map) => {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
      if (infoWindow) {
        infoWindow.setContent(place.name || "");
        infoWindow.open(map, marker);
      }
    });
  }, [infoWindow]);

  const searchPlace = useCallback((query: string) => {
    if (!placesService) return;

    const request = {
      query,
      fields: ["name", "geometry"],
    };

    placesService.findPlaceFromQuery(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && mapInstanceRef.current) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i], mapInstanceRef.current);
          }

          if (results[0].geometry?.location) {
            mapInstanceRef.current.setCenter(results[0].geometry.location);
          }
        }
      }
    );
  }, [placesService, createMarker]);

  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return;

    const mapOptions: google.maps.MapOptions = {
      center: { lat, lng },
      zoom,
      styles: [
        {
          featureType: google.maps.MapTypeStyleFeatureType.ALL,
          elementType: google.maps.MapTypeStyleElementType.GEOMETRY,
          stylers: [{ saturation: -100 }]
        },
        {
          featureType: google.maps.MapTypeStyleFeatureType.POI,
          elementType: google.maps.MapTypeStyleElementType.LABELS,
          stylers: [{ visibility: 'off' }]
        }
      ],
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    }

    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new window.google.maps.Map(mapRef.current, mapOptions)
    mapInstanceRef.current = map

    // Initialize InfoWindow
    setInfoWindow(new window.google.maps.InfoWindow());

    // Initialize Places Service
    setPlacesService(new window.google.maps.places.PlacesService(map));

    // Add initial marker for the specified location
    const marker = new google.maps.Marker({
      map,
      position: { lat, lng },
      title: 'Current Location'
    })
  }, [lat, lng, zoom])

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

  return <div ref={mapRef} className={className} />
}