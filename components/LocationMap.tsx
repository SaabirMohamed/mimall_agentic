'use client'

import { useEffect, useRef } from 'react'

interface LocationMapProps {
  lat: number
  lng: number
  zoom?: number
  className?: string
}

export default function LocationMap({ lat, lng, zoom = 15, className = "w-full h-[200px] rounded-lg" }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

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
  }, [lat, lng])

  const initializeMap = () => {
    if (!mapRef.current) return

    const mapOptions = {
      center: { lat, lng },
      zoom,
      styles: [
        {
          featureType: google.maps.MapTypeStyleFeatureType.All,
          elementType: google.maps.MapTypeStyleElementType.All,
          stylers: [{ saturation: -100 }]
        }
      ]
    }

    const map = new window.google.maps.Map(mapRef.current, mapOptions)
    mapInstanceRef.current = map

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      animation: window.google.maps.Animation.DROP
    })
  }

  return <div ref={mapRef} className={className} />
}