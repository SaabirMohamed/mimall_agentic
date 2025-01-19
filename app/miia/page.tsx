'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

const MiiAPage = () => {
  const [userType, setUserType] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    'Practice Information',
    'Contact Details',
    'Services & Specialties',
    'Required Documents',
    'Payment Information'
  ]

  if (!userType) {
    return (
      <div className="flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 text-white">Welcome to MiiA</h1>
          <p className="text-xl text-gray-300 mb-12">Your Medical AI Assistant</p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4  text-white rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => setUserType('professional')}
            >
              Medical Professional Onboarding
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-white rounded-lg text-xl font-semibold hover:bg-gray-800 transition-colors"
              onClick={() => setUserType('browsing')}
            >
              Browse Medical Services
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  if (userType === 'professional') {
    return (
      <div className="glass m-20  bg-opacity-70 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-4">Medical Practice Registration</h1>
            <div className="flex justify-center space-x-4 mb-12">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    index <= currentStep ? 'text-blue-500' : 'text-gray-500'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      index <= currentStep
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-500 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-2 hidden md:inline">{step}</span>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-8 ml-2 ${
                        index < currentStep ? 'bg-blue-500' : 'bg-gray-500'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-800 bg-opacity-30 p-8 rounded-lg shadow-xl">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Practice Name</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter practice name"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Medical License Number</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter license number"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Practice Registration Number</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter registration number"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Date of Establishment</label>
                    <input
                      type="date"
                      className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setUserType(null)}
                  className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {currentStep === steps.length - 1 ? 'Submit' : 'Next Step'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">Browse Medical Services</h1>
            <p className="text-xl text-gray-300">Find the right specialist for your needs</p>
          </div>
          <button
            onClick={() => setUserType(null)}
            className="px-6 py-2 glass text-white rounded hover:bg-opacity-50 transition-all"
          >
            Back to Home
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="glass bg-opacity-30 p-6 rounded-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by symptom or specialist..."
              className="w-full p-3 rounded bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500"
            />
            <select className="w-full p-3 rounded bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500">
              <option value="">Select Specialization</option>
              <option value="cardiology">Cardiology</option>
              <option value="dermatology">Dermatology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="psychology">Psychology</option>
            </select>
            <select className="w-full p-3 rounded bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500">
              <option value="">Location</option>
              <option value="johannesburg">Johannesburg</option>
              <option value="pretoria">Pretoria</option>
              <option value="capetown">Cape Town</option>
              <option value="durban">Durban</option>
            </select>
          </div>
        </div>

        {/* Emergency Services Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass bg-opacity-30 p-6 rounded-lg mb-12 border-l-4 border-red-500"
        >
          <h2 className="text-2xl font-bold mb-4">Emergency Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 bg-opacity-20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-semibold">Netcare 911</p>
                <p className="text-gray-300">082 911</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 bg-opacity-20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-semibold">ER24</p>
                <p className="text-gray-300">084 124</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 bg-opacity-20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-semibold">Public Healthcare</p>
                <p className="text-gray-300">0800 029 999</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Cardiology",
              description: "Heart and cardiovascular system specialists",
              symptoms: ["Chest pain", "Shortness of breath", "Heart palpitations"],
              icon: "❤️"
            },
            {
              title: "Dermatology",
              description: "Skin, hair, and nail specialists",
              symptoms: ["Skin conditions", "Rashes", "Acne"],
              icon: "🔬"
            },
            {
              title: "Pediatrics",
              description: "Child health specialists",
              symptoms: ["Child illnesses", "Vaccinations", "Growth monitoring"],
              icon: "👶"
            },
            {
              title: "Orthopedics",
              description: "Bone and joint specialists",
              symptoms: ["Joint pain", "Fractures", "Sports injuries"],
              icon: "🦴"
            },
            {
              title: "Psychology",
              description: "Mental health specialists",
              symptoms: ["Anxiety", "Depression", "Stress"],
              icon: "🧠"
            },
            {
              title: "General Practice",
              description: "Primary healthcare providers",
              symptoms: ["General checkups", "Common illnesses", "Preventive care"],
              icon: "👨‍⚕️"
            }
          ].map((specialty, index) => (
            <motion.div
              key={specialty.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass bg-opacity-30 p-6 rounded-lg hover:bg-opacity-40 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-4">{specialty.icon}</div>
              <h3 className="text-xl font-bold mb-2">{specialty.title}</h3>
              <p className="text-gray-300 mb-4">{specialty.description}</p>
              <div className="space-y-2">
                {specialty.symptoms.map(symptom => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <p className="text-sm text-gray-300">{symptom}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 glass hover:bg-opacity-50 rounded transition-all">
                Find Specialists
              </button>
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 glass bg-opacity-30 p-6 rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-gray-300 mb-6">
            Describe your symptoms and let our AI assistant help you find the right specialist
          </p>
          <button className="px-8 py-3 glass hover:bg-opacity-50 rounded-lg transition-all">
            Talk to MiiA
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MiiAPage
