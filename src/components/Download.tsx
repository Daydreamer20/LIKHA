import React, { useEffect, useRef, useState } from 'react';
import { Download, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const DownloadSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [downloadUrls, setDownloadUrls] = useState({
    kinder: 'https://github.com/Daydreamer20/LIKHA/releases/download/v1.0.0/likha-kinder.apk', // GitHub release URL
    grade1: '/downloads/likha-grade1.apk',
    grade2: '/downloads/likha-grade2.apk',
    grade3: '/downloads/likha-grade3.apk'
  });
  const [supabseStatus, setSupabaseStatus] = useState<'loading' | 'success' | 'error'>('success');
  
  useEffect(() => {
    // We're not using Supabase for the kindergarten APK anymore, but 
    // keeping the function for other grade levels if needed
    fetchDownloadUrls();
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  const fetchDownloadUrls = async () => {
    try {
      // We're using GitHub releases for the kindergarten APK
      // but keeping the Supabase option for other grade levels if needed
      const urls = {
        kinder: 'https://github.com/Daydreamer20/LIKHA/releases/download/v1.0.0/likha-kinder.apk',
        grade1: '/downloads/likha-grade1.apk',
        grade2: '/downloads/likha-grade2.apk',
        grade3: '/downloads/likha-grade3.apk'
      };
      
      // We're skipping Supabase bucket checks for the kinder app
      // but keeping the code for other grade levels if needed
      
      setDownloadUrls(urls);
      setSupabaseStatus('success');
    } catch (error) {
      console.error('Error fetching download URLs:', error);
      setSupabaseStatus('error');
    }
  };

  return (
    <section id="download" className="py-20 md:py-32 relative" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50 z-0"></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div 
            ref={contentRef}
            className="lg:w-1/2 scroll-reveal"
          >
            <span className="bg-likha-orange/10 text-likha-orange text-sm font-medium px-4 py-2 rounded-full">
              Available Now
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
              Download the Likha App Today
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              While we await approval from the Google Play Store, you can download and install the Likha application directly. It works on both tablets and smartphones running Android.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-likha-teal">
                  <Check size={20} />
                </div>
                <p className="text-gray-700">Works offline for continuous learning anytime, anywhere</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-likha-teal">
                  <Check size={20} />
                </div>
                <p className="text-gray-700">Compatible with Android 6.0 and above</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-likha-teal">
                  <Check size={20} />
                </div>
                <p className="text-gray-700">Regular updates with new content and features</p>
              </div>
            </div>
            
            {supabseStatus === 'loading' && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full mt-0.5"></div>
                <p className="text-blue-800 text-sm">
                  Checking download availability...
                </p>
              </div>
            )}
            
            {supabseStatus === 'error' && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> We're experiencing some issues with our cloud storage. Downloads will use fallback method which may be slower than usual.
                </p>
              </div>
            )}
            
            {supabseStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <Check size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-green-800 text-sm">
                  <strong>All set!</strong> Download links are ready. Click below to download the APK files.
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <a 
                href={downloadUrls.kinder} 
                download
                className="inline-flex items-center gap-2 btn-glow bg-likha-purple hover:bg-likha-purple/90 text-white px-8 py-3 rounded-xl font-medium transition-colors w-full md:w-auto justify-center"
              >
                <Download size={20} />
                Download Kinder App
              </a>
              
              <a 
                href={downloadUrls.grade1} 
                download
                className="inline-flex items-center gap-2 btn-glow bg-likha-teal hover:bg-likha-teal/90 text-white px-8 py-3 rounded-xl font-medium transition-colors w-full md:w-auto justify-center"
              >
                <Download size={20} />
                Download Grade 1 App
              </a>
              
              <a 
                href={downloadUrls.grade2} 
                download
                className="inline-flex items-center gap-2 btn-glow bg-likha-blue hover:bg-likha-blue/90 text-white px-8 py-3 rounded-xl font-medium transition-colors w-full md:w-auto justify-center"
              >
                <Download size={20} />
                Download Grade 2 App
              </a>
              
              <a 
                href={downloadUrls.grade3} 
                download
                className="inline-flex items-center gap-2 btn-glow bg-likha-orange hover:bg-likha-orange/90 text-white px-8 py-3 rounded-xl font-medium transition-colors w-full md:w-auto justify-center"
              >
                <Download size={20} />
                Download Grade 3 App
              </a>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Version 1.0.0 • Released April 2024
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Note:</strong> The Kindergarten app (355.77 MB) is hosted on GitHub Releases for reliable downloads.
            </p>
          </div>
          
          <div className="lg:w-1/2 h-[400px] md:h-[500px] relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md aspect-[680/460]">
              <div className="absolute inset-0 opacity-30">
                <svg width="680" height="460" viewBox="0 0 680 460" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M672.5 138.739C674.761 102.029 680.995 23.9491 626.293 5.85748C560.991 -15.5298 442.012 61.2391 373.496 66.7423C304.98 72.2454 250.036 53.9186 171.843 64.925C93.6501 75.9314 -33.1756 150.492 8.32447 222.685C49.8245 294.877 183.849 310.036 249.536 327.112C315.224 344.188 302.467 354.694 381.751 401.946C461.034 449.198 611.961 480.714 659.326 426.729C706.691 372.744 670.239 175.45 672.5 138.739Z" fill="currentColor"/>
                </svg>
              </div>
              <img 
                src="/images/phone-app.png" 
                alt="Likha App on Phone" 
                className="w-full h-full object-contain z-10 relative"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
