import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { Menu, X, ShoppingCart, LogOut, UserPlus, LogIn, BookOpen, Package } from 'lucide-react';
import { usefirebase } from '../../context/Firebase';
import Quotes from '../Quotes';
import './index.css';


function NavB() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firebase = usefirebase();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you really want to Log Out?");
    if (confirmLogout) {
      firebase.SignOutUser();
      closeMenu();
    }
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-teal-800 flex flex-col  justify-center items-center">
          <div className="absolute top-5 right-4">
          <button 
            className="lg:hidden mt-2 focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X color='white' size={24} />
          </button>
          </div>
          
          <div className="flex flex-col items-center space-y-6 text-white  text-xl">
            <Link to="/" onClick={closeMenu} className="flex items-center space-x-2 hover:text-teal-600 transition-colors">
              <BookOpen size={20} />
              <span>Home</span>
            </Link>
            
            <Link to="/book/list" onClick={closeMenu} className="flex items-center space-x-2 hover:text-teal-600 transition-colors">
              <BookOpen size={20} />
              <span>Add Book</span>
            </Link>
            
            <Link to="/book/orders" onClick={closeMenu} className="flex items-center space-x-2 hover:text-teal-600 transition-colors">
              <Package size={20} />
              <span>Orders</span>
            </Link>
            
            <Link to="/cart" onClick={closeMenu} className="flex items-center space-x-2 hover:text-teal-600 transition-colors">
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
            
            {firebase.isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-pointer"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link to="/register" onClick={closeMenu} className="flex items-center space-x-2 hover:text-teal-600 transition-colors">
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </Link>
                
                <Link to="/login" onClick={closeMenu} className="flex items-center space-x-2 hover:text-teal-600 transition-colors">
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-40 w-full px-4 py-2  text-white font-bold text-xl bg-teal-800 ${
        scrolled ? 'shadow-md' : ''
      } transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="">
            <Link to="/" className="flex items-center space-x-2">
              <Player
                src="https://lottie.host/778898ab-2416-468b-b478-8a7f9f147995/ikoQSjnRZ6.json"
                loop
                autoplay
                className="h-16 w-16"
              />
              <h1 className="text-2xl font-bold mt-5 bg-gradient-to-r font-[MyFont] text-white bg-clip-text text-transparent">
                BookiFy
              </h1>
            </Link>
          </div>

          {/* Quotes - visible on medium and larger screens */}
          <div className="hidden md:block max-w-md overflow-hidden">
            <div className="text-lg font-medium  text-gray-200 bg-clip-text">
              <Quotes />
            </div>
          </div>

          {/* Navigation Links - visible on large screens */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="nav-link hover:text-teal-600 transition-colors">
              Home
            </Link>
            <Link to="/book/list" className="nav-link hover:text-teal-600 transition-colors">
              Add Book
            </Link>
            <Link to="/book/orders" className="nav-link hover:text-teal-600 transition-colors">
              Orders
            </Link>
            <Link to="/cart" className="nav-link hover:text-teal-600 transition-colors flex items-center space-x-1">
              <ShoppingCart size={18} />
              <span>Cart</span>
            </Link>
            
            {firebase.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-teal-600 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link to="/register" className="flex items-center hover:text-teal-600 space-x-1 transition-colors">
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
                <Link to="/login" className="flex items-center space-x-1 hover:text-teal-600 transition-colors">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavB;