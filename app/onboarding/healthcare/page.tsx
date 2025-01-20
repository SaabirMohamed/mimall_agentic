'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HealthcareProfessional, healthcareProfessions } from '@/types/auth'

export default function HealthcareOnboarding() {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<HealthcareProfessional>>({
    type: 'healthcare',
    profession: '',
    specialization: '',
    licenseNumber: '',
    practiceLocation: '',
    yearsOfExperience: 0,
    education: '',
    certifications: [],
    services: [],
    acceptedInsurance: [],
    languages: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save to localStorage for now
    localStorage.setItem('userProfile', JSON.stringify(formData))
    router.push('/')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof HealthcareProfessional) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim())
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8"
          >
            <h1 className="text-3xl font-bold text-white mb-8">Healthcare Professional Profile</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profession Selection */}
              <div>
                <label className="block text-white mb-2">Profession</label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  required
                >
                  <option value="">Select your profession</option>
                  {healthcareProfessions.map(profession => (
                    <option key={profession} value={profession}>{profession}</option>
                  ))}
                </select>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-white mb-2">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Your area of specialization"
                  required
                />
              </div>

              {/* License Number */}
              <div>
                <label className="block text-white mb-2">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Your professional license number"
                  required
                />
              </div>

              {/* Practice Location */}
              <div>
                <label className="block text-white mb-2">Practice Location</label>
                <input
                  type="text"
                  name="practiceLocation"
                  value={formData.practiceLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Your practice address"
                  required
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-white mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  min="0"
                  required
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-white mb-2">Education</label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Your educational background"
                  rows={3}
                  required
                />
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-white mb-2">Certifications (comma-separated)</label>
                <input
                  type="text"
                  value={formData.certifications?.join(', ')}
                  onChange={(e) => handleArrayInput(e, 'certifications')}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Certification 1, Certification 2, ..."
                />
              </div>

              {/* Services */}
              <div>
                <label className="block text-white mb-2">Services Offered (comma-separated)</label>
                <input
                  type="text"
                  value={formData.services?.join(', ')}
                  onChange={(e) => handleArrayInput(e, 'services')}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Service 1, Service 2, ..."
                  required
                />
              </div>

              {/* Insurance */}
              <div>
                <label className="block text-white mb-2">Accepted Insurance (comma-separated)</label>
                <input
                  type="text"
                  value={formData.acceptedInsurance?.join(', ')}
                  onChange={(e) => handleArrayInput(e, 'acceptedInsurance')}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Insurance 1, Insurance 2, ..."
                />
              </div>

              {/* Languages */}
              <div>
                <label className="block text-white mb-2">Languages Spoken (comma-separated)</label>
                <input
                  type="text"
                  value={formData.languages?.join(', ')}
                  onChange={(e) => handleArrayInput(e, 'languages')}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Language 1, Language 2, ..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Complete Profile
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
