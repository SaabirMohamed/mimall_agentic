'use client'

import { useEffect, useRef, useCallback } from 'react'

interface LocationMapProps {
  lat: number
  lng: number
  zoom?: number
  className?: string
}

export default function LocationMap({ lat, lng, zoom = 15, className = "w-full h-[200px] rounded-lg" }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  const initializeMap = useCallback(() => {
    if (!mapRef.current) return

    const mapOptions: google.maps.MapOptions = {
      center: { lat, lng },
      zoom,
      styles: [
        {
          featureType: "all" as google.maps.MapTypeStyleFeatureType,
          elementType: "all" as google.maps.MapTypeStyleElementType,
          stylers: [{ saturation: -100 }]
        }
      ]
    }

    const map = new window.google.maps.Map(mapRef.current, mapOptions)
    mapInstanceRef.current = map

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
    })
  }, [lat, lng, zoom])

  useEffect(() => {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBUhfddqO51sE9tSMJIWJxBQF8iNboa9MI&libraries=places`
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