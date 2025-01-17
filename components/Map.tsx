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
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
        libraries: ['places', 'routes']
      })

      const { Map } = await loader.importLibrary('maps')
      const { DirectionsService, DirectionsRenderer } = await loader.importLibrary('routes')

      const mapOptions: google.maps.MapOptions = {
        center: { lat: -26.2041, lng: 28.0473 }, // Johannesburg coordinates
        zoom: 12,
        mapId: 'DEMO_MAP_ID',
        disableDefaultUI: true,
        styles: [
          {
            featureType: 'poi' as google.maps.MapTypeStyleFeatureType,
            stylers: [{ visibility: 'off' }]
          }
        ]
      }

      const mapInstance = new Map(mapRef.current!, mapOptions)
      const directionsServiceInstance = new DirectionsService()
      const directionsRendererInstance = new DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#22c55e',
          strokeWeight: 4
        }
      })

      setDirectionsService(directionsServiceInstance)
      setDirectionsRenderer(directionsRendererInstance)
    }

    initMap()
  }, [])

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
