'use client'

import Link from 'next/link'
import { Download } from 'lucide-react'

export default function TermsAndPrivacy() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative container mx-auto py-12 px-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-4xl font-marvel text-center mb-8 text-shadow">
            Comprehensive Terms and Conditions
          </h1>
          <h2 className="text-2xl font-marvel text-center mb-8 text-shadow">
            for MiMall, MiChina, MiMedical, and HailoRide
          </h2>

          <div className="flex justify-center mb-8">
            <Link 
              href="/Merchant_Docs_Comprehensive Terms and Conditions.docx" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              download
            >
              <Download className="mr-2 h-5 w-5" />
              Download Full Terms & Conditions
            </Link>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h3 className="text-xl font-marvel mb-4 text-shadow">1. Introduction</h3>
              <p className="mb-4">
                Welcome to the platforms operated by Alahad Enterprises (Pty) Ltd, including MiMall, MiChina, MiMedical, and HailoRide. 
                By accessing or using our platforms, you agree to these terms and conditions. Please read them carefully as they govern 
                your use of our services.
              </p>
            </section>

            {/* Services Provided */}
            <section>
              <h3 className="text-xl font-marvel mb-4 text-shadow">2. Services Provided</h3>
              
              <div className="ml-4 space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">MiMall</h4>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>MiMall is an AI-driven e-commerce platform that connects customers with retailers and service providers across multiple product categories.</li>
                    <li>MiMall facilitates transactions, providing a seamless shopping experience powered by advanced AI agents, but does not directly own or sell the products listed on the platform.</li>
                    <li>Services include product listing, marketing, payment facilitation, and customer support.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">MiChina</h4>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>MiChina is a dedicated marketplace under MiMall, specializing in promoting and selling products from local China Town markets.</li>
                    <li>Services include cultural promotion, unique product offerings, and localized logistics for delivery and returns.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">MiMedical</h4>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>MiMedical connects patients with healthcare professionals, offering services such as doctor discovery, appointment booking, and AI-powered symptom assessment.</li>
                    <li>Services also include custom AI tools for medical professionals, such as prescription management and analytics (available as bespoke projects).</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">HailoRide</h4>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>HailoRide is a SaaS platform enabling businesses and drivers to offer ride-hailing services.</li>
                    <li>Services include driver and business onboarding, subscription management, and seamless ride-hailing integrations for third-party platforms.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Obligations */}
            <section>
              <h3 className="text-xl font-marvel mb-4 text-shadow">3. User Obligations</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Users must provide accurate and up-to-date information during registration, transactions, or service usage.</li>
                <li>Users agree not to engage in fraudulent, illegal, or unauthorized activities while using the platform.</li>
                <li>Users are responsible for safeguarding their login credentials and reporting any unauthorized account access.</li>
              </ul>
            </section>

            {/* Pricing and Payment */}
            <section>
              <h3 className="text-xl font-marvel mb-4 text-shadow">4. Pricing and Payment</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>All prices on the platforms are listed in South African Rand (ZAR) and include VAT where applicable.</li>
                <li>Accepted payment methods include Visa, Mastercard, and Payfast-integrated payment options.</li>
                <li>Payment is required at the time of purchase or subscription and must be completed for transactions to proceed.</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section>
              <h3 className="text-xl font-marvel mb-4 text-shadow">Contact Information</h3>
              <ul className="list-none space-y-2">
                <li>Email: <a href="mailto:servicedesk@ageye.pro" className="text-blue-300 hover:text-blue-400">servicedesk@ageye.pro</a></li>
                <li>Phone: 072 607 4999</li>
                <li>Business Hours: Monday to Friday, 9 AM – 5 PM (GMT+2)</li>
              </ul>
            </section>

            <div className="mt-8 text-center text-gray-300 text-sm">
              Last Updated: January 17, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
