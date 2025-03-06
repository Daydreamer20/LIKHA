// Test script to verify Supabase connection with a small file
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://uveqzdpfaqrnketuutgf.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseKey) {
  console.error('⛔ ERROR: SUPABASE_SERVICE_KEY environment variable not set!');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Create test file
const testFilePath = path.join(__dirname, 'test-file.txt');
fs.writeFileSync(testFilePath, 'This is a test file for Supabase storage upload.');

async function main() {
  try {
    console.log('🔄 Testing Supabase connection...');
    
    // 1. Check if bucket exists, create if needed
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw new Error(`Error listing buckets: ${bucketsError.message}`);
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === 'test-bucket');
    
    if (!bucketExists) {
      console.log('Creating test bucket...');
      const { error: createError } = await supabase.storage.createBucket('test-bucket', {
        public: true
      });
      
      if (createError) {
        throw new Error(`Error creating bucket: ${createError.message}`);
      }
      
      console.log('✅ Test bucket created');
    } else {
      console.log('✅ Test bucket already exists');
    }
    
    // 2. Upload test file
    console.log('Uploading test file...');
    const testFileContent = fs.readFileSync(testFilePath);
    
    const { error: uploadError } = await supabase.storage
      .from('test-bucket')
      .upload('test-file.txt', testFileContent, {
        contentType: 'text/plain',
        upsert: true
      });
    
    if (uploadError) {
      throw new Error(`Error uploading file: ${uploadError.message}`);
    }
    
    // 3. Get URL
    const { data: urlData } = await supabase.storage
      .from('test-bucket')
      .getPublicUrl('test-file.txt');
    
    console.log('✅ Test file uploaded successfully');
    console.log(`📎 Public URL: ${urlData.publicUrl}`);
    
    console.log('\n🔍 Supabase connection is working correctly!');
    console.log('The issue with the APK upload may be due to file size limitations.');
    console.log('Check your Supabase plan and limits at: https://supabase.com/dashboard/project/_/settings/billing');
    
    // Clean up
    fs.unlinkSync(testFilePath);
    
  } catch (error) {
    console.error(`⛔ Error: ${error.message}`);
  }
}

main(); 