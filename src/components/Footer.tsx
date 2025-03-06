import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 sm:py-12 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center mb-8">
          <div className="w-full md:w-auto mb-8 md:mb-0 text-center">
            <div className="flex flex-col items-center justify-center mb-2">
              <span className="text-likha-purple font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-likha-blue to-likha-purple bg-clip-text text-transparent">
                Likha
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-[300px] mx-auto text-center">
              An initiative by the Bureau of Learning Resources - Quality Assurance Division
            </p>
          </div>

          <div className="flex flex-row md:flex-row gap-8 sm:gap-12 justify-center w-full md:w-auto">
            <div>
              <h4 className="font-medium text-gray-800 mb-3 text-center md:text-left">Navigation</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li><a href="#features" className="text-gray-500 hover:text-likha-blue transition-colors text-sm block py-1">Features</a></li>
                <li><a href="#download" className="text-gray-500 hover:text-likha-blue transition-colors text-sm block py-1">Download</a></li>
                <li><a href="#faq" className="text-gray-500 hover:text-likha-blue transition-colors text-sm block py-1">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3 text-center md:text-left">Connect</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li><a href="#" className="text-gray-500 hover:text-likha-blue transition-colors text-sm block py-1">Contact Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-likha-blue transition-colors text-sm block py-1">Support</a></li>
                <li><a href="#" className="text-gray-500 hover:text-likha-blue transition-colors text-sm block py-1">Official Website</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Partner logos */}
        <div className="flex justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <img 
            src="/lovable-uploads/91c8fbf3-9478-4467-bf19-3d00b98afb89 (1).png" 
            alt="DepEd and Partner Logos" 
            className="h-12 sm:h-16 object-contain" 
          />
        </div>

        <div className="border-t border-gray-200 mt-4 pt-6 sm:pt-8 text-center text-gray-500 text-xs sm:text-sm">
          <p>© {currentYear} Bureau of Learning Resources - Quality Assurance Division.</p>
          <p className="mt-1">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
