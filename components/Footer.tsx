import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-70 shadow-md py-6 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl mb-4">Contact Us</h3>
            <p>Email: info@mimall.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-gray-200">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-gray-200">Terms & Conditions</Link></li>
              <li><Link href="/digital-privacy" className="hover:text-gray-200">Digital Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-200 hover:text-base-black">Facebook</a>
              <a href="#" className="text-gray-200 hover:text-base-black">Twitter</a>
              <a href="#" className="text-gray-200 hover:text-base-black">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 miMall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

