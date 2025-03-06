
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-purple-50 z-0"></div>
      <div className="absolute inset-0 bg-dot-pattern z-0 opacity-50"></div>
      
      {/* Floating circles decoration */}
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-likha-teal/20 animate-float z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-likha-purple/20 animate-float z-0" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-likha-orange/20 animate-float z-0" style={{ animationDelay: '2s' }}></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-block animate-bounce-slight mb-3">
              <span className="bg-likha-purple/10 text-likha-purple text-sm font-medium px-4 py-2 rounded-full">
                Coming Soon to Google Play
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-likha-blue via-likha-purple to-likha-teal bg-clip-text text-transparent">
              Likha Learning<br />
              <span className="text-gray-800">For Young Minds</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              An engaging and inclusive learning platform designed for Kindergarten to Grade 3 learners, making education interactive, accessible, and fun.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a 
                href="#download" 
                className="btn-glow bg-likha-teal hover:bg-likha-teal/90 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                Download Now
              </a>
              <a 
                href="#features" 
                className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-xl font-medium border border-gray-200 transition-colors"
              >
                Explore Features
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Logo and App Showcase */}
              <img 
                src="/lovable-uploads/b5aea339-b819-4bbe-bdea-14646e56cfcb.png" 
                alt="Likha Application Banner" 
                className="w-full h-auto rounded-3xl animate-float"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-likha-yellow rotate-12 -z-10 opacity-70"></div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-2xl bg-likha-teal -rotate-12 -z-10 opacity-70"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slight hidden md:block">
          <ArrowDown className="text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
