'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface MapProps {
  pickup?: google.maps.LatLngLiteral
  dropoff?: google.maps.LatLngLiteral
  onRouteCalculated?: (distance: number, duration: number) => void
}

const Map = ({ pickup, dropoff, onRouteCalculated }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>()

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places']
    });

    const initMap = async () => {
      const google = await loader.load();
      if (!mapRef.current) return;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: pickup || { lat: -29.8587, lng: 31.0218 }, // Default to Durban
        zoom: 15,
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
      });

      const directionsServiceInstance = new google.maps.DirectionsService();
      const directionsRendererInstance = new google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#4A90E2',
          strokeWeight: 6
        }
      });

      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
    };

    initMap();
  }, [pickup]);

  const calculateRoute = useCallback(() => {
    if (pickup && dropoff && directionsService && directionsRenderer) {
      directionsService.route(
        {
          origin: pickup,
          destination: dropoff,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.setDirections(result)

            const route = result.routes[0]
            if (route && route.legs[0]) {
              const distance = route.legs[0].distance?.value || 0
              const duration = route.legs[0].duration?.value || 0

              // Convert to km and minutes
              if (onRouteCalculated) {
                onRouteCalculated(distance / 1000, duration / 60)
              }
            }
          }
        }
      )
    }
  }, [pickup, dropoff, directionsService, directionsRenderer, onRouteCalculated])

  useEffect(() => {
    if (directionsService && pickup && dropoff) {
      calculateRoute()
    }
  }, [directionsService, pickup, dropoff, calculateRoute])

  return <div ref={mapRef} className="w-full h-full" />
}

export default Map
