import React, { useState, useEffect } from 'react';
import { FaDownload, FaAndroid, FaInfoCircle } from 'react-icons/fa';

/**
 * ApkDownload component for displaying and downloading APK files 
 * from GitHub Releases.
 */
const ApkDownload = () => {
  const [apkVersions, setApkVersions] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('kindergarten');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GitHub repository information
  const GITHUB_OWNER = 'Daydreamer20';
  const GITHUB_REPO = 'LIKHA';
  const GITHUB_RELEASE_BASE_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/download`;

  // Mock API call to get available APK versions
  // In a real app, you might fetch this from an API or define it statically
  useEffect(() => {
    // Simulate API delay
    setLoading(true);
    
    // This would be replaced with actual data from your backend or hardcoded values
    setTimeout(() => {
      // Example data structure for APK versions
      const versions = [
        {
          version: 'v1.0.0',
          releaseDate: '2023-08-15',
          apks: {
            kindergarten: {
              filename: 'likha-kinder.apk',
              size: '355.77 MB',
              url: `${GITHUB_RELEASE_BASE_URL}/v1.0.0/likha-kinder.apk`
            },
            // Add other grade levels when available
            // grade1: {
            //   filename: 'likha-grade1.apk',
            //   size: '360 MB',
            //   url: `${GITHUB_RELEASE_BASE_URL}/v1.0.0/likha-grade1.apk`
            // },
          }
        }
        // Add future versions here when released
      ];
      
      setApkVersions(versions);
      setLoading(false);
    }, 1000);
  }, []);

  // Get the latest version object
  const getLatestVersion = () => {
    if (apkVersions.length === 0) return null;
    return apkVersions[0]; // Assuming versions are sorted with newest first
  };

  // Get the download URL for the selected grade from the latest version
  const getDownloadUrl = () => {
    const latestVersion = getLatestVersion();
    if (!latestVersion || !latestVersion.apks[selectedGrade]) return null;
    return latestVersion.apks[selectedGrade].url;
  };

  // Get size information for the selected APK
  const getApkSize = () => {
    const latestVersion = getLatestVersion();
    if (!latestVersion || !latestVersion.apks[selectedGrade]) return 'Unknown size';
    return latestVersion.apks[selectedGrade].size;
  };

  // Get version information
  const getVersionInfo = () => {
    const latestVersion = getLatestVersion();
    if (!latestVersion) return 'Unknown version';
    return `${latestVersion.version} (${latestVersion.releaseDate})`;
  };

  // Handle download button click
  const handleDownload = () => {
    const downloadUrl = getDownloadUrl();
    if (downloadUrl) {
      // Create an invisible anchor element and trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', ''); // This attribute may not work for cross-origin URLs
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Track download event (if using analytics)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'download_apk', {
          version: getLatestVersion()?.version,
          grade: selectedGrade
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg shadow-sm border border-red-200">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Download</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-4">
        <FaAndroid className="text-green-600 text-3xl mr-3" />
        <div>
          <h3 className="text-xl font-bold mb-1">Download LIKHA App</h3>
          <p className="text-sm text-gray-600">Version: {getVersionInfo()}</p>
        </div>
      </div>

      {apkVersions.length > 0 ? (
        <>
          {Object.keys(getLatestVersion()?.apks || {}).length > 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Grade Level
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {Object.keys(getLatestVersion()?.apks || {}).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade.charAt(0).toUpperCase() + grade.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="bg-gray-50 p-3 rounded-md mb-4 flex items-center">
            <FaInfoCircle className="text-blue-500 mr-2 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p>File size: {getApkSize()}</p>
              <p>This app will work on most Android devices (Android 6.0 and above)</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 flex items-center justify-center"
          >
            <FaDownload className="mr-2" />
            Download APK
          </button>

          <div className="mt-4 text-xs text-gray-500">
            <p>
              After downloading, you might need to allow installation from unknown sources in your 
              device settings. This is a standard Android security feature.
            </p>
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <p className="text-yellow-700">
            No APK files are currently available for download. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApkDownload; 