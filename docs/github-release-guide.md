# GitHub Releases Guide for Hosting APK Files

This guide will walk you through the process of hosting your APK files using GitHub Releases, which is recommended for files exceeding Supabase's 50MB free tier limit.

## Benefits of GitHub Releases

- Free for public repositories
- Supports files up to 2GB in size
- Built-in version control and release management
- Reliable download URLs that won't change
- No additional service needed beyond your existing GitHub repository

## Prerequisites

1. GitHub CLI installed (optional but recommended)
   - Install from: https://cli.github.com/
2. Your APK file ready for distribution
3. A GitHub repository for your project

## Step 1: Create a GitHub Release

### Option A: Using GitHub CLI (Recommended)

1. Open a terminal or command prompt
2. Log in to GitHub CLI if you haven't already:
   ```
   gh auth login
   ```
3. Navigate to your project directory
4. Create a release with your APK file:
   ```
   gh release create v1.0.0 "path/to/likha-kinder.apk" --title "Initial Release" --notes "Initial release of the LIKHA educational app for kindergarten."
   ```

### Option B: Using GitHub Web Interface

1. Go to your repository on GitHub
2. Click on "Releases" in the right sidebar
3. Click "Create a new release"
4. Fill in the release details:
   - Tag version: `v1.0.0`
   - Release title: "Initial Release"
   - Description: Add relevant information about the APK
5. Drag and drop your APK file into the "Attach binaries" section
6. Click "Publish release"

## Step 2: Get the Download URL

Once your release is published, you'll need the download URL to update your website:

1. Go to your release page on GitHub
2. Right-click on the APK file and select "Copy link address"
3. The URL will be in this format:
   ```
   https://github.com/username/repo-name/releases/download/v1.0.0/likha-kinder.apk
   ```

## Step 3: Update Your Website

Now you need to update your website to use this new download URL:

1. Open your website code that handles the download URL
2. Replace any references to the Supabase URL with the GitHub release URL

For example, in your website code:

```javascript
// Old code
const APK_DOWNLOAD_URL = 'https://uveqzdpfaqrnketuutgf.supabase.co/storage/v1/object/public/apk-files/likha-kinder.apk';

// New code
const APK_DOWNLOAD_URL = 'https://github.com/Daydreamer20/LIKHA/releases/download/v1.0.0/likha-kinder.apk';
```

If your website uses an API to check for available APK files, you might need to update that code as well.

## Step 4: Handling Updates

When you need to release a new version:

1. Create a new release with an incremented version number (e.g., `v1.0.1`, `v1.1.0`, etc.)
2. Upload the new APK file
3. Update your website to point to the new version, or maintain a version system where users can choose which version to download

## Automatic Detection in Your Website

If your website is designed to detect APK files from Supabase, you might need to update it to work with GitHub URLs as well. Here's an example of how you could modify your code:

```javascript
// Function to get available APK files
async function getAvailableApks() {
  // Define the base URLs for APK hosting
  const githubBaseUrl = 'https://github.com/Daydreamer20/LIKHA/releases/download';
  
  // Define the versions and their files
  const apkVersions = [
    {
      version: 'v1.0.0',
      files: {
        kindergarten: 'likha-kinder.apk',
        // Add other grade levels here as they become available
      }
    }
    // Add future versions here
  ];
  
  // Create URLs for each APK
  const apks = apkVersions.map(version => {
    const versionApks = {};
    for (const [grade, filename] of Object.entries(version.files)) {
      versionApks[grade] = `${githubBaseUrl}/${version.version}/${filename}`;
    }
    return {
      version: version.version,
      apks: versionApks
    };
  });
  
  return apks;
}
```

## Additional Tips

1. **Update Tracking**: Consider implementing download tracking for your APK files using Google Analytics or a similar service
2. **Version Information**: Display version information on your website so users know which version they're downloading
3. **Changelog**: Maintain a changelog to communicate what's new in each version
4. **QR Code**: Generate a QR code that links directly to the APK download for easier mobile access

## Need Help?

If you need help implementing this solution, feel free to reach out or refer to GitHub's documentation on releases:
https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository 