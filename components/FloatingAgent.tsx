'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingAgentProps {
  elevenLabsKey: string
}

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal?: boolean;
}

interface SpeechRecognitionAlternative {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface WebkitSpeechRecognition {
  continuous: boolean
  interimResults: boolean
  onresult: (event: SpeechRecognitionEvent) => void
  onend: () => void
  start: () => void
  stop: () => void
}

export function FloatingAgent({ elevenLabsKey }: FloatingAgentProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [showResponse, setShowResponse] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef<WebkitSpeechRecognition | null>(null)

  const callElevenLabsAPI = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        console.log('No text to process');
        return;
      }

      if (!elevenLabsKey) {
        console.error('ElevenLabs API key is missing');
        alert('ElevenLabs API key is required');
        return;
      }

      setIsProcessing(true);
      console.log('Processing text:', text);

      try {
        const voiceId = '21m00Tcm4TlvDq8ikWAM';
        console.log('Making API request to ElevenLabs...');
        
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsKey,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        });

        console.log('API Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('API Error Data:', errorData);
          throw new Error(
            `ElevenLabs API error: ${response.status} ${response.statusText}${
              errorData ? ` - ${JSON.stringify(errorData)}` : ''
            }`
          );
        }

        console.log('Getting audio blob...');
        const audioBlob = await response.blob();
        console.log('Audio blob size:', audioBlob.size);

        if (!audioBlob || audioBlob.size === 0) {
          throw new Error('Received empty audio data from ElevenLabs');
        }

        console.log('Creating audio element...');
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onloadeddata = () => {
          console.log('Audio loaded, ready to play');
        };

        audio.onplay = () => {
          console.log('Audio started playing');
        };

        audio.onended = () => {
          console.log('Audio finished playing');
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
        };

        console.log('Attempting to play audio...');
        await audio.play();

        setResponse(text);
        setShowResponse(true);
        setTimeout(() => setShowResponse(false), 10000);
      } catch (error) {
        console.error('Error calling ElevenLabs:', error)
        alert(error instanceof Error ? error.message : 'Failed to generate speech')
      } finally {
        setIsProcessing(false);
      }
    },
    [elevenLabsKey]
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-expect-error webkitSpeechRecognition is not in lib.dom.d.ts
      const recognition: WebkitSpeechRecognition = new webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true

      let lastTranscriptTime = Date.now()
      const SILENCE_DURATION = 1500 // 1.5 seconds of silence to trigger stop

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        setTranscript(transcript)
        lastTranscriptTime = Date.now()
      }

      recognition.onend = () => {
        const timeSinceLastTranscript = Date.now() - lastTranscriptTime
        
        if (isListening) {
          if (timeSinceLastTranscript > SILENCE_DURATION && transcript) {
            // Stop listening and send to ElevenLabs if we have transcript
            setIsListening(false)
            callElevenLabsAPI(transcript)
          } else {
            // Continue listening if no significant silence or no transcript
            recognition.start()
          }
        }
      }

      recognitionRef.current = recognition
    }
  }, [isListening, transcript, callElevenLabsAPI])

  const toggleListening = async () => {
    try {
      if (isListening) {
        // Stop listening
        recognitionRef.current?.stop()
        setIsListening(false)
      } else {
        // Start listening
        setTranscript('')
        recognitionRef.current?.start()
        setIsListening(true)
      }
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'An error occurred')
      setIsListening(false)
      setTranscript('')
    }
  }

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative"
      >
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full shadow-lg ${
            isListening ? 'bg-red-500' : isProcessing ? 'bg-yellow-500' : 'bg-blue-500'
          } text-gray-200 hover:opacity-90 transition-all relative`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
          ) : isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
          {isProcessing && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-yellow-500 text-gray-200 text-xs px-2 py-1 rounded">
              Processing...
            </div>
          )}
        </button>

        <AnimatePresence>
          {transcript && isListening && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-transparent rounded-lg shadow-lg p-3 text-sm max-w-xs text-center">
                {transcript}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-transparent rounded-lg shadow-lg p-3 text-sm max-w-xs text-center">
                {response}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
