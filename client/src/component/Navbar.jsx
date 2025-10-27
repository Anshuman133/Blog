import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import hamburgerIcon from '../assets/more.png';
import closeIcon from '../assets/close.png';

export const Navbar = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false);
 

  const navLinkClass = ({isActive}) => 
    isActive 
      ? "font-bold underline underline-offset-8" 
      : "hover:text-gray-600 transition-colors";

  return (
    <div className='mb-8 mx-5 md:mx-26 mt-10'>
      {/* Header */}
      <div className='flex justify-between items-center relative z-50'>
        <span className='text-xl font-semibold'>Your Name</span>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <nav className='hidden md:flex space-x-5 text-xl'>
          <NavLink to="/" end className={navLinkClass}>Blog</NavLink>
          <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/newsletter" className={navLinkClass}>Newsletter</NavLink>
        </nav>

        {/* Hamburger/Close Button - Visible on mobile only */}
        <button
          onClick={() => {setIsMenuOpen(!isMenuOpen)}}
          className='md:hidden focus:outline-none relative z-50'
          aria-label="Toggle menu"
        >
          <img
            src={isMenuOpen ? closeIcon : hamburgerIcon}
            alt={isMenuOpen ? "Close menu" : "Open menu"}
            className="w-8 h-8"
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
         <nav className='md:hidden flex flex-col justify-center items-center 
                        fixed top-0 left-0 w-full h-screen 
                        bg-linear-to-br from-blue-50 via-purple-50 to-pink-50
                        text-gray-800 z-40 space-y-6 text-2xl font-medium'>
          <NavLink 
            to="/" 
            end 
            className={navLinkClass} 
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/projects" 
            className={navLinkClass} 
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/about" 
            className={navLinkClass} 
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink 
            to="/newsletter" 
            className={navLinkClass} 
            onClick={() => setIsMenuOpen(false)}
          >
            Newsletter
          </NavLink>
        </nav>
      )}
    </div>
  )
}
