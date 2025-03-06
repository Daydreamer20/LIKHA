// Script to upload APK files to Supabase storage
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://uveqzdpfaqrnketuutgf.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''; // Use service key for admin operations

// Check if service key is provided
if (!supabaseKey) {
  console.error('⛔ ERROR: SUPABASE_SERVICE_KEY environment variable not set!');
  console.log('You need to set your Supabase service key to upload files.');
  console.log('Get your service key from the Supabase dashboard -> Project Settings -> API');
  console.log('Then run: SUPABASE_SERVICE_KEY=your_key node scripts/upload-apk.js');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// APK files to upload
const apkFiles = [
  { name: 'likha-kinder.apk', path: process.argv[2] || path.join(__dirname, '../public/downloads/likha-kinder.apk') }
  // Add other APK files when you have them
  // { name: 'likha-grade1.apk', path: ... },
  // { name: 'likha-grade2.apk', path: ... },
  // { name: 'likha-grade3.apk', path: ... }
];

// Create bucket if it doesn't exist
async function createBucketIfNotExists() {
  try {
    // Check if bucket exists
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      throw error;
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === 'apk-files');
    
    if (!bucketExists) {
      console.log('Creating "apk-files" bucket...');
      const { data, error } = await supabase.storage.createBucket('apk-files', {
        public: true, // Make bucket public
        fileSizeLimit: 500 * 1024 * 1024 // 500MB limit
      });
      
      if (error) {
        throw error;
      }
      
      console.log('✅ "apk-files" bucket created successfully!');
    } else {
      console.log('✅ "apk-files" bucket already exists!');
    }
    
    // Make sure bucket is public
    const { error: updateError } = await supabase.storage.updateBucket('apk-files', {
      public: true
    });
    
    if (updateError) {
      console.warn('Warning: Could not update bucket settings:', updateError.message);
    } else {
      console.log('✅ Bucket updated to be public');
    }
    
    return true;
  } catch (error) {
    console.error('⛔ Error creating/checking bucket:', error.message);
    return false;
  }
}

// Upload a file to Supabase storage
async function uploadFile(fileName, filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`⛔ File not found: ${filePath}`);
      return false;
    }
    
    console.log(`Uploading ${fileName}...`);
    
    // Read file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('apk-files')
      .upload(fileName, fileBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true // Overwrite if exists
      });
    
    if (error) {
      throw error;
    }
    
    // Get public URL
    const { data: urlData } = await supabase.storage
      .from('apk-files')
      .getPublicUrl(fileName);
    
    console.log(`✅ Uploaded ${fileName} successfully!`);
    console.log(`📎 Public URL: ${urlData.publicUrl}`);
    return true;
  } catch (error) {
    console.error(`⛔ Error uploading ${fileName}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting APK upload to Supabase...');
  
  // Create bucket if needed
  const bucketReady = await createBucketIfNotExists();
  if (!bucketReady) {
    process.exit(1);
  }
  
  // Upload each file
  let successCount = 0;
  for (const file of apkFiles) {
    const success = await uploadFile(file.name, file.path);
    if (success) {
      successCount++;
    }
  }
  
  console.log(`\n📊 Upload summary: ${successCount}/${apkFiles.length} files uploaded successfully`);
  
  if (successCount === apkFiles.length) {
    console.log('✅ All files uploaded successfully!');
  } else {
    console.log('⚠️ Some files failed to upload. Check the errors above.');
  }
}

// Run the script
main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 