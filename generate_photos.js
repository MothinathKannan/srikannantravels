#!/usr/bin/env node
/**
 * generate_photos.js
 * Scans photos/ folder and writes photos/photos.json
 * Cloudflare Pages runs this automatically via package.json build script.
 * You can also run it manually: node generate_photos.js
 */

const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, 'photos');
const OUTPUT    = path.join(PHOTOS_DIR, 'photos.json');
const EXTS      = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const EXCLUDE   = new Set(['hero.jpg', 'photos.json']);

if (!fs.existsSync(PHOTOS_DIR)) {
  console.error("Error: photos/ folder not found.");
  process.exit(1);
}

const files = fs.readdirSync(PHOTOS_DIR)
  .filter(f => EXTS.has(path.extname(f).toLowerCase()) && !EXCLUDE.has(f))
  .sort();

fs.writeFileSync(OUTPUT, JSON.stringify(files, null, 2));
console.log(`✓ photos.json written — ${files.length} photos found.`);
