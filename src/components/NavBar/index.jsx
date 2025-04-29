import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  Menu,
  X,
  ShoppingCart,
  LogOut,
  UserPlus,
  LogIn,
  BookOpen,
  Package,
  Home,
  Library,
  BookmarkPlus
} from 'lucide-react';
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

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-teal-800 to-teal-900 flex flex-col justify-center items-center animate-fadeIn">
          <div className="absolute top-5 right-4">
            <button 
              className="p-2 rounded-full bg-teal-700 hover:bg-teal-600 transition-all duration-300 focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X color='white' size={24} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex flex-col items-center space-y-8 text-white text-xl">
            <Link to="/" onClick={closeMenu} className="flex items-center space-x-3 hover:text-teal-300 transition-all duration-300 transform hover:translate-x-1">
              <Home size={22} strokeWidth={2} />
              <span className="font-medium">Home</span>
            </Link>
            
            <Link to="/book/list" onClick={closeMenu} className="flex items-center space-x-3 hover:text-teal-300 transition-all duration-300 transform hover:translate-x-1">
              <BookmarkPlus size={22} strokeWidth={2} />
              <span className="font-medium">Add Book</span>
            </Link>
            
            <Link to="/book/orders" onClick={closeMenu} className="flex items-center space-x-3 hover:text-teal-300 transition-all duration-300 transform hover:translate-x-1">
              <Package size={22} strokeWidth={2} />
              <span className="font-medium">Orders</span>
            </Link>
            
            <Link to="/cart" onClick={closeMenu} className="flex items-center space-x-3 hover:text-teal-300 transition-all duration-300 transform hover:translate-x-1">
              <ShoppingCart size={22} strokeWidth={2} />
              <span className="font-medium">Cart</span>
            </Link>
            
            {firebase.isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 hover:text-red-400 transition-all duration-300 cursor-pointer transform hover:translate-x-1"
              >
                <LogOut size={22} strokeWidth={2} />
                <span className="font-medium">Logout</span>
              </button>
            ) : (
              <>
                <Link to="/register" onClick={closeMenu} className="flex items-center space-x-3 hover:text-teal-300 transition-all duration-300 transform hover:translate-x-1">
                  <UserPlus size={22} strokeWidth={2} />
                  <span className="font-medium">Sign Up</span>
                </Link>
                
                <Link to="/login" onClick={closeMenu} className="flex items-center space-x-3 hover:text-teal-300 transition-all duration-300 transform hover:translate-x-1">
                  <LogIn size={22} strokeWidth={2} />
                  <span className="font-medium">Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <nav className={`sticky top-0 z-40 w-full px-4 py-2 text-white font-medium text-lg ${
        scrolled 
          ? 'bg-teal-800/95 backdrop-blur-sm shadow-lg' 
          : 'bg-teal-800'
      } transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
  
          <div className="group">
            <Link to="/" className="flex items-center space-x-2">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <Player
                  src="https://lottie.host/778898ab-2416-468b-b478-8a7f9f147995/ikoQSjnRZ6.json"
                  loop
                  autoplay
                  className="h-16 w-16"
                />
              </div>
              <h1 className="text-2xl font-bold mt-5 bg-gradient-to-r from-white to-teal-200 font-[MyFont] bg-clip-text text-transparent group-hover:from-teal-200 group-hover:to-white transition-all duration-300">
                BookiFy
              </h1>
            </Link>
          </div>

          <div className="hidden md:block max-w-md overflow-hidden rounded-lg bg-teal-700/50 px-4 py-2 border border-teal-600/30">
            <div className="text-lg font-medium text-white">
              <Quotes />
            </div>
          </div>

     
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="nav-link flex items-center space-x-1 hover:text-teal-300 transition-all duration-300">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/book/list" className="nav-link flex items-center space-x-1 hover:text-teal-300 transition-all duration-300">
              <Library size={18} />
              <span>Add Book</span>
            </Link>
            <Link to="/book/orders" className="nav-link flex items-center space-x-1 hover:text-teal-300 transition-all duration-300">
              <Package size={18} />
              <span>Orders</span>
            </Link>
            <Link to="/cart" className="nav-link flex items-center space-x-1 hover:text-teal-300 transition-all duration-300 relative">
              <ShoppingCart size={18} />
              <span>Cart</span>
              {/* Optional: Add cart count badge */}
              {/* {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )} */}
            </Link>
            
            {firebase.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-red-400 transition-all duration-300 cursor-pointer"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link to="/register" className="flex items-center hover:text-teal-300 space-x-1 transition-all duration-300">
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
                <Link to="/login" className="flex items-center space-x-1 hover:text-teal-300 transition-all duration-300 bg-teal-600 hover:bg-teal-500 px-3 py-1 rounded-full">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>

          <button 
            className="lg:hidden p-2 bg-teal-700 hover:bg-teal-600 rounded-full focus:outline-none transition-all duration-300" 
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavB;