'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingAgentProps {
  elevenLabsKey: string
  agentId: string
}

export function FloatingAgent({ elevenLabsKey, agentId }: FloatingAgentProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [showResponse, setShowResponse] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore
      const recognition = new webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('')
        setTranscript(transcript)
      }

      recognition.onend = () => {
        if (isListening) {
          recognition.start()
        }
      }

      recognitionRef.current = recognition
    }
  }, [isListening])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      // Call ElevenLabs API with the transcript
      if (transcript) {
        callElevenLabsAPI(transcript)
      }
    } else {
      setTranscript('')
      recognitionRef.current?.start()
    }
    setIsListening(!isListening)
  }

  const callElevenLabsAPI = async (text: string) => {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${agentId}/stream`, {
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
      })

      if (!response.ok) {
        throw new Error('Failed to get response from ElevenLabs')
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audio.play()

      setResponse(text)
      setShowResponse(true)
      setTimeout(() => setShowResponse(false), 10000) // Hide response after 10 seconds
    } catch (error) {
      console.error('Error calling ElevenLabs:', error)
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
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white hover:opacity-90 transition-opacity`}
        >
          {isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
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
              <div className="bg-white rounded-lg shadow-lg p-3 text-sm max-w-xs text-center">
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
              <div className="bg-white rounded-lg shadow-lg p-3 text-sm max-w-xs text-center">
                {response}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
