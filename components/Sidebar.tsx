'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Settings, HelpCircle, Mic, MessageSquare } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  const suggestedQuestions = {
    '/': [
      "What are the latest luxury brands available?",
      "How can I find exclusive deals at MiMall?",
      "What's trending in high-end fashion right now?",
      "Can you recommend premium gift ideas?",
    ],
    '/about': [
      "When was MiMall founded?",
      "What makes MiMall unique in luxury retail?",
      "How does MiMall support local artisans?",
      "What's MiMall's vision for the future of retail?",
    ],
    '/locations': [
      "Where is the nearest MiMall location?",
      "Which MiMall has the widest selection of brands?",
      "Are there any new MiMall locations opening soon?",
      "What are the operating hours for MiMall centers?",
    ],
    '/michina': [
      "Where are the main China Mall locations in Johannesburg?",
      "What unique products can I find at China Malls?",
      "How does MiChina ensure product quality?",
      "Are there any current promotions at China Malls?",
    ],
    '/miia': [
      "How can I book a specialist appointment?",
      "What medical specialties does MiiA cover?",
      "How does MiiA ensure patient privacy?",
      "Can I get a second opinion through MiiA?",
    ],
    '/signup/business': [
      "What types of businesses can sign up on MiMall?",
      "Are there any fees for business registration?",
      "How long does the business approval process take?",
      "What are the benefits of signing up my business on MiMall?",
    ],
    '/signup/business/retailer': [
      "What documents do I need to register as a retailer?",
      "Can I sell both online and in physical stores through MiMall?",
      "How does MiMall handle payments for retailers?",
      "What support does MiMall offer for inventory management?",
    ],
    '/signup/business/professional': [
      "What types of professional services can be listed on MiMall?",
      "How can I showcase my professional credentials on my profile?",
      "Does MiMall provide scheduling tools for appointments?",
      "How does MiMall handle client reviews for professionals?",
    ],
    '/signup/business/driver': [
      "What vehicle types are accepted for driver registration?",
      "How does MiMall assign deliveries to drivers?",
      "What's the payment structure for drivers on MiMall?",
      "Are there any specific insurance requirements for drivers?",
    ],
    '/signup/user': [
      "What are the benefits of creating a MiMall account?",
      "Can I use my Google account to sign up?",
      "How does MiMall protect my personal information?",
      "Can I have multiple user profiles under one account?",
    ],
  }

  const currentQuestions = suggestedQuestions[pathname as keyof typeof suggestedQuestions] || suggestedQuestions['/']

  return (
    <aside className="glass w-64 fixed right-0 top-0 h-screen overflow-y-auto p-4 animate-slide-up">
      <div className="mb-6">
        <h3 className="text-xl mb-2 text-gold-500">Talk to MiMall</h3>
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-64">
          <button className="w-full bg-gold-500 hover:bg-gold-600 rounded-full p-4 flex items-center justify-center transition-all duration-300 hover:scale-105">
            <Mic className="text-white" size={24} />
          </button>
          <div className="text-sm text-white text-center mt-2">
            Click to start voice conversation
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-lg mb-2 text-gold-500">Suggested Questions</h4>
        <ul className="space-y-2">
          {currentQuestions.map((question, index) => (
            <li key={index} className="text-sm text-white hover:text-gold-500 cursor-pointer flex items-center">
              <MessageSquare className="inline-block mr-2 text-gold-500" size={14} />
              {question}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg mb-2 text-gold-500">AI Settings</h4>
        <ul className="space-y-2">
          <li className="flex items-center cursor-pointer text-white hover:text-gold-500">
            <Settings size={16} className="mr-2 text-gold-500" />
            <span className="text-sm">Customize AI</span>
          </li>
          <li className="flex items-center cursor-pointer text-white hover:text-gold-500">
            <HelpCircle size={16} className="mr-2 text-gold-500" />
            <span className="text-sm">AI Help</span>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
