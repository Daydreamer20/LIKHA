# Supabase Storage Setup for LIKHA APK Files

This document provides instructions on how to set up Supabase storage for hosting APK files for the LIKHA application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com) if you don't have one)
2. The APK files you want to upload
3. Node.js version 14.16.0 or later installed on your computer
4. The @supabase/supabase-js package (install with `npm install @supabase/supabase-js`)

## Step 1: Set Up Your Supabase Project

1. Log in to your Supabase account
2. Create a new project if you don't have one already
3. Note down your project URL and API keys (found in Project Settings → API)

## Step 2: Get Your Service Role Key

To upload files to Supabase, you'll need a service role key with admin privileges:

1. In your Supabase dashboard, go to Project Settings → API
2. Scroll down to "Project API keys"
3. Copy the "service_role" key (this is private, never expose it in your code or repository)

## Step 3: Run the Upload Script

We've created a script to help you upload APK files to Supabase:

```bash
# Set your Supabase service key as an environment variable
export SUPABASE_SERVICE_KEY=your_service_role_key_here

# Run the upload script
node scripts/upload-apk.js /path/to/your/likha-kinder.apk
```

On Windows PowerShell:
```powershell
# Set your Supabase service key as an environment variable
$env:SUPABASE_SERVICE_KEY="your_service_role_key_here"

# Run the upload script
node scripts\upload-apk.js C:\path\to\your\likha-kinder.apk
```

The script will:
1. Create a bucket named 'apk-files' if it doesn't exist
2. Set the bucket to be publicly accessible
3. Upload the APK file with the proper name
4. Provide you with a public URL for the file

### Script Notes

The upload script uses ES modules (not CommonJS), which means:
- It requires Node.js version 14.16.0 or later
- It uses `import` syntax instead of `require()`
- Your project is already configured correctly with `"type": "module"` in package.json

## Step 4: Verify Your Setup

After uploading, you can verify the files are properly set up:

1. In your Supabase dashboard, go to Storage
2. You should see a bucket named 'apk-files'
3. Inside that bucket, you should see your uploaded APK files

## Troubleshooting

If you see "Bucket not found" errors in your application:

1. Make sure the bucket is named exactly 'apk-files' (case sensitive)
2. Ensure the bucket is set to public access
3. Check that your APK files are named:
   - likha-kinder.apk
   - likha-grade1.apk
   - likha-grade2.apk
   - likha-grade3.apk

If you need to modify the script for additional files:

1. Open `scripts/upload-apk.js`
2. Modify the `apkFiles` array to include all the files you want to upload

## Security Considerations

- The 'apk-files' bucket is set to public to allow direct downloads
- Anyone with the URL can download your APK files
- Service role key should be kept private and never committed to your repository 