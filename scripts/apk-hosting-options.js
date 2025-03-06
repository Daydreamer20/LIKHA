// APK Hosting Options Script
// This script provides information about alternative hosting options for large APK files
// when Supabase's free tier limit (50MB) is exceeded.

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get APK file info
const apkPath = process.argv[2];

if (!apkPath) {
  console.error('⛔ Please provide the path to the APK file');
  console.error('Usage: node scripts/apk-hosting-options.js <path-to-apk>');
  process.exit(1);
}

if (!fs.existsSync(apkPath)) {
  console.error(`⛔ File not found: ${apkPath}`);
  process.exit(1);
}

const stats = fs.statSync(apkPath);
const fileName = path.basename(apkPath);
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

console.log(`\n📱 APK File Information:`);
console.log(`File: ${fileName}`);
console.log(`Size: ${fileSizeMB} MB`);
console.log(`Path: ${apkPath}`);

if (fileSizeMB > 50) {
  console.log('\n⚠️ This file exceeds the 50MB limit of Supabase free tier.');
} else {
  console.log('\n✅ This file is within the 50MB limit of Supabase free tier.');
}

console.log('\n🌟 Alternative Hosting Options for Large APK Files:');

console.log('\n1️⃣ GitHub Releases (Recommended)');
console.log('   - Free for public repositories');
console.log('   - Up to 2GB per file');
console.log('   - Version control and release management');
console.log('   - Command: gh release create v1.0.0 ./path/to/likha-kinder.apk');
console.log('   - Downside: Requires users to have GitHub account to upload');

console.log('\n2️⃣ Firebase Storage');
console.log('   - Free tier: 5GB storage, 1GB/day download');
console.log('   - Easy integration with web apps');
console.log('   - Good download speeds globally');
console.log('   - Cost after free tier: ~$0.026/GB/month');

console.log('\n3️⃣ AWS S3');
console.log('   - Free tier for 12 months: 5GB storage');
console.log('   - Very reliable and scalable');
console.log('   - Cost after free tier: ~$0.023/GB/month');
console.log('   - Can set up with CloudFront for better download speeds');

console.log('\n4️⃣ Google Drive Direct Links');
console.log('   - Free 15GB storage (shared across Google services)');
console.log('   - Create shareable links to files');
console.log('   - No setup required, just upload and share');
console.log('   - Downside: Links may not be permanent');

console.log('\n5️⃣ Split the APK into smaller chunks');
console.log('   - Use a tool like 7zip to split the APK into smaller parts');
console.log('   - Host the parts on Supabase and provide instructions');
console.log('   - Downside: More complex for end users');

console.log('\n6️⃣ Upload to Google Play Store');
console.log('   - Professional distribution channel');
console.log('   - Handles updates and distribution');
console.log('   - One-time $25 registration fee');
console.log('   - Requires app to meet Play Store guidelines');

console.log('\n🛠️ Next Steps:');
console.log('1. Choose a hosting option based on your needs');
console.log('2. Update your website to point to the new download URL');
console.log('3. Consider creating a smaller version of your APK for faster downloads');

// Display GitHub Release command example if git is available
try {
  const isGitRepo = fs.existsSync(path.join(process.cwd(), '.git'));
  if (isGitRepo) {
    const repoUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const repoName = repoUrl.split('/').pop().replace('.git', '');
    
    console.log('\n📋 GitHub Release Example for this repository:');
    console.log(`gh release create v1.0.0 "${apkPath}" --title "Initial Release" --notes "Initial release of ${repoName}"`);
    console.log('Then the download URL would be something like:');
    console.log(`https://github.com/username/${repoName}/releases/download/v1.0.0/${fileName}`);
  }
} catch (error) {
  // Git commands failed, skip this section
}

console.log('\n🔗 If you decide to use GitHub Releases, update your website code with:');
console.log(`const APK_DOWNLOAD_URL = 'https://github.com/username/repo-name/releases/download/v1.0.0/${fileName}';`);

console.log('\nFor any hosting option, you can update your website to use the direct download link.');
console.log('If you need assistance setting up any of these options, let me know!'); 