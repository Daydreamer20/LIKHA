import React, { useEffect, useRef, useState } from 'react';
import { Download, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const DownloadSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [downloadUrls, setDownloadUrls] = useState({
    kinder: '/downloads/likha-kinder.apk', // Default to local files as fallback
    grade1: '/downloads/likha-grade1.apk',
    grade2: '/downloads/likha-grade2.apk',
    grade3: '/downloads/likha-grade3.apk'
  });
  const [supabseStatus, setSupabaseStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  useEffect(() => {
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
      // Get URLs for each app version
      const appFiles = ['likha-kinder.apk', 'likha-grade1.apk', 'likha-grade2.apk', 'likha-grade3.apk'];
      const urls = {
        kinder: '/downloads/likha-kinder.apk', // Default to local files as fallback
        grade1: '/downloads/likha-grade1.apk',
        grade2: '/downloads/likha-grade2.apk',
        grade3: '/downloads/likha-grade3.apk'
      };
      
      // Check if the bucket exists first
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error checking Supabase buckets:', bucketsError);
        setSupabaseStatus('error');
        return;
      }
      
      const bucketExists = buckets.some(bucket => bucket.name === 'apk-files');
      
      if (!bucketExists) {
        console.warn('apk-files bucket does not exist in Supabase');
        setSupabaseStatus('error');
        return;
      }
      
      // Get a list of files in the bucket to verify they exist
      const { data: files, error: filesError } = await supabase.storage
        .from('apk-files')
        .list();
        
      if (filesError) {
        console.error('Error listing files in Supabase bucket:', filesError);
        setSupabaseStatus('error');
        return;
      }
      
      const fileMap = files.reduce((map, file) => {
        map[file.name] = true;
        return map;
      }, {} as Record<string, boolean>);
      
      // Get URLs only for files that exist in the bucket
      for (const fileName of appFiles) {
        if (!fileMap[fileName]) {
          console.warn(`File ${fileName} not found in Supabase bucket`);
          continue;
        }
        
        const { data } = await supabase.storage
          .from('apk-files')
          .getPublicUrl(fileName);
        
        if (data && data.publicUrl) {
          if (fileName === 'likha-kinder.apk') urls.kinder = data.publicUrl;
          if (fileName === 'likha-grade1.apk') urls.grade1 = data.publicUrl;
          if (fileName === 'likha-grade2.apk') urls.grade2 = data.publicUrl;
          if (fileName === 'likha-grade3.apk') urls.grade3 = data.publicUrl;
        }
      }
      
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
            
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Installation Tip:</strong> After downloading, you may need to allow installation from unknown sources in your device settings. Go to Settings → Security → Unknown Sources.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>For Teachers:</strong> Each APK file contains content specific to that grade level. Download the appropriate version for your students or install all for a complete learning resource.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4 mx-auto max-w-md">
              {/* App Screenshots */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-8 border-white animate-float" style={{ animationDelay: '0.2s' }}>
                <img 
                  src="/lovable-uploads/18f38c0b-6314-4fbe-864b-24f4e09cdbd7.png" 
                  alt="Likha Kinder App" 
                  className="w-full h-auto" 
                />
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-xl border-8 border-white animate-float" style={{ animationDelay: '0.4s' }}>
                <img 
                  src="/lovable-uploads/f4362166-1dd2-4faf-8297-b80085ae3f59.png" 
                  alt="Likha Grade 1 App" 
                  className="w-full h-auto" 
                />
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-xl border-8 border-white animate-float" style={{ animationDelay: '0.6s' }}>
                <img 
                  src="/lovable-uploads/4f055fec-2db6-45bf-a20d-0077135b1822.png" 
                  alt="Likha Grade 2 App" 
                  className="w-full h-auto" 
                />
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-xl border-8 border-white animate-float" style={{ animationDelay: '0.8s' }}>
                <img 
                  src="/lovable-uploads/cf661669-248f-4778-b7bb-4aec6422d5f7.png" 
                  alt="Likha Grade 3 App" 
                  className="w-full h-auto" 
                />
              </div>
              
              {/* Decoration */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-likha-purple/20 -z-10"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-likha-teal/20 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
