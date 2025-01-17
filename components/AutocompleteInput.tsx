'use client'

import { useEffect, useRef, useCallback } from 'react'
import { MapPin } from 'lucide-react'

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: {
            new (
              inputField: HTMLInputElement,
              opts?: google.maps.places.AutocompleteOptions
            ): google.maps.places.Autocomplete;
          };
          AutocompleteOptions: {
            types?: string[];
            componentRestrictions?: {
              country: string;
            };
          };
          PlaceResult: any;
        };
        event: {
          clearInstanceListeners(instance: object): void;
        };
      };
    };
  }
}

interface AutocompleteInputProps {
  placeholder: string;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const AutocompleteInput = ({ placeholder, onPlaceSelected }: AutocompleteInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const initAutocomplete = useCallback(() => {
    if (inputRef.current && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['geocode'],
          componentRestrictions: { country: 'za' }
        }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place) {
          onPlaceSelected(place);
        }
      });

      autocompleteRef.current = autocomplete;
    }
  }, [onPlaceSelected]);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initAutocomplete();
      };
    } else {
      initAutocomplete();
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [initAutocomplete]);

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white">
      <MapPin className="w-5 h-5 text-gray-400 mr-2" />
      <input
        ref={inputRef}
        type="text"
        className="w-full outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default AutocompleteInput;