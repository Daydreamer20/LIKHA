
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [files, setFiles] = useState<{ name: string, url: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from('apk-files')
        .list();
      
      if (error) throw error;
      
      if (data) {
        const fileUrls = await Promise.all(
          data.map(async (file) => {
            const { data: urlData } = await supabase
              .storage
              .from('apk-files')
              .getPublicUrl(file.name);
            
            return {
              name: file.name,
              url: urlData.publicUrl
            };
          })
        );
        
        setFiles(fileUrls);
      }
    } catch (error: any) {
      console.error('Error fetching files:', error.message);
      toast({
        title: "Error",
        description: `Failed to fetch files: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    
    if (fileExt !== 'apk') {
      toast({
        title: "Invalid file",
        description: "Only APK files are allowed",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      const { error } = await supabase
        .storage
        .from('apk-files')
        .upload(file.name, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `File ${file.name} uploaded successfully`,
      });
      
      await fetchFiles();
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
      toast({
        title: "Error",
        description: `Failed to upload file: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-8">Admin - APK Upload</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload APK File</h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select APK file</label>
          <input 
            type="file" 
            accept=".apk"
            onChange={handleFileUpload}
            disabled={uploading}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {uploading && <p className="mt-2 text-sm text-gray-600">Uploading...</p>}
        </div>
        
        <div className="mt-8">
          <h3 className="font-medium mb-3">Uploaded APK Files</h3>
          
          {files.length === 0 && (
            <p className="text-gray-500">No APK files uploaded yet.</p>
          )}
          
          <ul className="space-y-3">
            {files.map((file) => (
              <li key={file.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>{file.name}</span>
                <div className="flex space-x-2">
                  <a 
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
