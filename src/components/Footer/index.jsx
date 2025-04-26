import React from 'react'
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Bookify</h3>
            <p className="text-purple-200">
              Discover, explore, and dive into worlds of wonder. 
              Your ultimate platform for finding and sharing amazing books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-300 transition">Home</a></li>
              <li><a href="#" className="hover:text-purple-300 transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-purple-300 transition">Categories</a></li>
              <li><a href="#" className="hover:text-purple-300 transition">About Us</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-3xl hover:text-purple-300 transition">
                <IoLogoGithub />
              </a>
              <a href="#" className="text-3xl hover:text-purple-300 transition">
                <IoLogoLinkedin />
              </a>
              <a href="#" className="text-3xl hover:text-purple-300 transition">
                <IoLogoTwitter />
              </a>
              <a href="#" className="text-3xl hover:text-purple-300 transition">
                <IoMail />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-purple-300 mt-8 border-t border-purple-800 pt-4">
          © 2025 Bookify. All Rights Reserved.
        </div>
      </footer>
  )
}

export default Footer
