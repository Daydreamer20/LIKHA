import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 lg:pt-40 md:pb-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-purple-50 to-yellow-50 z-0"></div>
      
      {/* Playful background patterns */}
      <div className="absolute inset-0 bg-dot-pattern z-0 opacity-30"></div>
      <div className="absolute inset-0 bg-bubble-pattern z-0 opacity-50 md:opacity-70"></div>
      <div className="absolute inset-0 bg-confetti-pattern z-0 opacity-40 md:opacity-60"></div>
      
      {/* Animated background elements for kids - hidden on small screens, visible on larger screens */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Cloud shapes - simplified for mobile */}
        <div className="absolute top-[5%] left-[5%] w-16 h-8 md:w-24 md:h-12 rounded-full bg-white opacity-60 md:opacity-80 animate-float hidden sm:block"></div>
        <div className="absolute top-[10%] left-[15%] w-20 h-10 md:w-32 md:h-16 rounded-full bg-white opacity-60 md:opacity-80 animate-float hidden sm:block" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[8%] right-[10%] w-24 h-10 md:w-36 md:h-16 rounded-full bg-white opacity-60 md:opacity-80 animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Stars - reduced for mobile */}
        <div className="absolute top-[15%] right-[15%] w-4 h-4 md:w-6 md:h-6 bg-likha-yellow rotate-45 animate-pulse opacity-50 md:opacity-70" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[35%] left-[25%] w-3 h-3 md:w-4 md:h-4 bg-likha-pink rotate-45 animate-pulse opacity-50 md:opacity-70 hidden sm:block" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-[35%] right-[25%] w-3 h-3 md:w-5 md:h-5 bg-likha-teal rotate-45 animate-pulse opacity-50 md:opacity-70" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Rainbow arc - adjusted for mobile */}
        <div className="absolute -top-[25%] -left-[10%] w-[70%] h-[50%] md:-top-[15%] md:-left-[5%] md:w-[50%] md:h-[50%] border-[10px] md:border-[15px] border-t-likha-orange border-r-likha-yellow border-b-likha-teal border-l-likha-purple rounded-full opacity-10 md:opacity-20 hidden sm:block"></div>
        
        {/* Animated sun - visible on all screens */}
        <div className="absolute top-[10%] right-[8%] w-16 h-16 md:top-[15%] md:right-[5%] md:w-24 md:h-24 rounded-full bg-likha-yellow animate-pulse-rainbow opacity-20 md:opacity-30"></div>
      </div>
      
      {/* Floating circles decoration - optimized for mobile */}
      <div className="absolute top-1/4 left-5 md:left-10 w-16 h-16 md:w-24 md:h-24 rounded-full bg-likha-teal/20 md:bg-likha-teal/30 animate-float z-0"></div>
      <div className="absolute bottom-1/4 right-5 md:right-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-likha-purple/20 md:bg-likha-purple/30 animate-float z-0" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-likha-orange/20 md:bg-likha-orange/30 animate-float z-0 hidden sm:block" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-14 h-14 md:w-20 md:h-20 rounded-full bg-likha-pink/20 md:bg-likha-pink/30 animate-float z-0 hidden sm:block" style={{ animationDelay: '3s' }}></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-12 text-center lg:text-left mb-10 lg:mb-0">
            <div className="inline-block animate-bounce-slight mb-3">
              <span className="bg-likha-purple/10 text-likha-purple text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                Coming Soon to Google Play
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-likha-blue via-likha-purple to-likha-teal bg-clip-text text-transparent">
              Likha Application<br />
              <span className="text-gray-800"></span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              An engaging and inclusive learning platform designed for Kindergarten to Grade 3 learners, making education interactive, accessible, and fun.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <a 
                href="#download" 
                className="btn-glow bg-likha-teal hover:bg-likha-teal/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base"
              >
                Download Now
              </a>
              <a 
                href="#features" 
                className="bg-white hover:bg-gray-50 text-gray-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium border border-gray-200 transition-colors text-sm sm:text-base"
              >
                Explore Features
              </a>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto lg:w-1/2 relative mt-4 lg:mt-0">
            <div className="relative w-full max-w-md sm:max-w-lg mx-auto">
              {/* Logo and App Showcase */}
              <img 
                src="/lovable-uploads/b5aea339-b819-4bbe-bdea-14646e56cfcb.png" 
                alt="Likha Application Banner" 
                className="w-full h-auto rounded-2xl sm:rounded-3xl animate-float shadow-lg"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-likha-yellow rotate-12 -z-10 opacity-70 sm:opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl bg-likha-teal -rotate-12 -z-10 opacity-70 sm:opacity-80"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - now hidden on mobile, visible on tablet and up */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slight hidden md:block">
          <ArrowDown className="text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
