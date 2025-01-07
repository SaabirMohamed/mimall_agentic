'use client'

import React, { useState } from 'react'
import { Calendar, Clock, User, MapPin, Phone, Mail } from 'lucide-react'

const MiiAPage = () => {
  const [isPatient, setIsPatient] = useState(true)

  return (
    <div className="container mx-auto my-8 pt-16">
      <h1 className="text-4xl font-bold mb-8 text-center">MiiA - Your Medical AI Assistant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Find and Book Appointments</h2>
          
          <div className="mb-4">
            <label className="block mb-2">I am a:</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${isPatient ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setIsPatient(true)}
              >
                Patient
              </button>
              <button
                className={`px-4 py-2 rounded ${!isPatient ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setIsPatient(false)}
              >
                Healthcare Provider
              </button>
            </div>
          </div>

          {isPatient ? (
            <>
              <div className="mb-4">
                <label className="block mb-2">Describe your symptoms or condition</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="E.g., I've been experiencing headaches and fatigue for the past week..."
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Preferred appointment date</label>
                <div className="flex items-center border rounded p-2">
                  <Calendar className="mr-2 text-gray-400" />
                  <input type="date" className="w-full outline-none" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Preferred time</label>
                <div className="flex items-center border rounded p-2">
                  <Clock className="mr-2 text-gray-400" />
                  <input type="time" className="w-full outline-none" />
                </div>
              </div>

              <button className="w-full bg-blue-500 text-white py-3 rounded font-bold hover:bg-blue-600 transition-colors duration-300">
                Find Suitable Doctors
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block mb-2">Full Name</label>
                <div className="flex items-center border rounded p-2">
                  <User className="mr-2 text-gray-400" />
                  <input type="text" className="w-full outline-none" placeholder="Dr. Jane Doe" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Specialization</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="E.g., Cardiologist, Pediatrician" />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Practice Address</label>
                <div className="flex items-center border rounded p-2">
                  <MapPin className="mr-2 text-gray-400" />
                  <input type="text" className="w-full outline-none" placeholder="123 Medical St, Johannesburg" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Contact Number</label>
                <div className="flex items-center border rounded p-2">
                  <Phone className="mr-2 text-gray-400" />
                  <input type="tel" className="w-full outline-none" placeholder="+27 12 345 6789" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <div className="flex items-center border rounded p-2">
                  <Mail className="mr-2 text-gray-400" />
                  <input type="email" className="w-full outline-none" placeholder="doctor@example.com" />
                </div>
              </div>

              <button className="w-full bg-blue-500 text-white py-3 rounded font-bold hover:bg-blue-600 transition-colors duration-300">
                Sign Up as Healthcare Provider
              </button>
            </>
          )}
        </div>

        <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">How MiiA Works</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full p-2 mr-4">1</div>
              <div>
                <h3 className="font-semibold">Describe Your Symptoms</h3>
                <p className="text-gray-600">Tell MiiA about your health concerns or symptoms.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full p-2 mr-4">2</div>
              <div>
                <h3 className="font-semibold">AI Analysis</h3>
                <p className="text-gray-600">MiiA analyzes your input to understand your needs.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full p-2 mr-4">3</div>
              <div>
                <h3 className="font-semibold">Doctor Recommendations</h3>
                <p className="text-gray-600">Based on the analysis, MiiA suggests suitable healthcare providers.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full p-2 mr-4">4</div>
              <div>
                <h3 className="font-semibold">Book Appointment</h3>
                <p className="text-gray-600">Choose a doctor and book your appointment through our platform.</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Why Choose MiiA?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Quick and accurate initial assessments</li>
              <li>Access to a wide network of healthcare providers</li>
              <li>Convenient 24/7 booking system</li>
              <li>Personalized healthcare recommendations</li>
              <li>Secure and confidential service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiiAPage

