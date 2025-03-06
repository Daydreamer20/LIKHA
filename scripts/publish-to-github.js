#!/usr/bin/env node
// Script to help publish APK files to GitHub Releases
// This is a helper script that uses GitHub CLI to publish APK files to GitHub Releases
// Usage: node scripts/publish-to-github.js <path-to-apk> [version] [title] [notes]

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promise-based prompt function
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    // Get APK file path from command line argument
    const apkPath = process.argv[2];
    
    if (!apkPath) {
      console.error('⛔ Please provide the path to the APK file');
      console.error('Usage: node scripts/publish-to-github.js <path-to-apk> [version] [title] [notes]');
      process.exit(1);
    }
    
    // Check if file exists
    if (!fs.existsSync(apkPath)) {
      console.error(`⛔ File not found: ${apkPath}`);
      process.exit(1);
    }
    
    const fileName = path.basename(apkPath);
    const stats = fs.statSync(apkPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`\n📱 APK File Information:`);
    console.log(`File: ${fileName}`);
    console.log(`Size: ${fileSizeMB} MB`);
    console.log(`Path: ${apkPath}`);
    
    // Check if GitHub CLI is installed
    try {
      execSync('gh --version', { stdio: 'ignore' });
      console.log('✅ GitHub CLI is installed');
    } catch (error) {
      console.error('⛔ GitHub CLI is not installed. Please install it from: https://cli.github.com/');
      console.log('After installing, run "gh auth login" to authenticate with GitHub.');
      process.exit(1);
    }
    
    // Check if user is logged in to GitHub CLI
    try {
      const statusOutput = execSync('gh auth status', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      console.log('✅ GitHub CLI is authenticated');
    } catch (error) {
      console.error('⛔ You need to log in to GitHub CLI. Run "gh auth login" first.');
      process.exit(1);
    }
    
    // Check if current directory is a git repository
    let repoName = '';
    try {
      const isGitRepo = fs.existsSync(path.join(process.cwd(), '.git'));
      if (!isGitRepo) {
        throw new Error('Not a git repository');
      }
      
      const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
      repoName = remoteUrl.split('/').pop().replace('.git', '');
      
      console.log(`✅ Current directory is a git repository: ${repoName}`);
    } catch (error) {
      console.error('⛔ Current directory is not a git repository or has no remote.');
      process.exit(1);
    }
    
    // Get version, title, and notes from command line or prompt user
    let version = process.argv[3];
    let title = process.argv[4];
    let notes = process.argv[5];
    
    if (!version) {
      version = await prompt('Enter version (e.g., v1.0.0): ');
      if (!version) {
        version = 'v1.0.0';
        console.log(`Using default version: ${version}`);
      }
    }
    
    if (!title) {
      title = await prompt('Enter release title: ');
      if (!title) {
        title = `${repoName} Release ${version}`;
        console.log(`Using default title: ${title}`);
      }
    }
    
    if (!notes) {
      notes = await prompt('Enter release notes (or press Enter for default): ');
      if (!notes) {
        notes = `Release ${version} of ${repoName}`;
        console.log(`Using default notes: ${notes}`);
      }
    }
    
    // Close readline interface
    rl.close();
    
    // Confirm with user
    console.log('\n🚀 Release Information:');
    console.log(`Version: ${version}`);
    console.log(`Title: ${title}`);
    console.log(`Notes: ${notes}`);
    console.log(`File: ${fileName}`);
    
    console.log('\n⏳ Creating GitHub release...');
    
    // Create GitHub release
    const command = `gh release create ${version} "${apkPath}" --title "${title}" --notes "${notes}"`;
    
    console.log(`Running: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    
    console.log('\n✅ Release created successfully!');
    console.log(output);
    
    // Get the download URL
    const downloadUrl = `https://github.com/${output.split('/')[3]}/${output.split('/')[4]}/releases/download/${version}/${fileName}`;
    
    console.log('\n📎 Download URL:');
    console.log(downloadUrl);
    
    console.log('\nCode snippet to use in your website:');
    console.log(`const APK_DOWNLOAD_URL = '${downloadUrl}';`);
    
  } catch (error) {
    console.error(`\n⛔ Error: ${error.message}`);
    process.exit(1);
  }
}

main(); 