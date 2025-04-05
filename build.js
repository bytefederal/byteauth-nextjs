const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean dist directory
console.log('Cleaning dist directory...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Compile TypeScript using local TypeScript installation
console.log('Compiling TypeScript...');
execSync('npx tsc -p tsconfig.build.json', { stdio: 'inherit' });

console.log('Build completed successfully!');