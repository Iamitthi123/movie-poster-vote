const fs = require('fs');
const appJs = fs.readFileSync('js/app.js', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const regex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const ids = new Set();
while ((match = regex.exec(appJs)) !== null) {
  ids.add(match[1]);
}

console.log('Total unique IDs checked:', ids.size);
let missing = 0;
for (const id of ids) {
  const hasId = indexHtml.includes(`id="${id}"`) || indexHtml.includes(`id='${id}'`);
  // Note: some IDs like modal-image-url-input or admin-preview-P01 are created dynamically in modals or grids
  if (!hasId) {
    console.log('⚠️ Dynamic or Missing ID in static index.html:', id);
    missing++;
  }
}
console.log('Done checking. Missing static count:', missing);
