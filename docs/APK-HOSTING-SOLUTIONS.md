# APK Hosting Solutions for LIKHA App

This document provides various solutions for hosting your large APK files that exceed Supabase's 50MB free tier limit.

## The Challenge

The LIKHA app APK file is approximately 356MB in size, which exceeds the 50MB file size limit of Supabase's free tier. This means we need an alternative hosting solution.

## Available Scripts

We've created several helper scripts to assist with hosting your APK files:

### 1. `scripts/upload-apk.js`

This script attempts to upload an APK file to Supabase storage. It will work for APK files under 50MB, but will fail for larger files due to the free tier limitations.

**Usage:**
```bash
$env:NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"; $env:SUPABASE_SERVICE_ROLE_KEY="your-service-key"; node scripts/upload-apk.js "path/to/your/apk"
```

### 2. `scripts/apk-hosting-options.js`

This script analyzes your APK file and provides detailed information about alternative hosting options.

**Usage:**
```bash
node scripts/apk-hosting-options.js "path/to/your/apk"
```

### 3. `scripts/publish-to-github.js`

This is a convenient helper script that automates the process of publishing your APK file to GitHub Releases.

**Usage:**
```bash
node scripts/publish-to-github.js "path/to/your/apk" [version] [title] [notes]
```

Example:
```bash
node scripts/publish-to-github.js "public/downloads/likha-kinder.apk" "v1.0.0" "Initial Release" "First release of the LIKHA Kindergarten app"
```

## Recommended Solution: GitHub Releases

Based on our analysis, GitHub Releases is the most suitable option for hosting your APK files:

1. **Free**: No cost for public repositories
2. **Large file support**: Up to 2GB per file
3. **Built-in version control**: Easy to manage different versions of your app
4. **Reliable**: Download URLs will not change
5. **Simple integration**: Easy to integrate with your website

We've created a detailed guide on how to set up GitHub Releases for your APK files: [GitHub Releases Guide](github-release-guide.md)

## Alternative Solutions

If GitHub Releases doesn't meet your needs, here are other options to consider:

### Firebase Storage
- Free tier: 5GB storage, 1GB/day download
- Easy integration with web apps
- Good download speeds globally
- Cost after free tier: ~$0.026/GB/month

### AWS S3
- Free tier for 12 months: 5GB storage
- Very reliable and scalable
- Cost after free tier: ~$0.023/GB/month
- Can set up with CloudFront for better download speeds

### Google Drive Direct Links
- Free 15GB storage (shared across Google services)
- Create shareable links to files
- No setup required, just upload and share
- Downside: Links may not be permanent

### Google Play Store
- Professional distribution channel
- Handles updates and distribution
- One-time $25 registration fee
- Requires app to meet Play Store guidelines

## Upgrading Supabase Plan

Another option is to upgrade your Supabase plan to support larger file uploads:

- **Pro Plan**: $25/month, allows files up to 5GB
- **Team Plan**: $599/month, allows files up to 5GB with higher storage limits

This might be a good option if you're already using other Supabase features extensively.

## Next Steps

1. Choose the hosting solution that best meets your needs
2. Follow the corresponding guide to set up hosting
3. Update your website to point to the new download URL
4. Test the download link to ensure everything works correctly

## Need Help?

If you encounter any issues or need further assistance, please:
- Check the specific guides for each solution
- Review the troubleshooting tips in each guide
- Reach out for additional support if needed 