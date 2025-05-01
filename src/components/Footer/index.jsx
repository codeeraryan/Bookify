import React from 'react'
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoMail } from "react-icons/io5";
import { usefirebase } from '../../context/Firebase';

const Footer = () => {
  const {isLoggedIn}=usefirebase();
  
    const handleCheckLogin = (route) => {
      if (!isLoggedIn) {
        alert('Login first');
        return '/login';
      }
      return route;
    };
    
  
  return (
    <footer className="bg-teal-800 text-white  py-12 mt-auto">
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
              <li><a href="/" className="hover:text-purple-300 transition">Home</a></li>
              <li><a href="/book/list" className="hover:text-purple-300 transition">Add Book</a></li>
              <li><a href="/book/orders" className="hover:text-purple-300 transition">Orders</a></li>
              <li><a href="/cart" className="hover:text-purple-300 transition">Cart</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/codeeraryan" className="text-3xl hover:text-purple-300 transition">
                <IoLogoGithub />
              </a>
              <a href="https://www.linkedin.com/in/aryan-pandey-thedeveloper" className="text-3xl hover:text-purple-300 transition">
                <IoLogoLinkedin />
              </a>
              <a href="https://x.com/aryanpandey0326" className="text-3xl hover:text-purple-300 transition">
                <IoLogoTwitter />
              </a>
              <a href="mailto:aryanpandey0326@gmail.com" className="text-3xl hover:text-purple-300 transition">
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
