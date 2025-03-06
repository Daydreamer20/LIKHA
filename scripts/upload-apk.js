// Script to upload APK files to Supabase storage
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration - use the correct environment variable
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uveqzdpfaqrnketuutgf.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Constants
const BUCKET_NAME = 'apk-files';
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit for free tier

if (!supabaseKey) {
  console.error('⛔ ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable not set!');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Check if a bucket exists, create it if it doesn't
 */
async function ensureBucketExists() {
  try {
    console.log(`Checking if bucket '${BUCKET_NAME}' exists...`);
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw new Error(`Error listing buckets: ${bucketsError.message}`);
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log(`Creating bucket '${BUCKET_NAME}'...`);
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE
      });
      
      if (createError) {
        throw new Error(`Error creating bucket: ${createError.message}`);
      }
      
      console.log('✅ Bucket created successfully');
    } else {
      console.log('✅ Bucket already exists');
      
      // Update bucket settings to ensure correct filesize limit
      const { error: updateError } = await supabase.storage.updateBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE
      });
      
      if (updateError) {
        console.warn(`Warning: Could not update bucket settings: ${updateError.message}`);
      } else {
        console.log('✅ Bucket settings updated');
      }
    }
    
    return true;
  } catch (error) {
    console.error(`⛔ Error with bucket: ${error.message}`);
    return false;
  }
}

/**
 * Upload a file to Supabase Storage
 */
async function uploadFile(filePath) {
  try {
    // Get file info
    const stats = fs.statSync(filePath);
    const fileName = path.basename(filePath);
    
    console.log(`Uploading ${fileName} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)...`);
    
    // Check if file exceeds size limit
    if (stats.size > MAX_FILE_SIZE) {
      console.error(`⛔ File size (${(stats.size / (1024 * 1024)).toFixed(2)} MB) exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      console.error('This is a limitation of the Supabase free tier. Consider upgrading your plan or reducing the file size.');
      return false;
    }
    
    // Check if file already exists (to avoid unnecessary uploads)
    const { data: existingFiles, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list();
      
    if (listError) {
      console.warn(`Warning: Could not check if file already exists: ${listError.message}`);
    } else if (existingFiles.some(f => f.name === fileName)) {
      console.log(`File ${fileName} already exists. Updating...`);
    }
    
    // Read file as buffer
    const fileBuffer = fs.readFileSync(filePath);
    
    // Upload file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true
      });
    
    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
    
    // Get public URL
    const { data: urlData } = await supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);
    
    console.log('✅ File uploaded successfully!');
    console.log(`📎 Public URL: ${urlData.publicUrl}`);
    return true;
  } catch (error) {
    console.error(`⛔ Error uploading file: ${error.message}`);
    return false;
  }
}

async function main() {
  try {
    // Get APK file path from command line argument
    const apkFilePath = process.argv[2];
    
    if (!apkFilePath) {
      console.error('⛔ Please provide the path to the APK file');
      console.error('Usage: node scripts/upload-apk.js <path-to-apk>');
      process.exit(1);
    }
    
    // Check if file exists
    if (!fs.existsSync(apkFilePath)) {
      console.error(`⛔ File not found: ${apkFilePath}`);
      process.exit(1);
    }
    
    console.log(`🚀 Starting APK upload to Supabase...\n`);
    
    // Ensure bucket exists
    const bucketReady = await ensureBucketExists();
    if (!bucketReady) {
      process.exit(1);
    }
    
    // Upload file
    const uploadSuccess = await uploadFile(apkFilePath);
    if (!uploadSuccess) {
      process.exit(1);
    }
    
    console.log('\n✨ Done! The APK is now available on Supabase Storage');
    console.log('Make sure you update any references in your website to use the new URL');
    
  } catch (error) {
    console.error(`⛔ Error: ${error.message}`);
    process.exit(1);
  }
}

main(); 