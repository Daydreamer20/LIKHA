
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <span className="text-likha-purple font-display text-xl font-bold tracking-tight">
                Likha
              </span>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              An initiative by the Bureau of Learning Resources - Quality Assurance Division
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-500 hover:text-likha-blue transition-colors text-sm">Features</a></li>
                <li><a href="#download" className="text-gray-500 hover:text-likha-blue transition-colors text-sm">Download</a></li>
                <li><a href="#faq" className="text-gray-500 hover:text-likha-blue transition-colors text-sm">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-likha-blue transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-likha-blue transition-colors text-sm">Support</a></li>
                <li><a href="#" className="text-gray-500 hover:text-likha-blue transition-colors text-sm">Official Website</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Partner logos */}
        <div className="flex justify-center gap-8 mb-8">
          <img 
            src="/lovable-uploads/91c8fbf3-9478-4467-bf19-3d00b98afb89 (1).png" 
            alt="DepEd and Partner Logos" 
            className="h-16 object-contain" 
          />
        </div>

        <div className="border-t border-gray-200 mt-4 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Bureau of Learning Resources - Quality Assurance Division. All rights reserved.</p>
          <p className="mt-2"></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
