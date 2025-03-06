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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-6 md:px-12",
      isScrolled ? "glass shadow-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/91c8fbf3-9478-4467-bf19-3d00b98afb89 (1).png" 
            alt="DepEd Logo" 
            className="h-8 object-contain"
          />
          <span className="text-likha-purple font-display text-2xl font-bold tracking-tight">
            Likha
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="font-medium text-gray-700 hover:text-likha-blue transition-colors">Features</a>
          <a href="#download" className="font-medium text-gray-700 hover:text-likha-blue transition-colors">Download</a>
          <a href="#faq" className="font-medium text-gray-700 hover:text-likha-blue transition-colors">FAQ</a>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white/95 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center space-y-8 md:hidden",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <a 
          href="#features" 
          className="font-display text-xl text-gray-800 hover:text-likha-purple transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Features
        </a>
        <a 
          href="#download" 
          className="font-display text-xl text-gray-800 hover:text-likha-purple transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Download
        </a>
        <a 
          href="#faq" 
          className="font-display text-xl text-gray-800 hover:text-likha-purple transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          FAQ
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
