'use client'

import { useEffect, useRef, useCallback } from 'react'
import { MapPin } from 'lucide-react'

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (input: HTMLInputElement, options?: google.maps.places.AutocompleteOptions) => google.maps.places.Autocomplete;
        };
      };
    };
  }
}

interface AutocompleteInputProps {
  placeholder: string
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void
}

const AutocompleteInput = ({ placeholder, onPlaceSelected }: AutocompleteInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete>()

  const initAutocomplete = useCallback(() => {
    if (inputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['geocode'],
          componentRestrictions: { country: 'za' }
        }
      )

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace()
        if (place) {
          onPlaceSelected(place)
        }
      })
    }
  }, [onPlaceSelected])

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      document.head.appendChild(script)

      script.onload = () => {
        initAutocomplete()
      }
    } else {
      initAutocomplete()
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [initAutocomplete])

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white">
      <MapPin className="mr-2 text-blue-500" />
      <input
        ref={inputRef}
        type="text"
        className="w-full outline-none bg-transparent placeholder-gray-500"
        placeholder={placeholder}
      />
    </div>
  )
}

export default AutocompleteInput