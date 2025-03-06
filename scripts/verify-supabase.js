// Script to verify Supabase credentials
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key length:', supabaseKey ? supabaseKey.length : 0);

if (!supabaseUrl) {
  console.error('⛔ ERROR: NEXT_PUBLIC_SUPABASE_URL environment variable not set!');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('⛔ ERROR: SUPABASE_SERVICE_KEY environment variable not set!');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  try {
    console.log('🔄 Testing Supabase connection...');
    
    // Try to get the project settings
    const { data, error } = await supabase.rpc('get_project_settings');
    
    if (error) {
      console.log('⚠️ Could not get project settings:', error.message);
      
      // Try a more basic operation instead - list buckets
      console.log('Trying to list storage buckets instead...');
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        throw new Error(`Error listing buckets: ${bucketsError.message}`);
      }
      
      console.log('✅ Successfully connected to Supabase!');
      console.log('Available buckets:', buckets.map(b => b.name).join(', '));
    } else {
      console.log('✅ Successfully connected to Supabase!');
      console.log('Project settings:', data);
    }
  } catch (error) {
    console.error(`⛔ Error: ${error.message}`);
    
    console.log('\n🔍 Troubleshooting tips:');
    console.log('1. Verify your Supabase URL and service key are correct');
    console.log('2. Make sure you\'re using the service_role key for admin operations');
    console.log('3. Check if your project is active in the Supabase dashboard');
  }
}

main(); 