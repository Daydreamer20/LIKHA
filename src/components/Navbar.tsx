import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 sm:py-3 px-4 sm:px-6 md:px-12",
      isScrolled ? "glass shadow-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-1 sm:gap-2">
          <img 
            src="/lovable-uploads/Makabasa_mascot_merged_12-20-23 (2).png" 
            alt="DepEd Logo" 
            className="h-7 sm:h-8 object-contain animate-bounce-slight"
          />
          <span className="text-likha-purple font-display text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-likha-blue to-likha-purple bg-clip-text text-transparent">
            Likha
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          <a href="#features" className="font-medium text-gray-700 hover:text-likha-blue transition-colors text-sm lg:text-base relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-likha-blue transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#download" className="font-medium text-gray-700 hover:text-likha-blue transition-colors text-sm lg:text-base relative group">
            Download
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-likha-blue transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#faq" className="font-medium text-gray-700 hover:text-likha-blue transition-colors text-sm lg:text-base relative group">
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-likha-blue transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-1.5 sm:p-2 rounded-full hover:bg-gray-100/50 transition-colors border border-transparent hover:border-gray-200"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} className="text-likha-purple" /> : <Menu size={20} className="text-likha-purple" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-gradient-to-b from-white/95 to-purple-50/95 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center space-y-6 md:hidden",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Playful background elements for mobile menu */}
        <div className="absolute inset-0 bg-bubble-pattern opacity-20 z-0"></div>
        <div className="absolute inset-0 bg-confetti-pattern opacity-10 z-0"></div>
        
        {/* Mobile navigation items */}
        <a 
          href="#features" 
          className="font-display text-xl text-gray-800 hover:text-likha-purple transition-colors relative z-10 px-6 py-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Features
        </a>
        <a 
          href="#download" 
          className="font-display text-xl text-gray-800 hover:text-likha-purple transition-colors relative z-10 px-6 py-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Download
        </a>
        <a 
          href="#faq" 
          className="font-display text-xl text-gray-800 hover:text-likha-purple transition-colors relative z-10 px-6 py-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          FAQ
        </a>
        
        {/* Close button */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/70 border border-gray-200 shadow-sm z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>
        
        {/* Floating elements for mobile menu */}
        <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-likha-yellow/30 animate-float z-0"></div>
        <div className="absolute top-1/4 right-10 w-12 h-12 rounded-full bg-likha-teal/30 animate-float z-0" style={{ animationDelay: '1s' }}></div>
      </div>
    </nav>
  );
};

export default Navbar;
