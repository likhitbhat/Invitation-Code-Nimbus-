const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Building dist directory for Vercel...');
const dist = path.join(__dirname, 'dist');
fs.mkdirSync(dist, { recursive: true });

// Copy index.html
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(dist, 'index.html'));

// Copy folders
['assets', 'media', 'favicons'].forEach(folder => {
  if (fs.existsSync(path.join(__dirname, folder))) {
    console.log(`Copying ${folder}...`);
    copyDirSync(path.join(__dirname, folder), path.join(dist, folder));
  }
});

console.log('dist directory built successfully!');
